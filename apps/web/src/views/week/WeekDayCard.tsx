import type { ReactElement } from "react";
import { useIntl } from "react-intl";
import { DayColumn } from "~/components/display/day-column/DayColumn";
import { EmptySlot } from "~/components/display/empty-slot/EmptySlot";
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
      isFlush
      dayLabel={day.dayLabel}
      dateNumber={day.dateNumber}
      monthLabel={day.monthLabel}
      peopleLabel={day.peopleLabel}
      isToday={day.isToday}
    >
      {day.meals.map((meal, index) => (
        <WeekMealCard key={`${meal.mealLabel}-${index}`} meal={meal} isFirst={index === 0} />
      ))}

      {day.meals.length === 0 && (
        <EmptySlot
          className="m-2.5"
          label={intl.formatMessage({
            description: "WeekDayCard: body - nothing planned",
            defaultMessage: "Nothing planned",
            id: "GTO7xa",
          })}
        />
      )}
    </DayColumn>
  );
}
