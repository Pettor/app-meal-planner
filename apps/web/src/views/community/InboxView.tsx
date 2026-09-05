import type { ReactElement } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Button, Card } from "@heroui/react";
import { useIntl } from "react-intl";
import type { InboxCardViewModel } from "~/views/community/InboxCard";
import { InboxCard } from "~/views/community/InboxCard";

export interface InboxViewProps {
  items: InboxCardViewModel[];
  onBack: () => void;
  onOpenProfile: (personId: string) => void;
  onAccept: (itemId: string) => void;
  onDismiss: (itemId: string) => void;
}

/** "Inbox" — recommendations sent straight to the cook, rather than to the feed. */
export function InboxView({ items, onBack, onOpenProfile, onAccept, onDismiss }: InboxViewProps): ReactElement {
  const intl = useIntl();

  return (
    <div className="mx-auto w-full max-w-[77.5rem] px-6 py-9">
      <Button variant="ghost" className="mb-4.5" onPress={onBack} data-testid="inbox__back">
        <ArrowLeftIcon className="mr-1.5 h-[15px] w-[15px]" />
        {intl.formatMessage({
          description: "InboxView: button - back to the community",
          defaultMessage: "Community",
          id: "TaspoA",
        })}
      </Button>

      <div className="text-default-500 mb-2 text-xs font-medium tracking-[0.09em] uppercase">
        {intl.formatMessage({
          description: "InboxView: eyebrow - section name",
          defaultMessage: "Shared cooking",
          id: "/rOIp3",
        })}
      </div>

      <h1 className="mb-2 text-5xl leading-[1.05] font-medium tracking-[-0.02em]">
        {intl.formatMessage({
          description: "InboxView: heading - page title",
          defaultMessage: "Inbox",
          id: "3Z+0jz",
        })}
      </h1>

      <p className="text-default-500 text-base">
        {intl.formatMessage({
          description: "InboxView: subtitle - what the inbox holds",
          defaultMessage: "Recommendations sent straight to you.",
          id: "IdCF39",
        })}
      </p>

      <div className="mt-6.5 flex max-w-[45rem] flex-col gap-3.5">
        {items.map((item) => (
          <InboxCard
            key={item.id}
            item={item}
            onOpenProfile={() => onOpenProfile(item.from.id)}
            onAccept={() => onAccept(item.id)}
            onDismiss={() => onDismiss(item.id)}
          />
        ))}
      </div>

      {items.length === 0 && (
        <Card variant="secondary" className="mt-6.5 max-w-[45rem] p-14 text-center">
          <p className="text-default-500">
            {intl.formatMessage({
              description: "InboxView: body - nothing waiting",
              defaultMessage: "Nothing in your inbox.",
              id: "/oH5pZ",
            })}
          </p>
        </Card>
      )}
    </div>
  );
}
