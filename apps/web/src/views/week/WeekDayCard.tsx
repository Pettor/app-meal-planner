import type { ReactElement } from "react";
import { Chip } from "@heroui/react";
import clsx from "clsx";
import { useIntl } from "react-intl";
import type { WeekDayViewModel } from "~/views/week/UseWeekOverview";
import { WeekMealCard } from "~/views/week/WeekMealCard";

export interface WeekDayCardProps {
  day: WeekDayViewModel;
}

/** One day of the planned week: its date, who is eating, and the meals on it. */
export function WeekDayCard({ day }: WeekDayCardProps): ReactElement {
  const intl = useIntl();

  return (
    <div
      className={clsx(
        "flex flex-col overflow-hidden rounded-xl border",
        day.isToday ? "border-accent/50" : "border-border"
      )}
    >
      <div
        className={clsx(
          "border-separator flex items-center gap-2.5 border-b px-3.5 py-3",
          day.isToday ? "bg-accent/12" : "bg-surface-secondary"
        )}
      >
        <span className="flex min-w-7.5 flex-col items-center leading-none">
          <span className={clsx("text-xl font-bold", day.isToday ? "text-accent" : "text-foreground")}>
            {day.dateNumber}
          </span>
          <span className="text-default-500 mt-1 text-[9px] tracking-[0.09em] uppercase">{day.monthLabel}</span>
        </span>
        <span className="flex min-w-0 flex-col gap-0.5">
          <span className={clsx("text-sm font-semibold", day.isToday ? "text-accent" : "text-foreground")}>
            {day.dayLabel}
          </span>
          <span className="text-default-500 text-xs">{day.peopleLabel}</span>
        </span>
        {day.isToday && (
          <Chip size="sm" variant="soft" color="accent" className="ml-auto">
            {intl.formatMessage({ description: "WeekDayCard: chip - today", defaultMessage: "Today", id: "+MiKtj" })}
          </Chip>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2.5 p-3">
        {day.meals.map((meal, index) => (
          <WeekMealCard key={`${meal.mealLabel}-${index}`} meal={meal} />
        ))}

        {day.meals.length === 0 && (
          <span className="bg-surface-secondary text-default-500 flex flex-1 items-center justify-center rounded-md [background-image:radial-gradient(color-mix(in_oklch,var(--muted)_30%,transparent)_1px,transparent_1px)] [background-size:12px_12px] px-2.5 py-5.5 text-xs">
            {intl.formatMessage({
              description: "WeekDayCard: body - nothing planned",
              defaultMessage: "Nothing planned",
              id: "GTO7xa",
            })}
          </span>
        )}
      </div>
    </div>
  );
}
