import type { ReactElement } from "react";
import { ArrowPathIcon, ArrowsRightLeftIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Button } from "@heroui/react";
import { useIntl } from "react-intl";
import { RecipePhoto } from "~/components/display/recipe-photo/RecipePhoto";
import type { PlanSlotViewModel } from "~/views/plan/UsePlanWizard";

export interface PlanSlotCardProps {
  slot: PlanSlotViewModel;
}

/** One meal in the week-grid layout of the refine-and-save step. */
export function PlanSlotCard({ slot }: PlanSlotCardProps): ReactElement {
  const intl = useIntl();

  const rerollLabel = intl.formatMessage({
    description: "PlanSlotCard: button - reroll",
    defaultMessage: "Reroll",
    id: "zRyd/9",
  });
  const swapLabel = intl.formatMessage({
    description: "PlanSlotCard: button - swap",
    defaultMessage: "Swap",
    id: "Ndk+G7",
  });
  const clearLabel = intl.formatMessage({
    description: "PlanSlotCard: button - clear",
    defaultMessage: "Clear",
    id: "q+utlS",
  });

  return (
    <div className="border-border bg-surface-secondary flex flex-col gap-2 rounded-lg border p-2.5">
      <div className="text-default-500 text-[10px] tracking-wider uppercase">{slot.mealLine}</div>

      {slot.isFilled ? (
        <>
          <RecipePhoto
            photoUrl={slot.photoUrl}
            alt={slot.title}
            className="h-14 w-full rounded-md"
            placeholderClassName="h-14 w-full rounded-md"
          />
          <div className="text-sm leading-snug font-medium">{slot.title}</div>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              isIconOnly
              className="h-7 w-7"
              onPress={slot.onReroll}
              aria-label={rerollLabel}
            >
              <ArrowPathIcon className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              isIconOnly
              className="text-accent h-7 w-7"
              onPress={slot.onSwap}
              aria-label={swapLabel}
            >
              <ArrowsRightLeftIcon className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              isIconOnly
              className="text-danger h-7 w-7"
              onPress={slot.onClear}
              aria-label={clearLabel}
            >
              <XMarkIcon className="h-3.5 w-3.5" />
            </Button>
          </div>
        </>
      ) : (
        <button
          type="button"
          className="border-border text-default-500 hover:border-accent hover:text-accent flex min-h-19.5 w-full flex-col items-center justify-center gap-1 rounded-md border border-dashed text-xs transition-colors"
          onClick={slot.onSwap}
        >
          <PlusIcon className="h-4 w-4" />
          {intl.formatMessage({ description: "PlanSlotCard: button - pick", defaultMessage: "Pick", id: "bPL2Xj" })}
        </button>
      )}
    </div>
  );
}
