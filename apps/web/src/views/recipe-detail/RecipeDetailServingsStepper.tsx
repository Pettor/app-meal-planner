import type { ReactElement } from "react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Button } from "@heroui/react";
import { useIntl } from "react-intl";

export interface RecipeDetailServingsStepperProps {
  servings: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

/** Sits beside the ingredients heading — the amounts it scales are right underneath it. */
export function RecipeDetailServingsStepper({
  servings,
  onIncrease,
  onDecrease,
}: RecipeDetailServingsStepperProps): ReactElement {
  const intl = useIntl();

  return (
    <div className="border-border bg-surface flex items-center gap-1.5 rounded-lg border p-1 print:hidden">
      <Button
        variant="ghost"
        size="sm"
        isIconOnly
        onPress={onDecrease}
        aria-label={intl.formatMessage({
          description: "RecipeDetailServingsStepper: aria-label - fewer servings",
          defaultMessage: "Cook for fewer people",
          id: "sHelF7",
        })}
      >
        <MinusIcon className="h-4 w-4" />
      </Button>
      <span className="min-w-22 text-center text-sm font-medium" data-testid="recipe-detail__servings">
        {intl.formatMessage(
          {
            description: "RecipeDetailServingsStepper: label - servings",
            defaultMessage: "{count} people",
            id: "NwfLZa",
          },
          { count: servings }
        )}
      </span>
      <Button
        variant="ghost"
        size="sm"
        isIconOnly
        onPress={onIncrease}
        aria-label={intl.formatMessage({
          description: "RecipeDetailServingsStepper: aria-label - more servings",
          defaultMessage: "Cook for more people",
          id: "S3t+X9",
        })}
      >
        <PlusIcon className="h-4 w-4" />
      </Button>
    </div>
  );
}
