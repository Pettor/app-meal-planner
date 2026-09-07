import type { ReactElement } from "react";
import { HeaderWeekPicker } from "./HeaderWeekPicker";
import { useHeaderWeekPickerController } from "./UseHeaderWeekPickerController";

export function HeaderWeekPickerController(): ReactElement {
  return <HeaderWeekPicker {...useHeaderWeekPickerController()} />;
}
