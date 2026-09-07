import { useIntl } from "react-intl";
import { planDayName, planMealName, planPeopleLabel } from "~/core/plan/PlanDayLabels";
import { PLAN_DAY_ORDER } from "~/core/plan/PlanTypes";
import type { PlanDayId, SavedPlan } from "~/core/plan/PlanTypes";
import { addDays, formatWeekRange, isoWeekNumber, parseWeekKey, weekKeyOf, weekOffset } from "~/core/plan/PlanUtils";
import type { Recipe } from "~/core/recipes/RecipeTypes";
import { buildShoppingList } from "~/core/shopping/ShoppingUtils";
import type { WeekStatTone } from "~/views/week/WeekStatsBar";

export interface WeekMealViewModel {
  mealLabel: string;
  /** Dinner and lunch are colour-coded so a day reads at a glance. */
  isDinner: boolean;
  peopleLabel: string;
  title: string;
  tags: string[];
  photoUrl: string | null;
  onOpen: () => void;
}

export interface WeekDayViewModel {
  day: PlanDayId;
  dayLabel: string;
  dateNumber: string;
  monthLabel: string;
  peopleLabel: string;
  isToday: boolean;
  meals: WeekMealViewModel[];
}

export interface WeekStatViewModel {
  label: string;
  /** Already formatted for display, e.g. `"28"`, `"43%"` or `"35 min"`. */
  value: string;
  tone: WeekStatTone;
}

export interface UseWeekOverviewResult {
  /** Plain first half of the page heading, e.g. "This". */
  headingLead: string;
  /** Gradient second half, e.g. "week" or the week number. */
  headingAccent: string;
  /** "week 14 · 3 Apr – 9 Apr · 7 meals · 28 plates · planned 2026-09-05" */
  subtitle: string;
  hasPlan: boolean;
  isDraft: boolean;
  stats: WeekStatViewModel[];
  days: WeekDayViewModel[];
}

