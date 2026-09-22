import { useIntl } from "react-intl";
import { planMealName } from "~/core/plan/PlanDayLabels";
import type { PlanMeal } from "~/core/plan/PlanTypes";
import type { WeekDayViewModel, WeekMealViewModel } from "~/views/week/UseWeekOverview";

/** Lunch reads above dinner, the order the day itself runs in. */
const MEAL_ROW_ORDER: PlanMeal[] = ["lunch", "dinner"];

export interface WeekTimetableSlotViewModel {
  /** The row the slot belongs to — it carries the meal's colour. */
  mealType: PlanMeal;
  mealLabel: string;
  /** What stands in the cell when the week has nothing there. */
  blankLabel: string;
  isToday: boolean;
  /** The planned meal, or `null` for an unfilled slot. */
  meal: WeekMealViewModel | null;
}

export interface WeekTimetableRowViewModel {
  mealType: PlanMeal;
  label: string;
  /** "4 of 7 days" — how much of the row is filled. */
  countLabel: string;
  /** One slot per day, in the week's own order. */
  slots: WeekTimetableSlotViewModel[];
}

export interface WeekTimetableDayViewModel {
  day: WeekDayViewModel;
  /** The same slots the rows hold, read down a single day instead of across. */
  slots: WeekTimetableSlotViewModel[];
}

export interface UseWeekTimetableResult {
  rows: WeekTimetableRowViewModel[];
  days: WeekTimetableDayViewModel[];
}

/**
 * The planned week transposed into a timetable: a row per meal, a column per
 * day. Read across a row to follow one meal through the week, or down a column
 * to see a single day.
 *
 * A meal only earns a row if the week has it somewhere — a dinner-only week
 * reads as one row rather than seven "No lunch planned" cells.
 */
export function useWeekTimetable(days: WeekDayViewModel[]): UseWeekTimetableResult {
  const intl = useIntl();

  const nothingPlanned = intl.formatMessage({
    description: "UseWeekTimetable: body - nothing planned",
    defaultMessage: "Nothing planned",
    id: "Lvl0Gx",
  });
  const noLunchPlanned = intl.formatMessage({
    description: "UseWeekTimetable: body - no lunch planned",
    defaultMessage: "No lunch planned",
    id: "1ZQvte",
  });

  const rows = MEAL_ROW_ORDER.flatMap((mealType): WeekTimetableRowViewModel[] => {
    const mealLabel = planMealName(intl, mealType);
    const slots = days.map((day): WeekTimetableSlotViewModel => ({
      mealType,
      mealLabel,
      blankLabel: mealType === "lunch" ? noLunchPlanned : nothingPlanned,
      isToday: day.isToday,
      meal: day.meals.find((meal) => meal.mealType === mealType) ?? null,
    }));

    const filled = slots.filter((slot) => slot.meal).length;
    if (!filled) return [];

    return [
      {
        mealType,
        label: mealLabel,
        countLabel: intl.formatMessage(
          {
            description: "UseWeekTimetable: label - days filled in a meal row",
            defaultMessage: "{filled} of {total} days",
            id: "Yb4Te3",
          },
          { filled, total: slots.length }
        ),
        slots,
      },
    ];
  });

  return {
    rows,
    days: days.map((day, index) => ({ day, slots: rows.map((row) => row.slots[index]!) })),
  };
}
