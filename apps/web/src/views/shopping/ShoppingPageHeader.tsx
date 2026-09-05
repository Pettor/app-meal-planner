import type { ReactElement } from "react";
import { PrinterIcon } from "@heroicons/react/24/outline";
import { Button } from "@heroui/react";
import { useIntl } from "react-intl";

export interface ShoppingPageHeaderProps {
  headingLead: string;
  headingAccent: string;
  subtitle: string;
  onPrint: () => void;
}

/** Title, week summary and the one action the shopping list offers. */
export function ShoppingPageHeader({
  headingLead,
  headingAccent,
  subtitle,
  onPrint,
}: ShoppingPageHeaderProps): ReactElement {
  const intl = useIntl();

  return (
    <div className="flex flex-wrap items-end justify-between gap-5 print:hidden">
      <div>
        <div className="text-default-500 mb-2 text-xs font-medium tracking-[0.09em] uppercase">
          {intl.formatMessage({
            description: "ShoppingPageHeader: eyebrow - from the plan",
            defaultMessage: "From the plan",
            id: "tOiWmt",
          })}
        </div>
        <h1 className="mb-2 text-4xl leading-none tracking-tight md:text-5xl">
          {headingLead} <span className="text-gradient-brand font-extrabold">{headingAccent}</span>
        </h1>
        <p className="text-default-500 text-base">{subtitle}</p>
      </div>

      <Button variant="outline" onPress={onPrint} data-testid="shopping-page__print-list">
        <PrinterIcon className="mr-1.5 h-4 w-4" />
        {intl.formatMessage({
          description: "ShoppingPageHeader: button - print list",
          defaultMessage: "Print list",
          id: "euXWAB",
        })}
      </Button>
    </div>
  );
}
