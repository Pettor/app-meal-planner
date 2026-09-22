import { useIntl } from "react-intl";
import type { HeaderWeekPickerProps } from "./HeaderWeekPicker";
import { useDayShortNames } from "~/core/plan/PlanDayLabels";
import {
  addDays,
  isoWeekNumber,
  parseWeekKey,
  weekKeyOf,
  weekOffset,
  weekStatusDotClassName,
} from "~/core/plan/PlanUtils";
import { relativeWeekLabel } from "~/core/plan/PlanWeekLabels";
import { usePlans } from "~/core/plan/UsePlans";
import { useWeekPicker } from "~/core/plan/UseWeekPicker";

/** Builds the navbar week picker from the week the app is on and the weeks already saved. */
export function useHeaderWeekPickerController(): HeaderWeekPickerProps {
  const intl = useIntl();
  const { plans, selectedWeekKey, selectWeek } = usePlans();
  const dayNames = useDayShortNames();
  const { isOpen, onOpen, ...dialog } = useWeekPicker(selectedWeekKey, plans, selectWeek, dayNames);

  const monday = parseWeekKey(selectedWeekKey);
  const weekNumber = isoWeekNumber(monday);
  const relative = relativeWeekLabel(intl, weekOffset(selectedWeekKey), weekNumber);

  return {
    switcher: {
      // Deliberately terse — the navbar chip only has room for "W36".
      label: intl.formatMessage(
        {
          description: "UseHeaderWeekPickerController: chip - abbreviated week number",
          defaultMessage: "W{number}",
          id: "zWLji4",
        },
        { number: weekNumber }
      ),
      hint: intl.formatMessage(
        {
          description: "UseHeaderWeekPickerController: tooltip - week number and how it reads relative to today",
          defaultMessage: "Week {number} · {relative}",
          id: "0ohn0Z",
        },
        { number: weekNumber, relative }
      ),
      statusDotClassName: weekStatusDotClassName(plans[selectedWeekKey]),
      onPrevious: () => selectWeek(weekKeyOf(addDays(monday, -7))),
      onNext: () => selectWeek(weekKeyOf(addDays(monday, 7))),
      onOpenPicker: onOpen,
    },
    dialog: { isOpen, ...dialog },
  };
}
