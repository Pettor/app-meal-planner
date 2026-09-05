import type { ReactElement } from "react";
import { Button, Card } from "@heroui/react";
import { useIntl } from "react-intl";
import { CommunityCardHeader } from "~/components/display/community-card-header/CommunityCardHeader";
import { TagChip } from "~/components/display/tag-chip/TagChip";
import { WeekDayStrip } from "~/components/display/week-day-strip/WeekDayStrip";
import type { CommunityPerson, SharedItemKind, SharedWeekDay } from "~/core/community/CommunityTypes";

/** One recommendation, resolved to the thing it points at. */
export interface InboxCardViewModel {
  id: string;
  kind: SharedItemKind;
  from: CommunityPerson;
  /** "recommended a week" / "recommended a recipe". */
  action: string;
  ago: string;
  note: string;
  /** The recommended week or recipe's title. */
  title: string;
  tags: string[];
  /** The week's seven days — empty for a recipe recommendation. */
  days: SharedWeekDay[];
}

export interface InboxCardProps {
  item: InboxCardViewModel;
  onOpenProfile: () => void;
  onAccept: () => void;
  onDismiss: () => void;
}

/** A recommendation someone sent you, with the two ways to clear it. */
export function InboxCard({ item, onOpenProfile, onAccept, onDismiss }: InboxCardProps): ReactElement {
  const intl = useIntl();

  return (
    <Card className="gap-0 overflow-hidden p-0" data-testid={`inbox-card__${item.id}`}>
      <CommunityCardHeader person={item.from} action={item.action} ago={item.ago} onOpenProfile={onOpenProfile} />

      <div className="flex flex-col gap-3 px-[18px] pb-4">
        <p className="text-base leading-relaxed text-pretty">{item.note}</p>

        <div className="bg-surface-secondary flex flex-wrap items-center gap-2.5 rounded-lg px-3.5 py-3">
          <span className="text-base font-semibold">{item.title}</span>
          <span className="flex flex-wrap gap-1.5">
            {item.tags.map((tag) => (
              <TagChip key={tag} tag={tag} />
            ))}
          </span>
        </div>

        {item.kind === "week" && <WeekDayStrip days={item.days} />}

        <div className="flex justify-end gap-2">
          <Button size="sm" variant="ghost" onPress={onDismiss} data-testid={`inbox-card__dismiss--${item.id}`}>
            {intl.formatMessage({
              description: "InboxCard: button - dismiss the recommendation",
              defaultMessage: "Dismiss",
              id: "kt4sjG",
            })}
          </Button>
          <Button size="sm" variant="primary" onPress={onAccept} data-testid={`inbox-card__accept--${item.id}`}>
            {item.kind === "week"
              ? intl.formatMessage({
                  description: "InboxCard: button - load the recommended week",
                  defaultMessage: "Load into planner",
                  id: "WB/jZK",
                })
              : intl.formatMessage({
                  description: "InboxCard: button - save the recommended recipe",
                  defaultMessage: "Save to my recipes",
                  id: "hhAIJL",
                })}
          </Button>
        </div>
      </div>
    </Card>
  );
}
