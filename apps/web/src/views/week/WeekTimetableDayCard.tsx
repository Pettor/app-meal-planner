import type { ReactElement } from "react";
import { Card } from "@heroui/react";
import clsx from "clsx";
import { useIntl } from "react-intl";
import { RecipePhoto } from "~/components/display/recipe-photo/RecipePhoto";
import { TagChip } from "~/components/display/tag-chip/TagChip";
import type { PlanMeal } from "~/core/plan/PlanTypes";
import type { WeekTimetableDayViewModel } from "~/views/week/UseWeekTimetable";

const RAIL_BACKGROUND: Record<PlanMeal, string> = {
  lunch: "bg-[color-mix(in_oklch,var(--warning)_13%,var(--surface-secondary))]",
  dinner: "bg-[color-mix(in_oklch,var(--accent)_12%,var(--surface-secondary))]",
};

const RAIL_BAR: Record<PlanMeal, string> = {
  lunch: "bg-warning",
  dinner: "bg-accent",
};

const ROW_TINT: Record<PlanMeal, string> = {
  lunch: "bg-warning/7",
  dinner: "bg-accent/6",
};

export interface WeekTimetableDayCardProps {
  day: WeekTimetableDayViewModel;
}

/**
 * One day of the timetable, stacked. Too narrow for seven columns, the table
 * turns on its side: the meal rail stays on the left of every row, so a day
 * still reads as the same lunch-over-dinner grid the wide layout draws.
 */
export function WeekTimetableDayCard({ day }: WeekTimetableDayCardProps): ReactElement {
  const intl = useIntl();

  return (
    <Card className="overflow-hidden">
      <Card.Content className="flex flex-col p-0">
        <div
          className={clsx(
            "border-separator flex items-baseline gap-2 border-b px-3.5 py-3",
            day.day.isToday
              ? "bg-[color-mix(in_oklch,var(--accent)_10%,var(--surface-secondary))]"
              : "bg-surface-secondary"
          )}
        >
          <span className={clsx("text-xl leading-none font-bold", day.day.isToday && "text-accent")}>
            {day.day.dateNumber}
          </span>
          <span className="text-default-500 text-[10px] tracking-[0.1em] uppercase">{day.day.monthLabel}</span>
          <span className={clsx("text-sm font-semibold", day.day.isToday && "text-accent")}>{day.day.dayLabel}</span>
          <span className="text-default-500 ml-auto text-xs">{day.day.peopleLabel}</span>
        </div>

        {day.slots.map((slot, index) => {
          const { meal } = slot;

          return (
            <div
              key={slot.mealType}
              className={clsx(
                "border-separator grid grid-cols-[4.5rem_1fr]",
                index < day.slots.length - 1 && "border-b"
              )}
            >
              <div
                className={clsx(
                  "border-separator flex flex-col justify-center gap-1.5 border-r px-2.5 py-3.5",
                  RAIL_BACKGROUND[slot.mealType]
                )}
              >
                <span className={clsx("h-1 w-5.5 rounded-sm", RAIL_BAR[slot.mealType])} />
                <span className="text-[10px] font-bold tracking-[0.12em] uppercase">{slot.mealLabel}</span>
              </div>

              {meal ? (
                <button
                  type="button"
                  className={clsx(
                    "flex min-h-16 cursor-pointer items-center gap-3 px-3.5 py-3 text-left transition-colors",
                    "hover:bg-surface-tertiary/55 focus-visible:outline-2 focus-visible:-outline-offset-2",
                    ROW_TINT[slot.mealType]
                  )}
                  onClick={meal.onOpen}
                  aria-label={intl.formatMessage(
                    {
                      description: "WeekTimetableDayCard: aria-label - open recipe",
                      defaultMessage: "Open {title}",
                      id: "JczMej",
                    },
                    { title: meal.title }
                  )}
                >
                  <RecipePhoto
                    photoUrl={meal.photoUrl}
                    alt={meal.title}
                    className="size-14 flex-none rounded-md"
                    iconClassName="h-5 w-5"
                  />
                  <span className="flex min-w-0 flex-col gap-1.5">
                    <span className="text-sm leading-[1.3] font-semibold text-pretty">{meal.title}</span>
                    <span className="flex flex-wrap gap-1.25">
                      {meal.tags.map((tag) => (
                        <TagChip key={tag} tag={tag} size="sm" />
                      ))}
                    </span>
                  </span>
                </button>
              ) : (
                <div
                  className={clsx(
                    "text-default-500 flex min-h-16 items-center px-3.5 py-4 text-xs",
                    ROW_TINT[slot.mealType]
                  )}
                >
                  {slot.blankLabel}
                </div>
              )}
            </div>
          );
        })}
      </Card.Content>
    </Card>
  );
}
