import type { ReactElement, ReactNode } from "react";
import { Chip } from "@heroui/react";
import clsx from "clsx";
import { useIntl } from "react-intl";

export interface DayColumnProps {
  dayLabel: string;
  /** Day of the month, e.g. `"31"`. */
  dateNumber: string;
  /** Short month name, e.g. `"Aug"`. */
  monthLabel: string;
  peopleLabel: string;
  isToday: boolean;
  /** The meals on the day — one stacked block per meal. */
  children: ReactNode;
}

/**
 * One day of a week laid out as a column: a tinted date header over whatever
 * the page puts on the day. Shared by the planned week and the planner's
 * week-grid review so both read as the same calendar.
 */
export function DayColumn({
  dayLabel,
  dateNumber,
  monthLabel,
  peopleLabel,
  isToday,
  children,
}: DayColumnProps): ReactElement {
  const intl = useIntl();

  return (
    <div
      className={clsx(
        "flex flex-col overflow-hidden rounded-xl border",
        isToday ? "border-accent/50" : "border-border"
      )}
    >
      <div className={clsx("flex items-center gap-2.5 px-3.5 py-3", isToday ? "bg-accent/12" : "bg-surface-secondary")}>
        <span className="flex min-w-7.5 flex-col items-center leading-none">
          <span className={clsx("text-xl font-bold", isToday ? "text-accent" : "text-foreground")}>{dateNumber}</span>
          <span className="text-default-500 mt-1 text-[9px] tracking-[0.09em] uppercase">{monthLabel}</span>
        </span>
        <span className="flex min-w-0 flex-col gap-0.5">
          <span className={clsx("text-sm font-semibold", isToday ? "text-accent" : "text-foreground")}>{dayLabel}</span>
          <span className="text-default-500 text-xs">{peopleLabel}</span>
        </span>
        {isToday && (
          <Chip size="sm" variant="soft" color="accent" className="ml-auto">
            {intl.formatMessage({ description: "DayColumn: chip - today", defaultMessage: "Today", id: "b10tP/" })}
          </Chip>
        )}
      </div>

      <div className="flex flex-1 flex-col">{children}</div>
    </div>
  );
}
