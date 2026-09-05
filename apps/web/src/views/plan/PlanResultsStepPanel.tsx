import type { ReactElement } from "react";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { Button, Card } from "@heroui/react";
import { useIntl } from "react-intl";
import { DayColumn } from "~/components/display/day-column/DayColumn";
import { ToggleChip } from "~/components/input/toggle-chip/ToggleChip";
import type { PlanLayout } from "~/core/plan/PlanTypes";
import { PlanSlotCard } from "~/views/plan/PlanSlotCard";
import { PlanSlotRow } from "~/views/plan/PlanSlotRow";
import type { PlanGridDayViewModel, PlanSlotViewModel } from "~/views/plan/UsePlanWizard";

export interface PlanResultsStepPanelProps {
  layout: PlanLayout;
  onLayoutChange: (layout: PlanLayout) => void;
  quotaStatus: string;
  onRerollAll: () => void;
  slotRows: PlanSlotViewModel[];
  gridDays: PlanGridDayViewModel[];
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
        <div className="grid grid-cols-[repeat(auto-fit,minmax(13.25rem,1fr))] gap-3.5">
          {gridDays.map((day) => (
            <DayColumn
              key={day.dayLabel}
              dayLabel={day.dayLabel}
              dateNumber={day.dateNumber}
              monthLabel={day.monthLabel}
              peopleLabel={day.peopleLabel}
              isToday={day.isToday}
            >
              {day.slots.map((slot) => (
                <PlanSlotCard key={`${slot.day}-${slot.mealLine}`} slot={slot} />
              ))}

              {day.slots.length === 0 && (
                <span className="border-separator bg-surface-secondary text-default-500 flex flex-1 items-center justify-center border-t [background-image:radial-gradient(color-mix(in_oklch,var(--muted)_30%,transparent)_1px,transparent_1px)] [background-size:12px_12px] px-3.5 py-6.5 text-xs">
                  {intl.formatMessage({
                    description: "PlanResultsStepPanel: body - no meals",
                    defaultMessage: "No meals",
                    id: "+qTdy8",
                  })}
                </span>
              )}
            </DayColumn>
          ))}
        </div>
      )}
    </>
  );
}
