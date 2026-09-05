import type { ReactNode, ReactElement } from "react";
import { Button, Card } from "@heroui/react";
import clsx from "clsx";
import { useIntl } from "react-intl";
import { TagChip } from "~/components/display/tag-chip/TagChip";
import { WeekDayStrip } from "~/components/display/week-day-strip/WeekDayStrip";
import { WeekPhotoStrip } from "~/components/display/week-photo-strip/WeekPhotoStrip";
import type { SharedWeekDay } from "~/core/community/CommunityTypes";

/** Everything a shared week shows, already localised and resolved to titles. */
export interface SharedWeekCardViewModel {
  id: string;
  title: string;
  note: string;
  tags: string[];
  days: SharedWeekDay[];
  photos: (string | null)[];
  /** e.g. "31 uses". */
  usesLabel: string;
  /** e.g. "2d ago". */
  agoLabel: string;
}

export interface SharedWeekCardProps {
  week: SharedWeekCardViewModel;
  /** The "who shared it" row. Omitted on a profile, where the owner is obvious. */
  header?: ReactNode;
  /** Puts the age beside the title instead of in the header. */
  showAgeBesideTitle?: boolean;
  onRecommend: () => void;
  onUse: () => void;
  className?: string;
}

/**
 * A week someone published: what it cooks, who it feeds, and the two things
 * you can do with it. The feed, the shared-weeks grid and a profile all render
 * the same card — only the header above it changes.
 */
export function SharedWeekCard({
  week,
  header,
  showAgeBesideTitle = false,
  onRecommend,
  onUse,
  className,
}: SharedWeekCardProps): ReactElement {
  const intl = useIntl();

  return (
    <Card className={clsx("flex flex-col gap-0 overflow-hidden p-0", className)}>
      {header}

      <WeekPhotoStrip photos={week.photos} weekTitle={week.title} />

      <div className="flex flex-1 flex-col gap-2.5 px-[18px] py-3.5">
        <div className="flex items-baseline justify-between gap-2.5">
          <div className="text-lg leading-tight font-semibold text-pretty">{week.title}</div>
          {showAgeBesideTitle && <span className="text-default-500 flex-none text-xs">{week.agoLabel}</span>}
        </div>

        <p className="text-default-500 flex-1 text-sm">{week.note}</p>

        <div className="flex flex-wrap gap-1.5">
          {week.tags.map((tag) => (
            <TagChip key={tag} tag={tag} />
          ))}
        </div>

        <WeekDayStrip days={week.days} />
      </div>

      <div className="border-border bg-surface-secondary flex items-center gap-2 border-t px-[18px] py-3">
        <span className="text-default-500 text-xs">{week.usesLabel}</span>

        <Button size="sm" variant="ghost" className="ml-auto rounded-full" onPress={onRecommend}>
          {intl.formatMessage({
            description: "SharedWeekCard: button - send this week to someone",
            defaultMessage: "Recommend",
            id: "07uOqY",
          })}
        </Button>
        <Button size="sm" variant="primary" className="rounded-full" onPress={onUse}>
          {intl.formatMessage({
            description: "SharedWeekCard: button - load this week into the planner",
            defaultMessage: "Use this week",
            id: "yv8skB",
          })}
        </Button>
      </div>
    </Card>
  );
}
