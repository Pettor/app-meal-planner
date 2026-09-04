import type { ReactElement } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { Button, Modal } from "@heroui/react";
import clsx from "clsx";
import { useIntl } from "react-intl";
import type { PlanCalendarWeekViewModel } from "~/views/plan/UsePlanWizard";

export interface PlanWeekPickerDialogProps {
  isOpen: boolean;
  title: string;
  dayNames: string[];
  weeks: PlanCalendarWeekViewModel[];
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
  onClose: () => void;
}

/** "Pick a week" — a month calendar showing every week's plan status at a glance. */
export function PlanWeekPickerDialog({
  isOpen,
  title,
  dayNames,
  weeks,
  onPrevMonth,
  onNextMonth,
  onToday,
  onClose,
}: PlanWeekPickerDialogProps): ReactElement {
  const intl = useIntl();

  const heading = intl.formatMessage({
    description: "PlanWeekPickerDialog: heading - schedule",
    defaultMessage: "Schedule",
    id: "NmRcuK",
  });

  return (
    <Modal isOpen={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Modal.Backdrop variant="blur">
        <Modal.Container size="lg">
          <Modal.Dialog aria-label={heading} className="max-w-[35rem]">
            <Modal.Header className="flex-col items-stretch gap-4">
              <div className="flex items-start gap-3">
                <div className="min-w-0 flex-1">
                  <Modal.Heading>{heading}</Modal.Heading>
                  <p className="text-default-500 mt-1 text-sm">
                    {intl.formatMessage({
                      description: "PlanWeekPickerDialog: body - schedule description",
                      defaultMessage: "Everything already planned, at a glance. Click a week to work on it.",
                      id: "WNaLyn",
                    })}
                  </p>
                </div>
                <Modal.CloseTrigger />
              </div>
              <div className="flex items-center gap-2.5">
                <Button
                  variant="outline"
                  size="sm"
                  isIconOnly
                  onPress={onPrevMonth}
                  aria-label={intl.formatMessage({
                    description: "PlanWeekPickerDialog: aria-label - previous month",
                    defaultMessage: "Previous month",
                    id: "oTyAIm",
                  })}
                >
                  <ChevronLeftIcon className="h-4 w-4" />
                </Button>
                <span className="min-w-37.5 text-center text-base font-semibold capitalize">{title}</span>
                <Button
                  variant="outline"
                  size="sm"
                  isIconOnly
                  onPress={onNextMonth}
                  aria-label={intl.formatMessage({
                    description: "PlanWeekPickerDialog: aria-label - next month",
                    defaultMessage: "Next month",
                    id: "8onAi3",
                  })}
                >
                  <ChevronRightIcon className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-accent ml-auto px-0" onPress={onToday}>
                  {intl.formatMessage({
                    description: "PlanWeekPickerDialog: button - back to this week",
                    defaultMessage: "Back to this week",
                    id: "Ri4B7Y",
                  })}
                </Button>
              </div>
            </Modal.Header>

            <Modal.Body className="flex flex-col gap-1">
              <div className="grid grid-cols-[3.5rem_repeat(7,1fr)] gap-1 pb-1.5">
                <span />
                {dayNames.map((name) => (
                  <span
                    key={name}
                    className="text-default-500 text-center text-[10px] font-medium tracking-wider uppercase"
                  >
                    {name}
                  </span>
                ))}
              </div>
              {weeks.map((week) => (
                <button
                  key={week.weekNumber}
                  type="button"
                  onClick={week.onSelect}
                  className={clsx(
                    "hover:border-accent/40 grid grid-cols-[3.5rem_repeat(7,1fr)] items-center gap-1 rounded-md border p-1.5 text-left transition-colors",
                    week.isSelected ? "bg-accent/10 border-accent/45" : "border-transparent"
                  )}
                >
                  <span className="flex items-center gap-1.5 pl-0.5">
                    <span className={clsx("h-1.5 w-1.5 rounded-full", week.statusDotClassName)} />
                    <span className="text-default-500 text-xs font-medium">{week.weekNumber}</span>
                  </span>
                  {week.days.map((day, index) => (
                    <span key={index} className="flex flex-col items-center gap-0.5 py-0.5">
                      <span
                        className={clsx(
                          "flex h-5 w-5 items-center justify-center rounded-full text-xs",
                          day.isCurrentMonth ? "text-foreground" : "text-default-400",
                          day.isToday && "ring-accent font-bold ring-1"
                        )}
                      >
                        {day.dayNumber}
                      </span>
                      <span
                        className={clsx(
                          "bg-accent h-1 w-1 rounded-full",
                          day.hasPlannedMeal ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </span>
                  ))}
                </button>
              ))}
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
