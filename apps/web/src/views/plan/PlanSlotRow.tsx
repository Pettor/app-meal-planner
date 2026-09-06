import type { ReactElement } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Button } from "@heroui/react";
import clsx from "clsx";
import { useIntl } from "react-intl";
import { RecipePhoto } from "~/components/display/recipe-photo/RecipePhoto";
import { TagChip } from "~/components/display/tag-chip/TagChip";
import type { PlanSlotViewModel } from "~/views/plan/UsePlanWizard";

export interface PlanSlotRowProps {
  slot: PlanSlotViewModel;
  isFirst: boolean;
}

/** One meal in the list layout of the refine-and-save step. */
export function PlanSlotRow({ slot, isFirst }: PlanSlotRowProps): ReactElement {
  const intl = useIntl();

  return (
    <div
      className={clsx(
        "grid grid-cols-1 gap-2.5 px-3.5 py-3",
        "sm:flex sm:flex-wrap sm:items-center sm:gap-4 sm:px-6 sm:py-3.5",
        !isFirst && "border-separator border-t"
      )}
    >
      <div className="sm:w-40 sm:shrink-0">
        <div className="text-sm font-medium">{slot.dayLabel}</div>
        <div className="text-default-500 text-xs">{slot.mealLine}</div>
      </div>

      {slot.isFilled ? (
        <>
          <div className="flex flex-wrap items-center gap-3 sm:min-w-50 sm:flex-1">
            <RecipePhoto
              photoUrl={slot.photoUrl}
              alt={slot.title}
              className="h-10 w-13 shrink-0 rounded-md"
              placeholderClassName="h-10 w-13 shrink-0 rounded-md"
            />
            <span className="font-medium">{slot.title}</span>
            <div className="flex flex-wrap gap-1.5">
              {slot.tags.map((tag) => (
                <TagChip key={tag} tag={tag} />
              ))}
            </div>
          </div>
          <div className="flex gap-1.5 sm:ml-auto">
            <Button variant="ghost" size="sm" className="flex-1 justify-center sm:flex-none" onPress={slot.onReroll}>
              {intl.formatMessage({
                description: "PlanSlotRow: button - reroll",
                defaultMessage: "Reroll",
                id: "RzwTtP",
              })}
            </Button>
            <Button variant="outline" size="sm" className="flex-1 justify-center sm:flex-none" onPress={slot.onSwap}>
              {intl.formatMessage({ description: "PlanSlotRow: button - swap", defaultMessage: "Swap", id: "ju3tYb" })}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-danger flex-1 justify-center sm:flex-none"
              onPress={slot.onClear}
            >
              {intl.formatMessage({
                description: "PlanSlotRow: button - clear",
                defaultMessage: "Clear",
                id: "6Dll0M",
              })}
            </Button>
          </div>
        </>
      ) : (
        <>
          <button
            type="button"
            className="border-border text-default-500 hover:border-accent hover:text-accent flex items-center gap-2 rounded-md border border-dashed px-3.5 py-2 text-sm transition-colors sm:min-w-50 sm:flex-1"
            onClick={slot.onSwap}
          >
            <PlusIcon className="h-4 w-4" />
            {intl.formatMessage({
              description: "PlanSlotRow: button - pick a recipe",
              defaultMessage: "Pick a recipe",
              id: "wbfNwW",
            })}
          </button>
          <div className="flex sm:ml-auto">
            <Button variant="ghost" size="sm" className="flex-1 justify-center sm:flex-none" onPress={slot.onReroll}>
              {intl.formatMessage({
                description: "PlanSlotRow: button - random",
                defaultMessage: "Random",
                id: "6LEZuD",
              })}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
