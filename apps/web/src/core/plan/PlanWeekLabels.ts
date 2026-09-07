import type { IntlShape } from "react-intl";

/**
 * How a week reads relative to the current one — "This week", "Next week",
 * or "Week 36" for anything further out.
 */
export function relativeWeekLabel(intl: IntlShape, offset: number, weekNumber: number): string {
  if (offset === 0)
    return intl.formatMessage({
      description: "PlanWeekLabels: week - this week",
      defaultMessage: "This week",
      id: "FA/Y+P",
    });
  if (offset === 1)
    return intl.formatMessage({
      description: "PlanWeekLabels: week - next week",
      defaultMessage: "Next week",
      id: "vOxjkr",
    });
  return intl.formatMessage(
    { description: "PlanWeekLabels: week - week number", defaultMessage: "Week {number}", id: "kwyvR6" },
    { number: weekNumber }
  );
}
