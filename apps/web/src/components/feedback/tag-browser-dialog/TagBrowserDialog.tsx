import type { ReactElement } from "react";
import { Button, Modal } from "@heroui/react";
import { useIntl } from "react-intl";
import { useTagBrowser } from "./UseTagBrowser";
import { SearchField } from "~/components/input/input-field/SearchField";
import { ToggleChip } from "~/components/input/toggle-chip/ToggleChip";
import type { RecipeTagCategory } from "~/core/recipes/RecipeTypes";

export interface TagBrowserDialogProps {
  isOpen: boolean;
  /** Why the cook is picking tags — the copy differs per surface. */
  description: string;
  catalogue: RecipeTagCategory[];
  selectedTags: string[];
  onToggleTag: (tag: string) => void;
  onClose: () => void;
}

/** The community tag catalogue, browsable and searchable, used wherever tags are picked. */
export function TagBrowserDialog({
  isOpen,
  description,
  catalogue,
  selectedTags,
  onToggleTag,
  onClose,
}: TagBrowserDialogProps): ReactElement {
  const intl = useIntl();
  const { query, setQuery, groups, hasResults, creatableTag } = useTagBrowser(catalogue);

  const title = intl.formatMessage({
    description: "TagBrowserDialog: heading - title",
    defaultMessage: "Community tags",
    id: "Vz+Sn5",
  });

  return (
    <Modal isOpen={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Modal.Backdrop variant="blur">
        <Modal.Container size="lg">
          <Modal.Dialog aria-label={title}>
            <Modal.Header className="flex-col items-stretch gap-3">
              <div className="flex items-start gap-3">
                <div className="min-w-0 flex-1">
                  <Modal.Heading>{title}</Modal.Heading>
                  <p className="text-default-500 mt-1 text-sm">{description}</p>
                </div>
                <Modal.CloseTrigger />
              </div>
              <SearchField
                value={query}
                onChange={setQuery}
                placeholder={intl.formatMessage({
                  description: "TagBrowserDialog: placeholder - search tags",
                  defaultMessage: "Search community tags",
                  id: "cF1Cxm",
                })}
                ariaLabel={intl.formatMessage({
                  description: "TagBrowserDialog: aria-label - search tags",
                  defaultMessage: "Search community tags",
                  id: "8kQmVT",
                })}
              />
            </Modal.Header>

            <Modal.Body className="flex flex-col gap-5">
              {!hasResults && (
                <div className="flex flex-wrap items-center gap-2.5">
                  <p className="text-default-500 text-sm">
                    {intl.formatMessage({
                      description: "TagBrowserDialog: body - no tag matches",
                      defaultMessage: "No community tag matches that.",
                      id: "C56IiA",
                    })}
                  </p>
                  {creatableTag && (
                    <Button variant="outline" size="sm" onPress={() => onToggleTag(creatableTag)}>
                      {intl.formatMessage(
                        {
                          description: "TagBrowserDialog: button - create tag",
                          defaultMessage: 'Create "{tag}"',
                          id: "hr8Rbe",
                        },
                        { tag: creatableTag }
                      )}
                    </Button>
                  )}
                </div>
              )}

              {groups.map((group) => (
                <div key={group.group} className="flex flex-col gap-2">
                  <div className="text-default-500 text-[11px] font-semibold tracking-wider uppercase">
                    {group.group}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {group.tags.map((tag) => (
                      <ToggleChip
                        key={tag.name}
                        label={tag.name}
                        isSelected={selectedTags.includes(tag.name)}
                        onChange={() => onToggleTag(tag.name)}
                        endContent={
                          <span className="font-mono text-[11px] tabular-nums opacity-60">
                            {tag.count.toLocaleString()}
                          </span>
                        }
                      />
                    ))}
                  </div>
                </div>
              ))}
            </Modal.Body>

            <Modal.Footer className="justify-between">
              <span className="text-default-500 text-sm">
                {intl.formatMessage(
                  {
                    description: "TagBrowserDialog: footer - selected count",
                    defaultMessage: "{count} selected",
                    id: "K92okP",
                  },
                  { count: selectedTags.length }
                )}
              </span>
              <Button variant="primary" onPress={onClose}>
                {intl.formatMessage({
                  description: "TagBrowserDialog: button - done",
                  defaultMessage: "Done",
                  id: "utwxNU",
                })}
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
