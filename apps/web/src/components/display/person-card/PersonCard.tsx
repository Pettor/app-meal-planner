import type { ReactElement } from "react";
import { Button, Card, Chip } from "@heroui/react";
import { useIntl } from "react-intl";
import { UserAvatar } from "~/components/display/user-avatar/UserAvatar";
import type { CommunityPerson } from "~/core/community/CommunityTypes";

export interface PersonCardProps {
  person: CommunityPerson;
  /** What they have published, e.g. "3 weeks · 12 recipes". */
  counts: string;
  isFollowing: boolean;
  onToggleFollow: () => void;
  onOpenProfile: () => void;
}

/** Someone worth following: who they are, what they cook, and the follow toggle. */
export function PersonCard({
  person,
  counts,
  isFollowing,
  onToggleFollow,
  onOpenProfile,
}: PersonCardProps): ReactElement {
  const intl = useIntl();

  return (
    <Card className="hover:border-accent/40 flex flex-col gap-3.5 border border-transparent transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_24px_-12px_color-mix(in_oklch,var(--foreground)_26%,transparent)]">
      <div className="flex items-center gap-3">
        <UserAvatar name={person.name} avatarUrl={person.avatarUrl} color={person.color} size="lg" />
        <span className="flex min-w-0 flex-col gap-0.5">
          <span className="text-base font-semibold">{person.name}</span>
          <span className="text-default-500 text-xs">
            {person.handle} · {counts}
          </span>
        </span>
      </div>

      <p className="text-default-500 flex-1 text-sm">{person.bio}</p>

      <div className="flex items-center gap-2">
        {person.followsMe && (
          <Chip size="sm" variant="soft">
            {intl.formatMessage({
              description: "PersonCard: chip - this person already follows you",
              defaultMessage: "Follows you",
              id: "IYe/An",
            })}
          </Chip>
        )}

        <Button size="sm" variant="ghost" className="ml-auto rounded-full" onPress={onOpenProfile}>
          {intl.formatMessage({
            description: "PersonCard: button - open this person's profile",
            defaultMessage: "View profile",
            id: "BxkWlB",
          })}
        </Button>
        <Button
          size="sm"
          variant={isFollowing ? "outline" : "primary"}
          className="rounded-full"
          onPress={onToggleFollow}
          data-testid={`person-card__follow--${person.id}`}
        >
          {isFollowing
            ? intl.formatMessage({
                description: "PersonCard: button - already following, press to unfollow",
                defaultMessage: "Following",
                id: "Fs1B/V",
              })
            : intl.formatMessage({
                description: "PersonCard: button - start following this person",
                defaultMessage: "Follow",
                id: "8ko/LM",
              })}
        </Button>
      </div>
    </Card>
  );
}
