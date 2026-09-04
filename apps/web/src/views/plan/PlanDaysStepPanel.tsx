import type { ReactElement } from "react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Button, Card } from "@heroui/react";
import clsx from "clsx";
import { useIntl } from "react-intl";
import { ToggleChip } from "~/components/input/toggle-chip/ToggleChip";
import type { PlanDayRowViewModel } from "~/views/plan/UsePlanWizard";

export interface PlanDaysStepPanelProps {
  weekLine: string;
  hasExistingPlanForWeek: boolean;
  onOpenWeekPicker: () => void;
  dayRows: PlanDayRowViewModel[];
  mealSummary: string;
  onApplyFirstDayToAll: () => void;
}

/** Step 1: which meals each day needs, and for how many people. */
export function PlanDaysStepPanel({
  weekLine,
  hasExistingPlanForWeek,
  onOpenWeekPicker,
  dayRows,
  mealSummary,
  onApplyFirstDayToAll,
}: PlanDaysStepPanelProps): ReactElement {
  const intl = useIntl();

  const lunchLabel = intl.formatMessage({
    description: "PlanDaysStepPanel: toggle - lunch",
    defaultMessage: "Lunch",
    id: "aKrb75",
  });
  const dinnerLabel = intl.formatMessage({
    description: "PlanDaysStepPanel: toggle - dinner",
    defaultMessage: "Dinner",
    id: "OiZbQh",
  });
  const peopleLabel = intl.formatMessage({
    description: "PlanDaysStepPanel: label - people",
    defaultMessage: "People",
    id: "tJarrN",
  });

  return (
    <>
      <Card variant="secondary" className="mb-4.5 flex-row flex-wrap items-center gap-3.5 p-4">
        <span className="text-sm font-medium">{weekLine}</span>
        {hasExistingPlanForWeek && (
          <span className="text-default-500 text-sm">
            {intl.formatMessage({
              description: "PlanDaysStepPanel: body - editing an existing plan",
              defaultMessage: "This week already has a plan. Continuing edits it.",
              id: "LXNFEL",
            })}
          </span>
        )}
        <Button
          variant="ghost"
          size="sm"
          className="text-accent ml-auto px-0"
          onPress={onOpenWeekPicker}
          data-testid="plan__pick-week"
        >
          {intl.formatMessage({
            description: "PlanDaysStepPanel: button - pick a week",
            defaultMessage: "Pick a week",
            id: "VWTjY2",
          })}
        </Button>
      </Card>

      <Card className="gap-0 overflow-hidden p-0">
        {dayRows.map((row, index) => (
          <div
            key={row.day}
            className={clsx("flex flex-wrap items-center gap-4.5 px-6 py-4", index > 0 && "border-separator border-t")}
          >
            <div className="w-28 font-medium">{row.day}</div>
            <div className="flex gap-2">
              <ToggleChip label={lunchLabel} isSelected={row.isLunchOn} onChange={row.onToggleLunch} />
              <ToggleChip label={dinnerLabel} isSelected={row.isDinnerOn} onChange={row.onToggleDinner} />
            </div>
            <div className="ml-auto flex items-center gap-2.5">
              <span className="text-default-500 text-xs">{peopleLabel}</span>
              <Button
                variant="outline"
                size="sm"
                isIconOnly
                onPress={row.onDecreasePeople}
                aria-label={intl.formatMessage(
                  {
                    description: "PlanDaysStepPanel: aria-label - fewer people",
                    defaultMessage: "Fewer people on {day}",
                    id: "oulMCV",
                  },
                  { day: row.day }
                )}
              >
                <MinusIcon className="h-3.5 w-3.5" />
              </Button>
              <span className="min-w-5 text-center text-sm font-semibold">{row.people}</span>
              <Button
                variant="outline"
                size="sm"
                isIconOnly
                onPress={row.onIncreasePeople}
                aria-label={intl.formatMessage(
                  {
                    description: "PlanDaysStepPanel: aria-label - more people",
                    defaultMessage: "More people on {day}",
                    id: "E7ka2J",
                  },
                  { day: row.day }
                )}
              >
                <PlusIcon className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        ))}

        <div className="bg-surface-secondary flex flex-wrap items-center justify-between gap-3 px-6 py-4">
          <span className="text-default-500 text-sm">{mealSummary}</span>
          <Button variant="ghost" size="sm" className="text-accent px-0" onPress={onApplyFirstDayToAll}>
            {intl.formatMessage({
              description: "PlanDaysStepPanel: button - copy first day to all",
              defaultMessage: "Copy Monday's setup to all days",
              id: "lTDBlr",
            })}
          </Button>
        </div>
      </Card>
    </>
  );
}
