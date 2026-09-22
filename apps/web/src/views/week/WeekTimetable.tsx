import { Fragment } from "react";
import type { ReactElement } from "react";
import { Card } from "@heroui/react";
import clsx from "clsx";
import type { PlanMeal } from "~/core/plan/PlanTypes";
import type { WeekDayViewModel } from "~/views/week/UseWeekOverview";
import type { WeekTimetableRowViewModel } from "~/views/week/UseWeekTimetable";
import { WeekTimetableCell } from "~/views/week/WeekTimetableCell";

/**
 * The rail and the header form an "L" of chrome around the meals, so their
 * tints mix into the recessed ground rather than washing over the card's own
 * surface — otherwise the rail reads lighter than the header it meets.
 */
const RAIL_BACKGROUND: Record<PlanMeal, string> = {
  lunch: "bg-[color-mix(in_oklch,var(--warning)_13%,var(--surface-secondary))]",
  dinner: "bg-[color-mix(in_oklch,var(--accent)_12%,var(--surface-secondary))]",
};

const RAIL_BAR: Record<PlanMeal, string> = {
  lunch: "bg-warning",
  dinner: "bg-accent",
};

export interface WeekTimetableProps {
  days: WeekDayViewModel[];
  rows: WeekTimetableRowViewModel[];
}

/**
 * The planned week as a timetable: a row per meal, a column per day. Seven
 * columns never shrink far, so below `min-w` the table scrolls sideways inside
 * its card rather than crushing the meals — narrow screens get
 * `WeekTimetableDayCard` instead.
 */
export function WeekTimetable({ days, rows }: WeekTimetableProps): ReactElement {
  return (
    <Card className="overflow-hidden" data-testid="week-page__timetable">
      <Card.Content className="overflow-x-auto p-0">
        <div
          className={clsx(
            // Below this the day columns get too narrow for a recipe title to wrap on
            // whole words, so the table scrolls sideways rather than breaking them.
            "grid min-w-[52rem] grid-cols-[4.625rem_repeat(7,minmax(0,1fr))] min-[1180px]:grid-cols-[5.75rem_repeat(7,minmax(0,1fr))]",
            // Every eighth cell closes a row, and wants no rule on its outer edge.
            "[&>*:nth-child(8n)]:border-r-0"
          )}
        >
          <div className="bg-surface-secondary border-separator border-r border-b" />
          {days.map((day) => (
            <div
              key={day.day}
              className={clsx(
                "border-separator flex min-w-0 flex-col gap-0.75 border-r border-b px-2.5 pt-2.75 pb-3",
                day.isToday
                  ? "bg-[color-mix(in_oklch,var(--accent)_10%,var(--surface-secondary))]"
                  : "bg-surface-secondary"
              )}
            >
              <span className="flex items-baseline gap-1.5">
                <span className={clsx("text-xl leading-none font-bold", day.isToday && "text-accent")}>
                  {day.dateNumber}
                </span>
                <span className="text-default-500 text-[10px] tracking-[0.1em] uppercase">{day.monthLabel}</span>
              </span>
              <span className={clsx("truncate text-sm font-semibold", day.isToday && "text-accent")}>
                {day.dayLabel}
              </span>
            </div>
          ))}

          {rows.map((row, rowIndex) => {
            const isLastRow = rowIndex === rows.length - 1;

            return (
              <Fragment key={row.mealType}>
                <div
                  className={clsx(
                    "border-separator flex min-w-0 flex-col justify-center gap-1.75 border-r px-2.25 py-4",
                    RAIL_BACKGROUND[row.mealType],
                    !isLastRow && "border-b"
                  )}
                >
                  <span className={clsx("h-1 w-5.5 rounded-sm", RAIL_BAR[row.mealType])} />
                  <span className="text-xs font-bold tracking-[0.12em] uppercase">{row.label}</span>
                  <span className="text-default-500 text-[10px]">{row.countLabel}</span>
                </div>

                {row.slots.map((slot, dayIndex) => (
                  <WeekTimetableCell
                    key={days[dayIndex]?.day ?? dayIndex}
                    slot={slot}
                    className={clsx("border-separator border-r", !isLastRow && "border-b")}
                  />
                ))}
              </Fragment>
            );
          })}
        </div>
      </Card.Content>
    </Card>
  );
}
