import { createIntl, createIntlCache } from "react-intl";
import { describe, expect, it } from "vitest";
import { planDayName, planDayShortName, planMealName, planPeopleLabel } from "./PlanDayLabels";
import { PLAN_DAY_ORDER } from "./PlanTypes";

const intl = createIntl({ locale: "en", messages: {} }, createIntlCache());

describe("planDayName", () => {
  it("names every day in the week", () => {
    expect(PLAN_DAY_ORDER.map((day) => planDayName(intl, day))).toEqual([
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ]);
  });
});

describe("planDayShortName", () => {
  it("shortens every day to three letters", () => {
    expect(PLAN_DAY_ORDER.map((day) => planDayShortName(intl, day))).toEqual([
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun",
    ]);
  });
});

describe("planMealName", () => {
  it("names both meals", () => {
    expect(planMealName(intl, "lunch")).toBe("Lunch");
    expect(planMealName(intl, "dinner")).toBe("Dinner");
  });
});

describe("planPeopleLabel", () => {
  it("says how many are eating", () => {
    expect(planPeopleLabel(intl, 4)).toBe("4 people");
  });
});
