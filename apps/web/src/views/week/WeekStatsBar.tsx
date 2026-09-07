import type { ReactElement } from "react";
import { Card } from "@heroui/react";
import clsx from "clsx";
import type { WeekStatViewModel } from "~/views/week/UseWeekOverview";

/** Which figure a cell is showing — the only thing colour encodes in the strip. */
export type WeekStatTone = "accent" | "sky" | "success" | "warning" | "violet" | "danger";

const DOTS: Record<WeekStatTone, string> = {
  accent: "bg-accent",
  sky: "bg-sky-500",
  success: "bg-success",
  warning: "bg-warning",
  violet: "bg-violet-500",
  danger: "bg-danger",
};

export interface WeekStatsBarProps {
  stats: WeekStatViewModel[];
}

/**
 * The planned week's headline figures, as one hairline-divided strip above the
 * day grid: meals, plates, vegetarian share, cook time, recipes and shopping
 * lines. Six across on a wide screen, wrapping to three and then two.
 */
export function WeekStatsBar({ stats }: WeekStatsBarProps): ReactElement {
  return (
    <Card className="overflow-hidden">
      <Card.Content className="p-0">
        <div className="bg-separator grid grid-cols-2 gap-px sm:grid-cols-3 lg:grid-cols-6">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-surface flex min-w-0 flex-col gap-px px-3.5 py-2.5">
              <span className="text-muted flex min-w-0 items-center gap-1.5 text-xs font-medium">
                <span className={clsx("size-[5px] flex-none rounded-full", DOTS[stat.tone])} />
                <span className="truncate">{stat.label}</span>
              </span>
              <span className="text-lg leading-[1.2] font-semibold tracking-[-0.01em] whitespace-nowrap tabular-nums">
                {stat.value}
              </span>
            </div>
          ))}
        </div>
      </Card.Content>
    </Card>
  );
}
