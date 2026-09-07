import type { ReactElement } from "react";
import { WeekPickerDialog } from "~/components/feedback/week-picker-dialog/WeekPickerDialog";
import type { WeekPickerDialogProps } from "~/components/feedback/week-picker-dialog/WeekPickerDialog";
import { WeekSwitcher } from "~/components/navigation/week-switcher/WeekSwitcher";
import type { WeekSwitcherProps } from "~/components/navigation/week-switcher/WeekSwitcher";

export interface HeaderWeekPickerProps {
  /** The compact `‹ W36 ›` control that sits in the navbar. */
  switcher: WeekSwitcherProps;
  /** The "Schedule" calendar the chip opens. */
  dialog: WeekPickerDialogProps;
}

/**
 * The week the whole app is pointed at, always reachable from the navbar:
 * step a week either way, or open the calendar to jump anywhere.
 */
export function HeaderWeekPicker({ switcher, dialog }: HeaderWeekPickerProps): ReactElement {
  return (
    <div className="print:hidden" data-testid="navbar__week-picker">
      <WeekSwitcher {...switcher} />
      <WeekPickerDialog {...dialog} />
    </div>
  );
}
