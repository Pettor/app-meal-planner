import type { ReactElement } from "react";
import { Card } from "@heroui/react";
import { useMediaQuery } from "@package/react";
import { useIntl } from "react-intl";
import { LayoutToggle } from "~/components/input/layout-toggle/LayoutToggle";
import type { SavedPlan, WeekLayout } from "~/core/plan/PlanTypes";
import type { Recipe } from "~/core/recipes/RecipeTypes";
import { useWeekOverview } from "~/views/week/UseWeekOverview";
import { useWeekTimetable } from "~/views/week/UseWeekTimetable";
import { WeekDayCard } from "~/views/week/WeekDayCard";
import { WeekDraftBanner } from "~/views/week/WeekDraftBanner";
import { WeekPageHeader } from "~/views/week/WeekPageHeader";
import { WeekStatsBar } from "~/views/week/WeekStatsBar";
import { WeekTimetable } from "~/views/week/WeekTimetable";
import { WeekTimetableDayCard } from "~/views/week/WeekTimetableDayCard";

/**
 * Seven columns stop being readable below this, so the timetable turns on its
 * side into a card per day rather than scrolling sideways forever.
 */
const TIMETABLE_WIDE = "(min-width: 821px)";

export interface WeekViewProps {
  /** The week in view, keyed by its Monday (`YYYY-MM-DD`). */
  weekKey: string;
  /** The saved plan for that week, or `null` when it has never been planned. */
  plan: SavedPlan | null;
  /** The cook's own recipe pool — what the planned meals resolve against. */
  recipes: Recipe[];
  /** Whether the week reads as a timetable of meals against days, or a card per day. */
  layout: WeekLayout;
  onLayoutChange: (layout: WeekLayout) => void;
  onOpenRecipe: (recipeId: string) => void;
  onOpenShoppingList: () => void;
  onEditWeek: () => void;
  onPlanWeek: () => void;
  onPublishWeek: () => void;
  onPrint: () => void;
}

/** "This week" — the planned week at a glance, as a timetable or day by day. */
export function WeekView({
  weekKey,
  plan,
  recipes,
  layout,
  onLayoutChange,
  onOpenRecipe,
  onOpenShoppingList,
  onEditWeek,
  onPlanWeek,
  onPublishWeek,
  onPrint,
}: WeekViewProps): ReactElement {
  const intl = useIntl();
  const week = useWeekOverview(weekKey, plan, recipes, onOpenRecipe);
  const timetable = useWeekTimetable(week.days);
  const isWide = useMediaQuery(TIMETABLE_WIDE);

  return (
    <div className="mx-auto w-full max-w-[77.5rem] px-4 py-6 min-[760px]:px-6 min-[760px]:py-9">
      <WeekPageHeader
        headingLead={week.headingLead}
        headingAccent={week.headingAccent}
        subtitle={week.subtitle}
        hasPlan={week.hasPlan}
        onOpenShoppingList={onOpenShoppingList}
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
          <div className="mt-6.5">
            <WeekStatsBar stats={week.stats} />
          </div>

          <LayoutToggle
            className="mt-5.5 print:hidden"
            options={[
              {
                value: "table",
                label: intl.formatMessage({
                  description: "WeekView: toggle - timetable layout",
                  defaultMessage: "Timetable",
                  id: "LisaTx",
                }),
              },
              {
                value: "cards",
                label: intl.formatMessage({
                  description: "WeekView: toggle - cards layout",
                  defaultMessage: "Cards",
                  id: "PzlF5k",
                }),
              },
            ]}
            value={layout}
            onChange={onLayoutChange}
          />

          {layout === "table" ? (
            <div className="mt-3.5">
              {isWide ? (
                <WeekTimetable days={week.days} rows={timetable.rows} />
              ) : (
                <div className="flex flex-col gap-3">
                  {timetable.days.map((day) => (
                    <WeekTimetableDayCard key={day.day.day} day={day} />
                  ))}
                </div>
              )}
            </div>
          ) : (
            /*
             * Seven days never divide evenly, so the column count is stepped
             * explicitly rather than left to auto-fit: four across, then three,
             * two, and a single column on a phone.
             */
            <div className="mt-4.5 grid grid-cols-1 gap-3.5 min-[520px]:grid-cols-2 min-[760px]:grid-cols-3 min-[1100px]:grid-cols-4">
              {week.days.map((day) => (
                <WeekDayCard key={day.day} day={day} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
