import type { ChangeEvent, ReactElement } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Button, Label, TextArea, TextField } from "@heroui/react";
import { useIntl } from "react-intl";
import type { RecipeStepDraft } from "~/views/recipe-edit/RecipeDraft";

export interface RecipeEditStepsPanelProps {
  steps: RecipeStepDraft[];
  onUpdate: (id: string, text: string) => void;
  onAdd: () => void;
  onRemove: (id: string) => void;
}

export function RecipeEditStepsPanel({ steps, onUpdate, onAdd, onRemove }: RecipeEditStepsPanelProps): ReactElement {
  const intl = useIntl();

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <Label>
          {intl.formatMessage({
            description: "RecipeEditStepsPanel: label - steps",
            defaultMessage: "Steps",
            id: "xTTsxs",
          })}
        </Label>
        <Button
          variant="ghost"
          size="sm"
          className="text-accent px-0"
          onPress={onAdd}
          data-testid="recipe-edit__add-step"
        >
          {intl.formatMessage({
            description: "RecipeEditStepsPanel: button - add step",
            defaultMessage: "+ Add step",
            id: "5atL0P",
          })}
        </Button>
      </div>

      <div className="flex flex-col gap-2">
        {steps.map((step, index) => (
          <div key={step.id} className="grid grid-cols-[1.75rem_1fr_2.25rem] items-start gap-2.5">
            <span className="bg-surface-secondary text-default-500 mt-2 flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold">
              {index + 1}
            </span>
            <TextField
              aria-label={intl.formatMessage(
                {
                  description: "RecipeEditStepsPanel: aria-label - step text",
                  defaultMessage: "Step {number}",
                  id: "P8mG5X",
                },
                { number: index + 1 }
              )}
            >
              <TextArea
                rows={2}
                value={step.text}
                onChange={(event: ChangeEvent<HTMLTextAreaElement>) => onUpdate(step.id, event.target.value)}
                placeholder={intl.formatMessage({
                  description: "RecipeEditStepsPanel: placeholder - step text",
                  defaultMessage: "Describe this step",
                  id: "lbZ1KO",
                })}
              />
            </TextField>
            <Button
              variant="ghost"
              size="sm"
              isIconOnly
              className="text-danger mt-1"
              onPress={() => onRemove(step.id)}
              aria-label={intl.formatMessage(
                {
                  description: "RecipeEditStepsPanel: aria-label - remove step",
                  defaultMessage: "Remove step {number}",
                  id: "vVwnor",
                },
                { number: index + 1 }
              )}
            >
              <XMarkIcon className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
