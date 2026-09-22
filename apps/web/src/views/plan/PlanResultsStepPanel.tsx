import type { ReactElement } from "react";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { Button, Card } from "@heroui/react";
import { useIntl } from "react-intl";
import { DayColumn } from "~/components/display/day-column/DayColumn";
import { EmptySlot } from "~/components/display/empty-slot/EmptySlot";
import { LayoutToggle } from "~/components/input/layout-toggle/LayoutToggle";
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
        <LayoutToggle
          options={[
            {
              value: "rows",
              label: intl.formatMessage({
                description: "PlanResultsStepPanel: toggle - list layout",
                defaultMessage: "List",
                id: "523qrq",
              }),
            },
            {
              value: "grid",
              label: intl.formatMessage({
                description: "PlanResultsStepPanel: toggle - week grid layout",
                defaultMessage: "Week grid",
                id: "xNJoth",
              }),
            },
          ]}
          value={layout}
          onChange={onLayoutChange}
        />
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
                <EmptySlot
                  label={intl.formatMessage({
                    description: "PlanResultsStepPanel: body - no meals",
                    defaultMessage: "No meals",
                    id: "+qTdy8",
                  })}
                />
              )}
            </DayColumn>
          ))}
        </div>
      )}
    </>
  );
}
