import type { ReactElement } from "react";
import { ArrowPathIcon, ArrowsRightLeftIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Button } from "@heroui/react";
import clsx from "clsx";
import { useIntl } from "react-intl";
import { RecipePhoto } from "~/components/display/recipe-photo/RecipePhoto";
import { TagChip } from "~/components/display/tag-chip/TagChip";
import type { PlanSlotViewModel } from "~/views/plan/UsePlanWizard";

export interface PlanSlotCardProps {
  slot: PlanSlotViewModel;
}

/**
 * One meal in the week-grid layout of the refine-and-save step. It mirrors the
 * planned week's meal card so the review reads like the page it becomes, with
 * the reroll/swap/clear actions in place of opening the recipe.
 */
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
    <div className="border-separator flex flex-1 flex-col border-t">
      <div className="flex items-baseline justify-between gap-2 px-3.5 pt-2.75 pb-2.25">
        <span
          className={clsx(
            "flex items-center gap-1.5 text-[10px] font-bold tracking-[0.09em] uppercase",
            slot.isDinner ? "text-accent" : "text-warning"
          )}
        >
          <span className={clsx("h-1.5 w-1.5 rounded-full", slot.isDinner ? "bg-accent" : "bg-warning")} />
          {slot.mealLabel}
        </span>
        <span className="text-default-500 text-xs">{slot.peopleLabel}</span>
      </div>

      {slot.isFilled ? (
        <>
          <RecipePhoto photoUrl={slot.photoUrl} alt={slot.title} className="h-26" placeholderClassName="h-26" />

          <div className="px-3.5 pt-3 text-lg leading-tight font-semibold text-pretty">{slot.title}</div>
          <div className="flex flex-wrap content-start gap-1.25 px-3.5 pt-2.5">
            {slot.tags.map((tag) => (
              <TagChip key={tag} tag={tag} />
            ))}
          </div>

          {/* The actions stay under the tags rather than at the column's foot,
              so a day with one meal does not strand them below a tall gap. */}
          <div className="flex gap-1 px-3 pt-3 pb-2.5">
            <Button variant="ghost" size="sm" isIconOnly onPress={slot.onReroll} aria-label={rerollLabel}>
              <ArrowPathIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              isIconOnly
              className="text-accent"
              onPress={slot.onSwap}
              aria-label={swapLabel}
            >
              <ArrowsRightLeftIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              isIconOnly
              className="text-danger ml-auto"
              onPress={slot.onClear}
              aria-label={clearLabel}
            >
              <XMarkIcon className="h-4 w-4" />
            </Button>
          </div>
        </>
      ) : (
        <button
          type="button"
          className="text-default-500 hover:text-accent hover:bg-accent/6 flex flex-1 cursor-pointer flex-col items-center justify-center gap-1.5 [background-image:radial-gradient(color-mix(in_oklch,var(--muted)_30%,transparent)_1px,transparent_1px)] [background-size:12px_12px] px-3.5 py-8 text-xs transition-colors"
          onClick={slot.onSwap}
        >
          <PlusIcon className="h-4.5 w-4.5" />
          {intl.formatMessage({
            description: "PlanSlotCard: button - pick a recipe",
            defaultMessage: "Pick a recipe",
            id: "3Emciz",
          })}
        </button>
      )}
    </div>
  );
}
