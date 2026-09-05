import type { ReactElement } from "react";
import { Button, Card, Chip } from "@heroui/react";
import { useIntl } from "react-intl";

export interface WeekDraftBannerProps {
  onPublish: () => void;
}

/** Shown while a week is still a draft — nothing is locked in until it is marked planned. */
export function WeekDraftBanner({ onPublish }: WeekDraftBannerProps): ReactElement {
  const intl = useIntl();

  return (
    <Card className="border-warning/45 mt-6.5 border print:hidden">
      <Card.Content className="flex flex-row flex-wrap items-center gap-3.5 p-5">
        <Chip size="sm" variant="soft" color="warning">
          {intl.formatMessage({ description: "WeekDraftBanner: chip - draft", defaultMessage: "Draft", id: "Rlu2gI" })}
        </Chip>
        <span className="text-default-500 min-w-55 flex-1 text-sm">
          {intl.formatMessage({
            description: "WeekDraftBanner: body - draft note",
            defaultMessage:
              "Still a draft. Nothing is locked in and it stays out of the way until you mark it planned.",
            id: "2Vv5Q8",
          })}
        </span>
        <Button variant="primary" size="sm" onPress={onPublish}>
          {intl.formatMessage({
            description: "WeekDraftBanner: button - mark as planned",
            defaultMessage: "Mark as planned",
            id: "bMWNs+",
          })}
        </Button>
      </Card.Content>
    </Card>
  );
}
