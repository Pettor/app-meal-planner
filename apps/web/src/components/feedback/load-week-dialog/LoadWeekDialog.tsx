import type { ReactElement } from "react";
import { Button, Modal } from "@heroui/react";
import { useIntl } from "react-intl";
import { UserAvatar } from "~/components/display/user-avatar/UserAvatar";
import { WeekDayStrip } from "~/components/display/week-day-strip/WeekDayStrip";
import type { CommunityPerson, SharedWeekDay } from "~/core/community/CommunityTypes";

export interface LoadWeekDialogProps {
  isOpen: boolean;
  weekTitle: string;
  owner: CommunityPerson;
  days: SharedWeekDay[];
  /** Which week it lands in, e.g. "12". */
  targetWeekNumber: string;
  /** How many of its recipes the cook doesn't own yet. */
  missingRecipeCount: number;
  onConfirm: () => void;
  onClose: () => void;
}

/**
 * Confirms loading someone else's week into the planner. It says what will
 * happen before it happens — which week it lands in, and how many recipes come
 * along with it — because the alternative is a planner that silently changed.
 */
export function LoadWeekDialog({
  isOpen,
  weekTitle,
  owner,
  days,
  targetWeekNumber,
  missingRecipeCount,
  onConfirm,
  onClose,
}: LoadWeekDialogProps): ReactElement {
  const intl = useIntl();

  const title = intl.formatMessage({
    description: "LoadWeekDialog: heading - title",
    defaultMessage: "Load this week?",
    id: "ly8KEp",
  });

  return (
    <Modal isOpen={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Modal.Backdrop variant="blur">
        <Modal.Container size="md">
          <Modal.Dialog aria-label={title}>
            <Modal.Header className="items-center gap-3">
              <UserAvatar name={owner.name} avatarUrl={owner.avatarUrl} color={owner.color} size="md" />
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="text-lg font-semibold">{weekTitle}</span>
                <span className="text-default-500 text-xs">
                  {owner.name} {owner.handle}
                </span>
              </span>
              <Modal.CloseTrigger />
            </Modal.Header>

            <Modal.Body className="flex flex-col gap-3.5">
              <WeekDayStrip days={days} />

              <p className="text-default-500 text-sm leading-relaxed">
                {intl.formatMessage(
                  {
                    description: "LoadWeekDialog: body - where the week lands",
                    defaultMessage: "Copied into week {week} as a draft. Nothing is saved until you say so.",
                    id: "mHHZp7",
                  },
                  { week: targetWeekNumber }
                )}
              </p>

              <p className="text-default-500 text-sm leading-relaxed">
                {missingRecipeCount > 0
                  ? intl.formatMessage(
                      {
                        description: "LoadWeekDialog: body - recipes that come with the week",
                        defaultMessage:
                          "Adds {count, plural, one {# recipe} other {# recipes}} you don't have yet to your own pool.",
                        id: "o9sAtj",
                      },
                      { count: missingRecipeCount }
                    )
                  : intl.formatMessage({
                      description: "LoadWeekDialog: body - nothing new to import",
                      defaultMessage: "Every recipe in it is already in your pool.",
                      id: "XO5mvo",
                    })}
              </p>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="ghost" onPress={onClose}>
                {intl.formatMessage({
                  description: "LoadWeekDialog: button - cancel",
                  defaultMessage: "Cancel",
                  id: "MvPzec",
                })}
              </Button>
              <Button variant="primary" onPress={onConfirm} data-testid="load-week-dialog__confirm">
                {intl.formatMessage({
                  description: "LoadWeekDialog: button - load the week into the planner",
                  defaultMessage: "Load into planner",
                  id: "i7u08p",
                })}
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
