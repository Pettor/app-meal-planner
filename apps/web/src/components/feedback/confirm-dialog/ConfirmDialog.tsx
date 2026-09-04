import type { ReactElement } from "react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { Button, Modal } from "@heroui/react";
import { useIntl } from "react-intl";

export interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  /** The thing being acted on, shown in bold above the body copy. */
  subject?: string;
  body: string;
  confirmLabel: string;
  /** `danger` paints the confirm button red — use it for destructive actions. */
  tone?: "danger" | "accent";
  onConfirm: () => void;
  onCancel: () => void;
}

/** A small "are you sure?" modal for destructive or irreversible actions. */
export function ConfirmDialog({
  isOpen,
  title,
  subject,
  body,
  confirmLabel,
  tone = "danger",
  onConfirm,
  onCancel,
}: ConfirmDialogProps): ReactElement {
  const intl = useIntl();

  return (
    <Modal isOpen={isOpen} onOpenChange={(open) => !open && onCancel()}>
      <Modal.Backdrop variant="blur">
        <Modal.Container size="sm">
          <Modal.Dialog aria-label={title}>
            <Modal.Body className="flex flex-row gap-4 pt-6">
              <span
                className={
                  tone === "danger"
                    ? "bg-danger/12 text-danger flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                    : "bg-accent/12 text-accent flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                }
              >
                <ExclamationTriangleIcon className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <h3 className="mb-1.5 text-lg">{title}</h3>
                {subject && <p className="mb-2 text-base font-semibold">{subject}</p>}
                <p className="text-default-500 text-sm leading-relaxed">{body}</p>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="ghost" onPress={onCancel}>
                {intl.formatMessage({
                  description: "ConfirmDialog: button - cancel",
                  defaultMessage: "Cancel",
                  id: "d1juT6",
                })}
              </Button>
              <Button
                variant={tone === "danger" ? "danger" : "primary"}
                onPress={onConfirm}
                data-testid="confirm-dialog__confirm"
              >
                {confirmLabel}
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
