import type { IntlShape } from "react-intl";
import type { PlanDayId, PlanMeal } from "~/core/plan/PlanTypes";

/** Full and short day names, translated — day identity itself stays the English `PlanDayId`. */
export function planDayName(intl: IntlShape, day: PlanDayId): string {
  switch (day) {
    case "monday":
      return intl.formatMessage({ description: "PlanDayLabels: day - Monday", defaultMessage: "Monday", id: "VQH5s+" });
    case "tuesday":
      return intl.formatMessage({
        description: "PlanDayLabels: day - Tuesday",
        defaultMessage: "Tuesday",
        id: "go3tLf",
      });
    case "wednesday":
      return intl.formatMessage({
        description: "PlanDayLabels: day - Wednesday",
        defaultMessage: "Wednesday",
        id: "+BASUr",
      });
    case "thursday":
      return intl.formatMessage({
        description: "PlanDayLabels: day - Thursday",
        defaultMessage: "Thursday",
        id: "bwm17/",
      });
    case "friday":
      return intl.formatMessage({ description: "PlanDayLabels: day - Friday", defaultMessage: "Friday", id: "jgOXMo" });
    case "saturday":
      return intl.formatMessage({
        description: "PlanDayLabels: day - Saturday",
        defaultMessage: "Saturday",
        id: "9wO0Nr",
      });
    case "sunday":
      return intl.formatMessage({ description: "PlanDayLabels: day - Sunday", defaultMessage: "Sunday", id: "K588Vq" });
  }
}

export function planDayShortName(intl: IntlShape, day: PlanDayId): string {
  switch (day) {
    case "monday":
      return intl.formatMessage({
        description: "PlanDayLabels: day short - Monday",
        defaultMessage: "Mon",
        id: "2Id9Xy",
      });
    case "tuesday":
      return intl.formatMessage({
        description: "PlanDayLabels: day short - Tuesday",
        defaultMessage: "Tue",
        id: "uLnlfH",
      });
    case "wednesday":
      return intl.formatMessage({
        description: "PlanDayLabels: day short - Wednesday",
        defaultMessage: "Wed",
        id: "x0NC5P",
      });
    case "thursday":
      return intl.formatMessage({
        description: "PlanDayLabels: day short - Thursday",
        defaultMessage: "Thu",
        id: "Zi72Eh",
      });
    case "friday":
      return intl.formatMessage({
        description: "PlanDayLabels: day short - Friday",
        defaultMessage: "Fri",
        id: "ndqj0F",
      });
    case "saturday":
      return intl.formatMessage({
        description: "PlanDayLabels: day short - Saturday",
        defaultMessage: "Sat",
        id: "fqTqiW",
      });
    case "sunday":
      return intl.formatMessage({
        description: "PlanDayLabels: day short - Sunday",
        defaultMessage: "Sun",
        id: "ow22r/",
      });
  }
}

export function planMealName(intl: IntlShape, meal: PlanMeal): string {
  return meal === "lunch"
    ? intl.formatMessage({ description: "PlanDayLabels: meal - lunch", defaultMessage: "Lunch", id: "NJ6Rr+" })
    : intl.formatMessage({ description: "PlanDayLabels: meal - dinner", defaultMessage: "Dinner", id: "lnYkRl" });
}
