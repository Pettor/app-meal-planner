import type { ReactElement } from "react";
import { LoadWeekDialog } from "./LoadWeekDialog";
import { useLoadWeekDialogController } from "./UseLoadWeekDialogController";

/** Mounts the "load this week" confirmation wherever a shared week can be used. */
export function LoadWeekDialogController(): ReactElement {
  const props = useLoadWeekDialogController();
  return <LoadWeekDialog {...props} />;
}
