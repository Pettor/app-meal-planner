import type { ReactElement } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Button } from "@heroui/react";
import { useIntl } from "react-intl";

export interface PlanWizardActionBarProps {
  canGoBack: boolean;
  onBack: () => void;
  nextLabel: string;
  onNext: () => void;
  showSaveDraft: boolean;
  onSaveDraft: () => void;
}

/**
 * The wizard's step actions on small screens, docked above the mobile tab bar so
 * "continue" stays reachable however far down the step's content runs. The header's
 * action group takes over from `sm` up.
 */
export function PlanWizardActionBar({
  canGoBack,
  onBack,
  nextLabel,
  onNext,
  showSaveDraft,
  onSaveDraft,
}: PlanWizardActionBarProps): ReactElement {
  const intl = useIntl();

  return (
    <div className="border-border bg-background/90 fixed inset-x-0 bottom-[62px] z-30 flex items-center gap-2 border-t px-3.5 py-2.5 backdrop-blur-lg sm:hidden">
      {canGoBack && (
        <Button
          variant="outline"
          isIconOnly
          className="h-11 w-11"
          onPress={onBack}
          data-testid="plan__back-mobile"
          aria-label={intl.formatMessage({
            description: "PlanWizardActionBar: aria-label - back to the previous step",
            defaultMessage: "Back",
            id: "2DNYri",
          })}
        >
          <ArrowLeftIcon className="h-5 w-5" />
        </Button>
      )}
      {showSaveDraft && (
        <Button variant="secondary" className="h-11" onPress={onSaveDraft} data-testid="plan__save-draft-mobile">
          {intl.formatMessage({
            description: "PlanWizardActionBar: button - save as draft",
            defaultMessage: "Save as draft",
            id: "Xwc7HV",
          })}
        </Button>
      )}
      <Button variant="primary" className="h-11 flex-1 justify-center" onPress={onNext} data-testid="plan__next-mobile">
        {nextLabel}
      </Button>
    </div>
  );
}
