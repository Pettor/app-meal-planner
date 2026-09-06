import type { ReactElement } from "react";
import { SparklesIcon } from "@heroicons/react/24/outline";
import { Button, Card } from "@heroui/react";
import { useIntl } from "react-intl";

export interface PlanGenerateStepPanelProps {
  mealsToFillCount: number;
  generateSummary: string;
  onGenerate: () => void;
  onStartEmpty: () => void;
}

/** Step 3: randomize the week from the pool, or start from a blank one. */
export function PlanGenerateStepPanel({
  mealsToFillCount,
  generateSummary,
  onGenerate,
  onStartEmpty,
}: PlanGenerateStepPanelProps): ReactElement {
  const intl = useIntl();

  return (
    <Card className="items-center gap-3.5 px-4.5 py-9 text-center sm:px-8 sm:py-16">
      <SparklesIcon className="text-accent h-8.5 w-8.5" />
      <h3 className="text-2xl">
        {intl.formatMessage(
          {
            description: "PlanGenerateStepPanel: heading - meals to fill",
            defaultMessage: "{count, plural, one {# meal to fill} other {# meals to fill}}",
            id: "VzuGmp",
          },
          { count: mealsToFillCount }
        )}
      </h3>
      <p className="text-default-500 max-w-[52ch]">{generateSummary}</p>
      <div className="mt-2 flex flex-wrap justify-center gap-2.5">
        <Button variant="primary" size="lg" onPress={onGenerate} data-testid="plan__randomize">
          {intl.formatMessage({
            description: "PlanGenerateStepPanel: button - randomize the week",
            defaultMessage: "Randomize the week",
            id: "9w1UOC",
          })}
        </Button>
        <Button variant="outline" size="lg" onPress={onStartEmpty} data-testid="plan__start-empty">
          {intl.formatMessage({
            description: "PlanGenerateStepPanel: button - start empty",
            defaultMessage: "Start empty and pick manually",
            id: "9btTru",
          })}
        </Button>
      </div>
      <p className="text-default-500 max-w-[46ch] text-sm">
        {intl.formatMessage({
          description: "PlanGenerateStepPanel: body - start empty hint",
          defaultMessage: "An empty week, one row per meal. Click any row to pick a recipe from the library.",
          id: "N/tUeR",
        })}
      </p>
    </Card>
  );
}
