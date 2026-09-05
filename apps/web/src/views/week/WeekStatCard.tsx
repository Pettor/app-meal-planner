import type { ReactElement } from "react";
import { CalendarDaysIcon, GlobeAltIcon, UsersIcon } from "@heroicons/react/24/outline";
import { Card } from "@heroui/react";

/** Which of the three week figures a card is showing — fixes its icon and colour. */
export type WeekStatAccent = "accent" | "success" | "violet";

const ACCENTS: Record<WeekStatAccent, { tile: string; icon: ReactElement }> = {
  accent: { tile: "bg-accent/15 text-accent", icon: <CalendarDaysIcon className="h-5 w-5" /> },
  success: { tile: "bg-success/15 text-success", icon: <UsersIcon className="h-5 w-5" /> },
  violet: { tile: "bg-violet-500/15 text-violet-400", icon: <GlobeAltIcon className="h-5 w-5" /> },
};

export interface WeekStatCardProps {
  label: string;
  value: string;
  note: string;
  accent: WeekStatAccent;
}

/** One headline figure for the planned week — meals, plates or the vegetarian share. */
export function WeekStatCard({ label, value, note, accent }: WeekStatCardProps): ReactElement {
  const { tile, icon } = ACCENTS[accent];

  return (
    <Card>
      <Card.Content className="p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="text-default-500 text-sm font-medium">{label}</span>
          <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${tile}`}>{icon}</span>
        </div>
        <div className="mt-2 text-3xl font-semibold tracking-tight tabular-nums">{value}</div>
        <div className="text-default-500 mt-1 text-xs">{note}</div>
      </Card.Content>
    </Card>
  );
}