/** Everything the "This week" page renders, derived from the week in view and its saved plan. */
export function useWeekOverview(
  weekKey: string,
  plan: SavedPlan | null,
  recipes: Recipe[],
  onOpenRecipe: (recipeId: string) => void
): UseWeekOverviewResult {
  const intl = useIntl();
  const locale = intl.locale || "en-GB";

  const monday = parseWeekKey(weekKey);
  const offset = weekOffset(weekKey);
  const weekNumber = isoWeekNumber(monday);
  const todayKey = weekKeyOf(new Date());

  const weekWordLower = intl.formatMessage({
    description: "UseWeekOverview: label - week (lowercase)",
    defaultMessage: "week",
    id: "eJW9+3",
  });
  const weekRange = `${weekWordLower} ${weekNumber} · ${formatWeekRange(monday, locale)}`;

  const headingLead =
    offset === 0
      ? intl.formatMessage({ description: "UseWeekOverview: heading - this", defaultMessage: "This", id: "R366Cn" })
      : offset === 1
        ? intl.formatMessage({ description: "UseWeekOverview: heading - next", defaultMessage: "Next", id: "6WmLIf" })
        : intl.formatMessage({ description: "UseWeekOverview: heading - week", defaultMessage: "Week", id: "d2RFeo" });
  const headingAccent =
    offset === 0 || offset === 1
      ? intl.formatMessage({
          description: "UseWeekOverview: heading accent - week",
          defaultMessage: "week",
          id: "GOl4iB",
        })
      : String(weekNumber);

  const filledSlots = plan ? plan.draft.slots.filter((slot) => slot.recipeId) : [];
  /** The recipe behind every filled slot — one entry per meal, so repeats count twice. */
  const plannedRecipes = filledSlots.flatMap((slot) => {
    const recipe = recipes.find((candidate) => candidate.id === slot.recipeId);
    return recipe ? [recipe] : [];
  });
  const plateCount = filledSlots.reduce((total, slot) => total + slot.people, 0);
  const vegetarianCount = plannedRecipes.filter((recipe) => recipe.tags.includes("vegetarian")).length;
  const distinctRecipeCount = new Set(plannedRecipes.map((recipe) => recipe.id)).size;
  const averageCookMinutes = plannedRecipes.length
    ? Math.round(plannedRecipes.reduce((total, recipe) => total + recipe.timeMinutes, 0) / plannedRecipes.length)
    : 0;
  /** Same roll-up the shopping list shows, so the two pages never disagree. */
  const ingredientCount = buildShoppingList(plan, recipes).length;

  const mealsWord = intl.formatMessage({
    description: "UseWeekOverview: label - meals (lowercase)",
    defaultMessage: "meals",
    id: "5TOztL",
  });
  const platesWord = intl.formatMessage({
    description: "UseWeekOverview: label - plates (lowercase)",
    defaultMessage: "plates",
    id: "gbsl0Q",
  });

  const statusLine = !plan
    ? intl.formatMessage({
        description: "UseWeekOverview: status - not planned",
        defaultMessage: "not planned",
        id: "RjKbi8",
      })
    : plan.status === "draft"
      ? intl.formatMessage({ description: "UseWeekOverview: status - draft", defaultMessage: "draft", id: "hQzv4A" })
      : intl.formatMessage(
          {
            description: "UseWeekOverview: status - planned on date",
            defaultMessage: "planned {date}",
            id: "BYRWhm",
          },
          { date: plan.savedAt }
        );

  const subtitle = plan
    ? `${weekRange} · ${filledSlots.length} ${mealsWord} · ${plateCount} ${platesWord} · ${statusLine}`
    : `${weekRange} · ${statusLine}`;

  const stats: WeekStatViewModel[] = plan
    ? [
        {
          label: intl.formatMessage({
            description: "UseWeekOverview: stat - meals",
            defaultMessage: "Meals",
            id: "wF9nyw",
          }),
          value: String(filledSlots.length),
          tone: "accent",
        },
        {
          label: intl.formatMessage({
            description: "UseWeekOverview: stat - plates",
            defaultMessage: "Plates",
            id: "KQh2NF",
          }),
          value: String(plateCount),
          tone: "sky",
        },
        {
          label: intl.formatMessage({
            description: "UseWeekOverview: stat - vegetarian",
            defaultMessage: "Vegetarian",
            id: "xcITGP",
          }),
          value: filledSlots.length ? `${Math.round((vegetarianCount / filledSlots.length) * 100)}%` : "0%",
          tone: "success",
        },
        {
          label: intl.formatMessage({
            description: "UseWeekOverview: stat - cook time",
            defaultMessage: "Cook time",
            id: "KAsFW6",
          }),
          value: intl.formatMessage(
            {
              description: "UseWeekOverview: stat value - average cook time in minutes",
              defaultMessage: "{minutes} min",
              id: "hzXPa0",
            },
            { minutes: averageCookMinutes }
          ),
          tone: "warning",
        },
        {
          label: intl.formatMessage({
            description: "UseWeekOverview: stat - distinct recipes",
            defaultMessage: "Recipes",
            id: "2tYNPg",
          }),
          value: String(distinctRecipeCount),
          tone: "violet",
        },
        {
          label: intl.formatMessage({
            description: "UseWeekOverview: stat - ingredients",
            defaultMessage: "Ingredients",
            id: "ySpw27",
          }),
          value: String(ingredientCount),
          tone: "danger",
        },
      ]
    : [];

  const days: WeekDayViewModel[] = plan
    ? plan.draft.days.map((row) => {
        const date = addDays(monday, PLAN_DAY_ORDER.indexOf(row.day));
        return {
          day: row.day,
          dayLabel: planDayName(intl, row.day),
          dateNumber: String(date.getDate()),
          monthLabel: date.toLocaleDateString(locale, { month: "short" }),
          peopleLabel: planPeopleLabel(intl, row.people),
          isToday: weekKeyOf(date) === todayKey,
          meals: plan.draft.slots
            .filter((slot) => slot.day === row.day)
            .flatMap((slot) => {
              const recipe = recipes.find((r) => r.id === slot.recipeId);
              if (!recipe) return [];
              return [
                {
                  mealLabel: planMealName(intl, slot.meal),
                  isDinner: slot.meal === "dinner",
                  peopleLabel: planPeopleLabel(intl, slot.people),
                  title: recipe.title,
                  tags: recipe.tags,
                  photoUrl: recipe.photoUrl,
                  onOpen: () => onOpenRecipe(recipe.id),
                } satisfies WeekMealViewModel,
              ];
            }),
        };
      })
    : [];

  return {
    headingLead,
    headingAccent,
    subtitle,
    hasPlan: !!plan,
    isDraft: plan?.status === "draft",
    stats,
    days,
  };
}
