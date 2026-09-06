import { useState } from "react";
import type { ReactElement } from "react";
import { Button, Label } from "@heroui/react";
import { useIntl } from "react-intl";
import { TagChip } from "~/components/display/tag-chip/TagChip";
import { TextInputField } from "~/components/input/input-field/TextInputField";

export interface RecipeEditTagsPanelProps {
  /** Tags offered as chips: the recipe's own plus a handful of popular ones. */
  offeredTags: string[];
  selectedTags: string[];
  hasTagError: boolean;
  onToggleTag: (tag: string) => void;
  onAddTag: (tag: string) => void;
  onBrowseAllTags: () => void;
}

export function RecipeEditTagsPanel({
  offeredTags,
  selectedTags,
  hasTagError,
  onToggleTag,
  onAddTag,
  onBrowseAllTags,
}: RecipeEditTagsPanelProps): ReactElement {
  const intl = useIntl();
  const [newTag, setNewTag] = useState("");

  function handleAddTag(): void {
    onAddTag(newTag);
    setNewTag("");
  }

  return (
    <div>
      <Label className="mb-2.5 flex items-baseline gap-1.5">
        {intl.formatMessage({
          description: "RecipeEditTagsPanel: label - tags",
          defaultMessage: "Tags",
          id: "5onq0U",
        })}
        <span className="text-danger text-xs font-normal">
          {intl.formatMessage({
            description: "RecipeEditTagsPanel: label - required marker",
            defaultMessage: "required",
            id: "rFAApu",
          })}
        </span>
      </Label>

      <div className="flex flex-wrap gap-1.5">
        {offeredTags.map((tag) => (
          <TagChip key={tag} tag={tag} isSelected={selectedTags.includes(tag)} onPress={() => onToggleTag(tag)} />
        ))}
      </div>

      <div className="mt-3 flex max-w-85 gap-2">
        <TextInputField
          className="flex-1"
          value={newTag}
          onChange={setNewTag}
          placeholder={intl.formatMessage({
            description: "RecipeEditTagsPanel: placeholder - new tag",
            defaultMessage: "New tag, e.g. leftovers",
            id: "0mjKNh",
          })}
          ariaLabel={intl.formatMessage({
            description: "RecipeEditTagsPanel: aria-label - new tag",
            defaultMessage: "New tag",
            id: "wtGubL",
          })}
        />
        <Button variant="outline" onPress={handleAddTag} data-testid="recipe-edit__add-tag">
          {intl.formatMessage({
            description: "RecipeEditTagsPanel: button - add tag",
            defaultMessage: "Add",
            id: "SQ05Nm",
          })}
        </Button>
      </div>

      <div className="mt-2.5">
        <Button variant="ghost" size="sm" className="text-accent -ml-3" onPress={onBrowseAllTags}>
          {intl.formatMessage({
            description: "RecipeEditTagsPanel: button - browse all tags",
            defaultMessage: "Browse all tags",
            id: "XIlzTf",
          })}
        </Button>
      </div>

      {/*
       * The tag chips are not a form field, so HeroUI's `FieldError` has no
       * field context to render into and would silently show nothing. This is
       * the same standalone-error markup the sign-up form's terms checkbox uses.
       */}
      {hasTagError && (
        <span className="text-danger mt-2 block text-xs" role="alert" data-testid="recipe-edit__tag-error">
          {intl.formatMessage({
            description: "RecipeEditTagsPanel: error - at least one tag required",
            defaultMessage: "Pick at least one tag. The planner needs them.",
            id: "4pleys",
          })}
        </span>
      )}

      <p className="text-default-500 mt-2 text-xs">
        {intl.formatMessage({
          description: "RecipeEditTagsPanel: body - tags hint",
          defaultMessage: "Tags are how the planner reasons about a week. Add your own if none of these fit.",
          id: "eJNm3b",
        })}
      </p>
    </div>
  );
}
