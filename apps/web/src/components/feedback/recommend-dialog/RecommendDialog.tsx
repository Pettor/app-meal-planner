import type { ChangeEvent, ReactElement } from "react";
import { CheckIcon } from "@heroicons/react/24/outline";
import { Button, Label, ListBox, Modal, TextArea, TextField } from "@heroui/react";
import clsx from "clsx";
import { useIntl } from "react-intl";
import { UserAvatar } from "~/components/display/user-avatar/UserAvatar";
import type { CommunityPerson } from "~/core/community/CommunityTypes";

/** What `ListBox` hands back on selection — re-exported here to avoid depending on react-aria directly. */
type TargetSelection = NonNullable<ListBox["Props"]["selectedKeys"]>;

export interface RecommendDialogProps {
  isOpen: boolean;
  /** The week or recipe being recommended, named under the heading. */
  itemTitle: string;
  /** Who the cook can send to — the people they follow. */
  targets: CommunityPerson[];
  selectedIds: string[];
  note: string;
  onNoteChange: (note: string) => void;
  onToggleTarget: (personId: string) => void;
  onSend: () => void;
  onClose: () => void;
}

/** "Recommend" — sends a week or a recipe to the people you follow, with a note. */
export function RecommendDialog({
  isOpen,
  itemTitle,
  targets,
  selectedIds,
  note,
  onNoteChange,
  onToggleTarget,
  onSend,
  onClose,
}: RecommendDialogProps): ReactElement {
  const intl = useIntl();

  const title = intl.formatMessage({
    description: "RecommendDialog: heading - title",
    defaultMessage: "Recommend",
    id: "htLdoI",
  });

  const sendToLabel = intl.formatMessage({
    description: "RecommendDialog: label - who to send to",
    defaultMessage: "Send to",
    id: "jtywGX",
  });

  /**
   * `ListBox` reports the whole selection; the dialog's contract is a per-person
   * toggle, so replay the difference as individual toggles.
   */
  function onSelectionChange(keys: TargetSelection): void {
    const next = keys === "all" ? targets.map((person) => person.id) : Array.from(keys, String);
    const added = next.filter((id) => !selectedIds.includes(id));
    const removed = selectedIds.filter((id) => !next.includes(id));
    [...added, ...removed].forEach((personId) => onToggleTarget(personId));
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Modal.Backdrop variant="blur">
        <Modal.Container size="md">
          <Modal.Dialog aria-label={title}>
            <Modal.Header>
              <div className="min-w-0 flex-1">
                <Modal.Heading>{title}</Modal.Heading>
                <p className="text-default-500 mt-0.5 text-sm">{itemTitle}</p>
              </div>
              <Modal.CloseTrigger />
            </Modal.Header>

            <Modal.Body className="flex flex-col gap-4.5">
              <TextField>
                <Label>
                  {intl.formatMessage({
                    description: "RecommendDialog: label - note field",
                    defaultMessage: "Add a note",
                    id: "UTq19g",
                  })}
                </Label>
                <TextArea
                  rows={3}
                  value={note}
                  onChange={(event: ChangeEvent<HTMLTextAreaElement>) => onNoteChange(event.target.value)}
                  placeholder={intl.formatMessage({
                    description: "RecommendDialog: placeholder - note field",
                    defaultMessage: "Why they should cook this",
                    id: "15TlUz",
                  })}
                />
              </TextField>

              <div>
                <span className="mb-2.5 block text-sm font-medium">{sendToLabel}</span>

                <ListBox
                  aria-label={sendToLabel}
                  selectionMode="multiple"
                  selectedKeys={selectedIds}
                  onSelectionChange={onSelectionChange}
                  // `.list-box` spaces children with `mt-1`; the design uses a flex gap instead.
                  className="flex flex-col gap-2 p-0 [&>*+*]:mt-0"
                >
                  {targets.map((person) => (
                    <ListBox.Item
                      key={person.id}
                      id={person.id}
                      textValue={person.name}
                      className={clsx(
                        "gap-[11px] rounded-lg border px-3 py-2.5 text-left transition-colors",
                        selectedIds.includes(person.id)
                          ? "border-accent bg-accent/8"
                          : "border-border hover:bg-surface-secondary"
                      )}
                      data-testid={`recommend-dialog__target--${person.id}`}
                    >
                      <UserAvatar name={person.name} avatarUrl={person.avatarUrl} color={person.color} size="md" />
                      <span className="flex min-w-0 flex-1 flex-col">
                        <span className="text-sm font-medium">{person.name}</span>
                        <span className="text-default-500 text-xs">{person.handle}</span>
                      </span>
                      <ListBox.Item.Indicator>
                        {({ isSelected }) =>
                          isSelected ? <CheckIcon className="text-accent h-4.5 w-4.5" strokeWidth={2} /> : null
                        }
                      </ListBox.Item.Indicator>
                    </ListBox.Item>
                  ))}
                </ListBox>

                {targets.length === 0 && (
                  <p className="text-default-500 text-sm">
                    {intl.formatMessage({
                      description: "RecommendDialog: body - nobody to send to yet",
                      defaultMessage: "Follow someone and they show up here.",
                      id: "Lrqv+D",
                    })}
                  </p>
                )}
              </div>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="ghost" onPress={onClose}>
                {intl.formatMessage({
                  description: "RecommendDialog: button - cancel",
                  defaultMessage: "Cancel",
                  id: "KK6cUB",
                })}
              </Button>
              <Button
                variant="primary"
                isDisabled={selectedIds.length === 0}
                onPress={onSend}
                data-testid="recommend-dialog__send"
              >
                {intl.formatMessage({
                  description: "RecommendDialog: button - send the recommendation",
                  defaultMessage: "Send recommendation",
                  id: "Z0zFp+",
                })}
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
