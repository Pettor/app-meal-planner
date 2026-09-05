import type { ReactElement } from "react";
import { Card } from "@heroui/react";
import { useIntl } from "react-intl";
import { WeekPickerDialog } from "~/components/feedback/week-picker-dialog/WeekPickerDialog";
import type { SavedPlan } from "~/core/plan/PlanTypes";
import type { UseWeekPickerResult } from "~/core/plan/UseWeekPicker";
import type { Recipe } from "~/core/recipes/RecipeTypes";
import { useWeekOverview } from "~/views/week/UseWeekOverview";
import { WeekDayCard } from "~/views/week/WeekDayCard";
import { WeekDraftBanner } from "~/views/week/WeekDraftBanner";
import { WeekPageHeader } from "~/views/week/WeekPageHeader";
import { WeekStatCard } from "~/views/week/WeekStatCard";

export interface WeekViewProps {
  /** The week in view, keyed by its Monday (`YYYY-MM-DD`). */
  weekKey: string;
  /** The saved plan for that week, or `null` when it has never been planned. */
  plan: SavedPlan | null;
  /** The "pick a week" calendar, assembled by the route. */
  weekPicker: UseWeekPickerResult;
  /** The cook's own recipe pool — what the planned meals resolve against. */
  recipes: Recipe[];
  onSelectWeek: (weekKey: string) => void;
  onOpenRecipe: (recipeId: string) => void;
  onEditWeek: () => void;
  onPlanWeek: () => void;
  onPublishWeek: () => void;
  onPrint: () => void;
}

/** "This week" — the planned week at a glance, day by day. */
export function WeekView({
  weekKey,
  plan,
  weekPicker,
  recipes,
  onSelectWeek,
  onOpenRecipe,
  onEditWeek,
  onPlanWeek,
  onPublishWeek,
  onPrint,
}: WeekViewProps): ReactElement {
  const intl = useIntl();
  const week = useWeekOverview(weekKey, plan, recipes, onOpenRecipe);

  return (
    <div className="mx-auto w-full max-w-[77.5rem] px-6 py-9">
      <WeekPageHeader
        headingLead={week.headingLead}
        headingAccent={week.headingAccent}
        subtitle={week.subtitle}
        switcherLabel={week.switcherLabel}
        weekRange={week.weekRange}
        statusDotClassName={week.statusDotClassName}
        hasPlan={week.hasPlan}
        onPreviousWeek={() => onSelectWeek(week.previousWeekKey)}
        onNextWeek={() => onSelectWeek(week.nextWeekKey)}
        onOpenWeekPicker={weekPicker.onOpen}
        onPrint={onPrint}
        onEditWeek={onEditWeek}
        onPlanWeek={onPlanWeek}
      />

      {week.isDraft && <WeekDraftBanner onPublish={onPublishWeek} />}

      {!week.hasPlan && (
        <Card variant="secondary" className="mt-6.5">
          <Card.Content className="px-8 py-18 text-center">
            <h3 className="mb-2 text-xl font-semibold">
              {intl.formatMessage({
                description: "WeekView: heading - no week planned",
                defaultMessage: "No week planned yet",
                id: "U0rbx1",
              })}
            </h3>
            <p className="text-default-500">
              {intl.formatMessage({
                description: "WeekView: body - no week planned",
                defaultMessage: "Set the days, people and tags, then let the planner fill it in.",
                id: "Jbc39/",
              })}
            </p>
          </Card.Content>
        </Card>
      )}

      {week.hasPlan && (
        <>
          <div className="mt-6.5 grid grid-cols-[repeat(auto-fit,minmax(12.5rem,1fr))] gap-3.5">
            {week.stats.map((stat) => (
              <WeekStatCard
                key={stat.label}
                label={stat.label}
                value={stat.value}
                note={stat.note}
                accent={stat.accent}
              />
            ))}
          </div>

          <div className="mt-4.5 grid grid-cols-[repeat(auto-fit,minmax(13.25rem,1fr))] gap-3.5">
            {week.days.map((day) => (
              <WeekDayCard key={day.day} day={day} />
            ))}
          </div>
        </>
      )}

      <WeekPickerDialog {...weekPicker} />
    </div>
  );
}
