import type { ReactElement } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { Button, Tooltip } from "@heroui/react";
import clsx from "clsx";
import { useIntl } from "react-intl";

export interface WeekSwitcherProps {
  /** Short relative name of the week in view, e.g. "This week" or "Week 14". */
  label: string;
  /** The week's range, shown on hover — e.g. "week 14 · 3 Apr – 9 Apr". */
  hint: string;
  /** Colour of the status dot, mirroring the week picker's plan-status dots. */
  statusDotClassName: string;
  onPrevious: () => void;
  onNext: () => void;
  onOpenPicker: () => void;
}

/** Step a week back or forward, or open the calendar to jump to any week. */
export function WeekSwitcher({
  label,
  hint,
  statusDotClassName,
  onPrevious,
  onNext,
  onOpenPicker,
}: WeekSwitcherProps): ReactElement {
  const intl = useIntl();

  return (
    <div className="border-border bg-surface flex items-center gap-0.5 rounded-lg border p-0.5">
      <Button
        variant="ghost"
        size="sm"
        isIconOnly
        onPress={onPrevious}
        aria-label={intl.formatMessage({
          description: "WeekSwitcher: aria-label - previous week",
          defaultMessage: "Previous week",
          id: "Pvto38",
        })}
      >
        <ChevronLeftIcon className="h-4 w-4" />
      </Button>
      <Tooltip>
        <Tooltip.Trigger>
          <Button variant="ghost" size="sm" className="gap-1.5 px-2 font-medium" onPress={onOpenPicker}>
            <span className={clsx("h-1.5 w-1.5 rounded-full", statusDotClassName)} />
            {label}
          </Button>
        </Tooltip.Trigger>
        <Tooltip.Content>{hint}</Tooltip.Content>
      </Tooltip>
      <Button
        variant="ghost"
        size="sm"
        isIconOnly
        onPress={onNext}
        aria-label={intl.formatMessage({
          description: "WeekSwitcher: aria-label - next week",
          defaultMessage: "Next week",
          id: "s+cEGl",
        })}
      >
        <ChevronRightIcon className="h-4 w-4" />
      </Button>
    </div>
  );
}
