import { useState } from "react";
import { useIntl } from "react-intl";
import { PLAN_DAY_ORDER } from "~/core/plan/PlanTypes";
import type { PlanCalendarWeekViewModel, PlanDayId, SavedPlan } from "~/core/plan/PlanTypes";
import type { PlanCalendarWeekRow } from "~/core/plan/PlanUtils";
import {
  buildCalendarWeeks,
  filledSlotCount,
  firstOfMonth,
  parseWeekKey,
  thisWeekKey,
  weekKeyOf,
  shiftMonth,
} from "~/core/plan/PlanUtils";

export interface UseWeekPickerResult {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  /** The month the calendar is showing, e.g. "March 2026". */
  title: string;
  dayNames: string[];
  weeks: PlanCalendarWeekViewModel[];
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
}

/**
 * Month state and view-model glue behind the "Pick a week" calendar.
 *
 * Shared by the planner wizard and the week page so both show the same status
 * dots and land on the same week when one is picked.
 */
export function UseWeekPicker(
  selectedWeekKey: string,
  plans: Record<string, SavedPlan>,
  onSelectWeek: (weekKey: string) => void,
  dayNames: string[]
): UseWeekPickerResult {
  const intl = useIntl();
  const locale = intl.locale || "en-GB";

  const [isOpen, setIsOpen] = useState(false);
  const [monthKey, setMonthKey] = useState<string | null>(null);

  const selectedMonday = parseWeekKey(selectedWeekKey);
  const monthFirst = monthKey ? parseWeekKey(monthKey) : firstOfMonth(selectedMonday);

  const filledWord = intl.formatMessage({
    description: "UseWeekPicker: label - filled",
    defaultMessage: "filled",
    id: "40q1ez",
  });

  function pick(weekKey: string): void {
    onSelectWeek(weekKey);
    setIsOpen(false);
  }

  return {
    isOpen,
    onOpen: () => {
      setMonthKey(weekKeyOf(firstOfMonth(selectedMonday)));
      setIsOpen(true);
    },
    onClose: () => setIsOpen(false),
    title: monthFirst.toLocaleDateString(locale, { month: "long", year: "numeric" }),
    dayNames,
    weeks: buildCalendarWeeks(monthFirst).map((row) =>
      buildCalendarWeekViewModel(row, plans, selectedWeekKey, filledWord, pick)
    ),
    onPrevMonth: () => setMonthKey(weekKeyOf(shiftMonth(monthFirst, -1))),
    onNextMonth: () => setMonthKey(weekKeyOf(shiftMonth(monthFirst, 1))),
    onToday: () => {
      setMonthKey(weekKeyOf(firstOfMonth(new Date())));
      pick(thisWeekKey());
    },
  };
}

function buildCalendarWeekViewModel(
  row: PlanCalendarWeekRow,
  plans: Record<string, SavedPlan>,
  selectedWeekKey: string,
  filledWord: string,
  onPick: (weekKey: string) => void
): PlanCalendarWeekViewModel {
  const saved = plans[row.weekKey];
  const filled = saved ? filledSlotCount(saved.draft.slots) : 0;
  const plannedDays = new Set(saved ? saved.draft.slots.filter((slot) => slot.recipeId).map((slot) => slot.day) : []);
  return {
    weekNumber: row.weekNumber,
    statusDotClassName: !saved ? "bg-default-300" : saved.status === "final" ? "bg-success" : "bg-warning",
    mealsLabel: filled ? `${filled} ${filledWord}` : "",
    isSelected: row.weekKey === selectedWeekKey,
    // `row.days[i]` was built from `PLAN_DAY_ORDER[i]` in buildCalendarWeeks, so the indices line up.
    days: row.days.map((day, i) => ({
      dayNumber: day.dayNumber,
      isCurrentMonth: day.isCurrentMonth,
      isToday: day.isToday,
      hasPlannedMeal: plannedDays.has(PLAN_DAY_ORDER[i] as PlanDayId),
    })),
    onSelect: () => onPick(row.weekKey),
  };
}
