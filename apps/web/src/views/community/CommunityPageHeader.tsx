import type { ReactElement } from "react";
import { InboxIcon } from "@heroicons/react/24/outline";
import { Button } from "@heroui/react";
import { useIntl } from "react-intl";

export interface CommunityPageHeaderProps {
  onOpenInbox: () => void;
}

/** The centred introduction above the community tabs. */
export function CommunityPageHeader({ onOpenInbox }: CommunityPageHeaderProps): ReactElement {
  const intl = useIntl();

  return (
    <div className="mx-auto flex max-w-[53.75rem] flex-col items-center gap-3.5 text-center">
      <div>
        <div className="text-default-500 mb-2 text-xs font-medium tracking-[0.09em] uppercase">
          {intl.formatMessage({
            description: "CommunityPageHeader: eyebrow - section name",
            defaultMessage: "Shared cooking",
            id: "PllmBT",
          })}
        </div>

        <h1 className="mb-2 text-5xl leading-[1.05] font-medium tracking-[-0.02em]">
          {intl.formatMessage({
            description: "CommunityPageHeader: heading - first half, plain",
            defaultMessage: "Cooking",
            id: "iwi9zd",
          })}{" "}
          <span className="text-gradient-brand font-extrabold">
            {intl.formatMessage({
              description: "CommunityPageHeader: heading - second half, emphasised",
              defaultMessage: "together",
              id: "bpMpOA",
            })}
          </span>
        </h1>

        <p className="text-default-500 mx-auto max-w-[56ch] text-base">
          {intl.formatMessage({
            description: "CommunityPageHeader: subtitle - what the community page is for",
            defaultMessage: "Weeks and recipes from the people you follow, and everyone else worth following.",
            id: "GlMb2D",
          })}
        </p>
      </div>

      <Button variant="outline" onPress={onOpenInbox} data-testid="community__open-inbox">
        <InboxIcon className="mr-1.5 h-[15px] w-[15px]" />
        {intl.formatMessage({
          description: "CommunityPageHeader: button - open the inbox",
          defaultMessage: "Inbox",
          id: "ZL6m5e",
        })}
      </Button>
    </div>
  );
}
