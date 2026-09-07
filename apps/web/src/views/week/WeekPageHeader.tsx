import type { ReactElement } from "react";
import { PencilSquareIcon, PrinterIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { Button } from "@heroui/react";
import { useIntl } from "react-intl";

export interface WeekPageHeaderProps {
  headingLead: string;
  headingAccent: string;
  subtitle: string;
  hasPlan: boolean;
  onPrint: () => void;
  onEditWeek: () => void;
  onPlanWeek: () => void;
}

/** Title and the actions available for the week in view — the week itself is switched from the navbar. */
export function WeekPageHeader({
  headingLead,
  headingAccent,
  subtitle,
  hasPlan,
  onPrint,
  onEditWeek,
  onPlanWeek,
}: WeekPageHeaderProps): ReactElement {
  const intl = useIntl();

  return (
    <div className="flex flex-wrap items-end justify-between gap-5 print:hidden">
      <div>
        <div className="text-default-500 mb-2 text-xs font-medium tracking-[0.09em] uppercase">
          {intl.formatMessage({
            description: "WeekPageHeader: eyebrow - current plan",
            defaultMessage: "Current plan",
            id: "lmWyK9",
          })}
        </div>
        <h1 className="mb-2 text-4xl leading-none tracking-tight md:text-5xl">
          {headingLead} <span className="text-gradient-brand font-extrabold">{headingAccent}</span>
        </h1>
        <p className="text-default-500 text-base">{subtitle}</p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {hasPlan && (
          <>
            <Button variant="outline" onPress={onPrint}>
              <PrinterIcon className="mr-1.5 h-4 w-4" />
              {intl.formatMessage({
                description: "WeekPageHeader: button - print week",
                defaultMessage: "Print week",
                id: "Fxu7cS",
              })}
            </Button>
            <Button variant="outline" onPress={onEditWeek}>
              <PencilSquareIcon className="mr-1.5 h-4 w-4" />
              {intl.formatMessage({
                description: "WeekPageHeader: button - edit week",
                defaultMessage: "Edit week",
                id: "v9CBj7",
              })}
            </Button>
          </>
        )}

        <Button variant="primary" onPress={onPlanWeek} data-testid="week-page__plan-week">
          <SparklesIcon className="mr-1.5 h-4 w-4" />
          {hasPlan
            ? intl.formatMessage({
                description: "WeekPageHeader: button - plan a new week",
                defaultMessage: "Plan a new week",
                id: "QJTLd8",
              })
            : intl.formatMessage({
                description: "WeekPageHeader: button - plan this week",
                defaultMessage: "Plan this week",
                id: "KcgMms",
              })}
        </Button>
      </div>
    </div>
  );
}
