import type { ReactElement } from "react";
import clsx from "clsx";
import type { SharedWeekDay } from "~/core/community/CommunityTypes";

export interface WeekDayStripProps {
  days: SharedWeekDay[];
  className?: string;
}

/**
 * The seven-column summary of what a shared week actually cooks. Deliberately
 * tiny — it is there to be scanned, not read, before someone loads the week.
 */
export function WeekDayStrip({ days, className }: WeekDayStripProps): ReactElement {
  return (
    <div className={clsx("grid grid-cols-7 gap-1", className)}>
      {days.map((day, index) => (
        <span key={index} className="bg-surface-secondary flex min-w-0 flex-col gap-1 rounded-md px-[7px] py-2">
          <span className="text-default-500 text-[9px] font-semibold tracking-[0.08em] uppercase">{day.day}</span>
          <span className="text-[10px] leading-[1.3] text-pretty">{day.title}</span>
        </span>
      ))}
    </div>
  );
}
