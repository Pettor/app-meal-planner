import type { ReactElement } from "react";
import { Modal } from "@heroui/react";
import { useIntl } from "react-intl";
import { TagChip } from "~/components/display/tag-chip/TagChip";
import { SearchField } from "~/components/input/input-field/SearchField";

export interface PlanRecipeSwapDialogProps {
  isOpen: boolean;
  title: string;
  resultsLabel: string;
  hasNoResults: boolean;
  query: string;
  onQueryChange: (query: string) => void;
  tagChips: { tag: string; isSelected: boolean; onToggle: () => void }[];
  options: { title: string; timeLabel: string; tags: string[]; onPick: () => void }[];
  onClose: () => void;
}

/** Picks a recipe for one slot — search and tag filters over the cook's own pool. */
export function PlanRecipeSwapDialog({
  isOpen,
  title,
  resultsLabel,
  hasNoResults,
  query,
  onQueryChange,
  tagChips,
  options,
  onClose,
}: PlanRecipeSwapDialogProps): ReactElement {
  const intl = useIntl();

  const searchLabel = intl.formatMessage({
    description: "PlanRecipeSwapDialog: placeholder - search recipes",
    defaultMessage: "Search recipes",
    id: "WNIGvz",
  });

  return (
    <Modal isOpen={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Modal.Backdrop variant="blur">
        <Modal.Container size="lg">
          <Modal.Dialog aria-label={title} className="max-w-[42.5rem]">
            <Modal.Header className="flex-col items-stretch gap-3">
              <div className="flex items-start gap-3">
                <div className="min-w-0 flex-1">
                  <Modal.Heading>{title}</Modal.Heading>
                  <p className="text-default-500 mt-1 text-sm">{resultsLabel}</p>
                </div>
                <Modal.CloseTrigger />
              </div>
              <SearchField value={query} onChange={onQueryChange} placeholder={searchLabel} ariaLabel={searchLabel} />
              {tagChips.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {tagChips.map((chip) => (
                    <TagChip key={chip.tag} tag={chip.tag} isSelected={chip.isSelected} onPress={chip.onToggle} />
                  ))}
                </div>
              )}
            </Modal.Header>

            <Modal.Body>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(13.125rem,1fr))] gap-2.5">
                {options.map((option) => (
                  <button
                    key={option.title}
                    type="button"
                    onClick={option.onPick}
                    className="border-border bg-surface-secondary hover:border-accent/40 flex flex-col gap-2 rounded-lg border p-3 text-left transition-colors"
                  >
                    <span className="flex items-baseline justify-between gap-2">
                      <span className="text-sm font-medium">{option.title}</span>
                      <span className="text-default-500 shrink-0 text-xs">{option.timeLabel}</span>
                    </span>
                    <span className="flex flex-wrap gap-1">
                      {option.tags.map((tag) => (
                        <TagChip key={tag} tag={tag} />
                      ))}
                    </span>
                  </button>
                ))}
              </div>
              {hasNoResults && (
                <p className="text-default-500 py-7 text-center text-sm">
                  {intl.formatMessage({
                    description: "PlanRecipeSwapDialog: body - no recipes match",
                    defaultMessage: "No recipes match that search.",
                    id: "kjNUNf",
                  })}
                </p>
              )}
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
