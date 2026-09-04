import type { ReactElement } from "react";
import { SparklesIcon } from "@heroicons/react/24/outline";
import { Button } from "@heroui/react";
import { useIntl } from "react-intl";

export interface RecipeEditScanBannerProps {
  /** How many photo scans the cook has left today. */
  scansRemaining: number;
  onOpenScan: () => void;
}

/** Offers the AI photo scan as a shortcut to filling the form in by hand. */
export function RecipeEditScanBanner({ scansRemaining, onOpenScan }: RecipeEditScanBannerProps): ReactElement {
  const intl = useIntl();

  return (
    <div className="border-separator bg-accent/6 flex flex-wrap items-center gap-3.5 border-b px-6 py-3.5">
      <SparklesIcon className="text-accent h-5 w-5 shrink-0" />
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="text-sm font-semibold">
          {intl.formatMessage({
            description: "RecipeEditScanBanner: heading - scan a recipe",
            defaultMessage: "Scan a recipe with AI",
            id: "ebGwkW",
          })}
        </span>
        <span className="text-default-500 text-xs">
          {intl.formatMessage(
            {
              description: "RecipeEditScanBanner: body - scans left today",
              defaultMessage:
                "{count, plural, =0 {No scans left today} one {# scan left today} other {# scans left today}}",
              id: "3Ib+Vj",
            },
            { count: scansRemaining }
          )}
        </span>
      </div>
      <Button
        variant="primary"
        size="sm"
        isDisabled={scansRemaining === 0}
        onPress={onOpenScan}
        data-testid="recipe-edit__open-scan"
      >
        {intl.formatMessage({
          description: "RecipeEditScanBanner: button - scan photo",
          defaultMessage: "Scan photo",
          id: "8KSqzJ",
        })}
      </Button>
    </div>
  );
}
