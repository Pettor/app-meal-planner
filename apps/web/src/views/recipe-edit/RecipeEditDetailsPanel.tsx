import type { ReactElement } from "react";
import { useIntl } from "react-intl";
import { TextInputField } from "~/components/input/input-field/TextInputField";

export interface RecipeEditDetailsPanelProps {
  title: string;
  servings: string;
  timeMinutes: string;
  onTitleChange: (title: string) => void;
  onServingsChange: (servings: string) => void;
  onTimeChange: (timeMinutes: string) => void;
}

export function RecipeEditDetailsPanel({
  title,
  servings,
  timeMinutes,
  onTitleChange,
  onServingsChange,
  onTimeChange,
}: RecipeEditDetailsPanelProps): ReactElement {
  const intl = useIntl();

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(11.25rem,1fr))] gap-4">
      <TextInputField
        className="col-span-full"
        value={title}
        onChange={onTitleChange}
        label={intl.formatMessage({
          description: "RecipeEditDetailsPanel: label - title",
          defaultMessage: "Title",
          id: "M9C79w",
        })}
        placeholder={intl.formatMessage({
          description: "RecipeEditDetailsPanel: placeholder - title",
          defaultMessage: "e.g. Mushroom risotto",
          id: "SGd0FW",
        })}
      />
      <TextInputField
        type="number"
        min={1}
        value={servings}
        onChange={onServingsChange}
        label={intl.formatMessage({
          description: "RecipeEditDetailsPanel: label - base servings",
          defaultMessage: "Base servings",
          id: "WLQOem",
        })}
        description={intl.formatMessage({
          description: "RecipeEditDetailsPanel: body - servings hint",
          defaultMessage: "Ingredients scale from this number.",
          id: "2GlLoE",
        })}
      />
      <TextInputField
        type="number"
        min={5}
        value={timeMinutes}
        onChange={onTimeChange}
        label={intl.formatMessage({
          description: "RecipeEditDetailsPanel: label - time in minutes",
          defaultMessage: "Time (minutes)",
          id: "yJcQt1",
        })}
      />
    </div>
  );
}
