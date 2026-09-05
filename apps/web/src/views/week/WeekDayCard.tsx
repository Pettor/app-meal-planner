import type { ReactElement } from "react";
import { useIntl } from "react-intl";
import { DayColumn } from "~/components/display/day-column/DayColumn";
import type { WeekDayViewModel } from "~/views/week/UseWeekOverview";
import { WeekMealCard } from "~/views/week/WeekMealCard";

export interface WeekDayCardProps {
  day: WeekDayViewModel;
}

/** One day of the planned week: its date, who is eating, and the meals on it. */
export function WeekDayCard({ day }: WeekDayCardProps): ReactElement {
  const intl = useIntl();

  return (
    <DayColumn
      dayLabel={day.dayLabel}
      dateNumber={day.dateNumber}
      monthLabel={day.monthLabel}
      peopleLabel={day.peopleLabel}
      isToday={day.isToday}
    >
      {day.meals.map((meal, index) => (
        <WeekMealCard key={`${meal.mealLabel}-${index}`} meal={meal} />
      ))}

      {day.meals.length === 0 && (
        <span className="border-separator bg-surface-secondary text-default-500 flex flex-1 items-center justify-center border-t [background-image:radial-gradient(color-mix(in_oklch,var(--muted)_30%,transparent)_1px,transparent_1px)] [background-size:12px_12px] px-3.5 py-6.5 text-xs">
          {intl.formatMessage({
            description: "WeekDayCard: body - nothing planned",
            defaultMessage: "Nothing planned",
            id: "GTO7xa",
          })}
        </span>
      )}
    </DayColumn>
  );
}
