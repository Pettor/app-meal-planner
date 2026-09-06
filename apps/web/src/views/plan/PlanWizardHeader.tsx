import type { ReactElement } from "react";
import { Button } from "@heroui/react";
import clsx from "clsx";
import { useIntl } from "react-intl";

export interface PlanWizardHeaderProps {
  stepEyebrow: string;
  stepSubtitle: string;
  stepTabs: { label: string; name: string; isActive: boolean }[];
  canGoBack: boolean;
  onBack: () => void;
  nextLabel: string;
  onNext: () => void;
  showSaveDraft: boolean;
  onSaveDraft: () => void;
}

/** The wizard's title row (with step navigation) and the 4-cell step strip below it. */
export function PlanWizardHeader({
  stepEyebrow,
  stepSubtitle,
  stepTabs,
  canGoBack,
  onBack,
  nextLabel,
  onNext,
  showSaveDraft,
  onSaveDraft,
}: PlanWizardHeaderProps): ReactElement {
  const intl = useIntl();

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <div className="text-default-500 mb-2 text-xs font-medium tracking-[0.09em] uppercase">{stepEyebrow}</div>
          <h1 className="mb-2 text-4xl leading-none tracking-tight md:text-5xl">
            {intl.formatMessage({
              description: "PlanWizardHeader: heading - title prefix",
              defaultMessage: "Plan",
              id: "XPZa3R",
            })}{" "}
            <span className="text-gradient-brand font-extrabold">
              {intl.formatMessage({
                description: "PlanWizardHeader: heading - title accent",
                defaultMessage: "the week",
                id: "AbThIQ",
              })}
            </span>
          </h1>
          <p className="text-default-500 max-w-[54ch] text-base">{stepSubtitle}</p>
        </div>

        <div className="hidden gap-2 sm:flex">
          {canGoBack && (
            <Button variant="outline" onPress={onBack} data-testid="plan__back">
              {intl.formatMessage({
                description: "PlanWizardHeader: button - back",
                defaultMessage: "Back",
                id: "8bCmcG",
              })}
            </Button>
          )}
          {showSaveDraft && (
            <Button variant="secondary" onPress={onSaveDraft} data-testid="plan__save-draft">
              {intl.formatMessage({
                description: "PlanWizardHeader: button - save as draft",
                defaultMessage: "Save as draft",
                id: "xjYoqG",
              })}
            </Button>
          )}
          <Button variant="primary" onPress={onNext} data-testid="plan__next">
            {nextLabel}
          </Button>
        </div>
      </div>

      <div className="border-border bg-surface mt-4.5 mb-4 flex overflow-hidden rounded-lg border sm:mt-7 sm:mb-6">
        {stepTabs.map((tab, index) => (
          <div
            key={tab.label}
            className={clsx(
              "min-w-0 flex-1 px-2 py-2.25 text-center sm:px-4.5 sm:py-3 sm:text-left",
              index > 0 && "border-separator border-l",
              tab.isActive && "bg-accent/10 flex-[2.6] text-left sm:flex-1"
            )}
          >
            <div className="text-default-500 text-xs">{tab.label}</div>
            <div
              className={clsx(
                "truncate text-sm font-medium",
                tab.isActive ? "text-accent block" : "text-foreground hidden sm:block"
              )}
            >
              {tab.name}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
