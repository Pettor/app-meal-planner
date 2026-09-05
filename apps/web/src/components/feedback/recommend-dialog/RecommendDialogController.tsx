import type { ReactElement } from "react";
import { RecommendDialog } from "./RecommendDialog";
import { UseRecommendDialogController } from "./UseRecommendDialogController";

/** Mounts the recommend dialog wherever a week or recipe can be sent to someone. */
export function RecommendDialogController(): ReactElement {
  const props = UseRecommendDialogController();
  return <RecommendDialog {...props} />;
}
