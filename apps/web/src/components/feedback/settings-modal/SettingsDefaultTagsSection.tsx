import type { ReactElement } from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { Button } from "@heroui/react";
import { useIntl } from "react-intl";
import { TagChip } from "~/components/display/tag-chip/TagChip";
import { TagBrowserDialog } from "~/components/feedback/tag-browser-dialog/TagBrowserDialog";
import type { RecipeTagCategory } from "~/core/recipes/RecipeTypes";

export interface SettingsDefaultTagsSectionProps {
  tags: string[];
  catalogue: RecipeTagCategory[];
  isBrowserOpen: boolean;
  onToggleTag: (tag: string) => void;
  onOpenBrowser: () => void;
  onCloseBrowser: () => void;
}

/** The tags the planner offers first, curated as a wall of removable chips. */
export function SettingsDefaultTagsSection({
  tags,
  catalogue,
  isBrowserOpen,
  onToggleTag,
  onOpenBrowser,
  onCloseBrowser,
}: SettingsDefaultTagsSectionProps): ReactElement {
  const intl = useIntl();

  return (
    <>
      <div className="flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <TagChip
            key={tag}
            tag={tag}
            onPress={() => onToggleTag(tag)}
            endContent={<XMarkIcon className="size-3.5" />}
          />
        ))}
      </div>

      {tags.length === 0 && (
        <p className="text-muted text-sm">
          {intl.formatMessage({
            description: "SettingsDefaultTagsSection: body - no default tags yet",
            defaultMessage: "No default tags yet.",
            id: "X4ZvvE",
          })}
        </p>
      )}

      <div>
        <Button variant="outline" size="sm" onPress={onOpenBrowser}>
          {intl.formatMessage({
            description: "SettingsDefaultTagsSection: button - browse all tags",
            defaultMessage: "Browse all tags",
            id: "4kR9M3",
          })}
        </Button>
      </div>

      <TagBrowserDialog
        isOpen={isBrowserOpen}
        description={intl.formatMessage({
          description: "SettingsDefaultTagsSection: body - tag browser purpose",
          defaultMessage: "Pick the tags offered first every time you plan a week.",
          id: "a87mY9",
        })}
        catalogue={catalogue}
        selectedTags={tags}
        onToggleTag={onToggleTag}
        onClose={onCloseBrowser}
      />
    </>
  );
}
