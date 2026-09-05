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

        <div className="flex gap-2">
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

      <div className="border-border bg-surface mt-7 mb-6 flex overflow-hidden rounded-lg border">
        {stepTabs.map((tab, index) => (
          <div
            key={tab.label}
            className={clsx(
              "flex-1 px-4.5 py-3",
              index > 0 && "border-separator border-l",
              tab.isActive && "bg-accent/10"
            )}
          >
            <div className="text-default-500 text-xs">{tab.label}</div>
            <div className={clsx("text-sm font-medium", tab.isActive ? "text-accent" : "text-foreground")}>
              {tab.name}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
