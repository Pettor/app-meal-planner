import type { ReactElement } from "react";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { Button, Card } from "@heroui/react";
import { useIntl } from "react-intl";
import { ToggleChip } from "~/components/input/toggle-chip/ToggleChip";
import type { PlanLayout } from "~/core/plan/PlanTypes";
import { PlanSlotCard } from "~/views/plan/PlanSlotCard";
import { PlanSlotRow } from "~/views/plan/PlanSlotRow";
import type { PlanSlotViewModel } from "~/views/plan/UsePlanWizard";

export interface PlanResultsStepPanelProps {
  layout: PlanLayout;
  onLayoutChange: (layout: PlanLayout) => void;
  quotaStatus: string;
  onRerollAll: () => void;
  slotRows: PlanSlotViewModel[];
  gridDays: { dayLabel: string; slots: PlanSlotViewModel[] }[];
}

/** Step 4: the filled week, swappable and rerollable before it's saved. */
export function PlanResultsStepPanel({
  layout,
  onLayoutChange,
  quotaStatus,
  onRerollAll,
  slotRows,
  gridDays,
}: PlanResultsStepPanelProps): ReactElement {
  const intl = useIntl();

  return (
    <>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5">
          <span className="text-default-500 mr-1 text-xs">
            {intl.formatMessage({
              description: "PlanResultsStepPanel: label - layout",
              defaultMessage: "Layout",
              id: "5Tns1u",
            })}
          </span>
          <ToggleChip
            label={intl.formatMessage({
              description: "PlanResultsStepPanel: toggle - list layout",
              defaultMessage: "List",
              id: "523qrq",
            })}
            isSelected={layout === "rows"}
            onChange={() => onLayoutChange("rows")}
          />
          <ToggleChip
            label={intl.formatMessage({
              description: "PlanResultsStepPanel: toggle - week grid layout",
              defaultMessage: "Week grid",
              id: "xNJoth",
            })}
            isSelected={layout === "grid"}
            onChange={() => onLayoutChange("grid")}
          />
        </div>
        <div className="flex items-center gap-2.5">
          <span className="text-default-500 text-sm">{quotaStatus}</span>
          <Button variant="outline" onPress={onRerollAll} data-testid="plan__reroll-all">
            <ArrowPathIcon className="mr-1.5 h-4 w-4" />
            {intl.formatMessage({
              description: "PlanResultsStepPanel: button - reroll all",
              defaultMessage: "Reroll all",
              id: "n2Pgec",
            })}
          </Button>
        </div>
      </div>

      {layout === "rows" ? (
        <Card className="gap-0 overflow-hidden p-0">
          {slotRows.map((slot, index) => (
            <PlanSlotRow key={`${slot.day}-${slot.mealLine}`} slot={slot} isFirst={index === 0} />
          ))}
        </Card>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(9.5rem,1fr))] gap-3">
          {gridDays.map((day) => (
            <Card key={day.dayLabel} className="gap-2.5 p-3">
              <div className="text-default-500 text-xs font-semibold tracking-wider uppercase">{day.dayLabel}</div>
              {day.slots.map((slot) => (
                <PlanSlotCard key={`${slot.day}-${slot.mealLine}`} slot={slot} />
              ))}
              {day.slots.length === 0 && (
                <div className="text-default-500 px-0.5 py-1.5 text-xs">
                  {intl.formatMessage({
                    description: "PlanResultsStepPanel: body - no meals",
                    defaultMessage: "No meals",
                    id: "+qTdy8",
                  })}
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
