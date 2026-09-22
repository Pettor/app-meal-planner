import type { ReactElement } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Button } from "@heroui/react";
import { useIntl } from "react-intl";
import { TagChip } from "~/components/display/tag-chip/TagChip";

export interface RecipeLibraryTagFilterRowProps {
  /** The cook's default tags, plus any filter picked from the full catalogue. */
  quickTags: string[];
  selectedTags: string[];
  onToggleTag: (tag: string) => void;
  /** Opens the catalogue to filter by a tag that isn't a default one. */
  onOpenTagBrowser: () => void;
  /** Opens the catalogue to change which tags are offered here in the first place. */
  onEditDefaultTags: () => void;
  hasTagFilter: boolean;
  onClearTags: () => void;
}

/** The tag half of the find panel: the default tags as quick filters, and the way to change them. */
export function RecipeLibraryTagFilterRow({
  quickTags,
  selectedTags,
  onToggleTag,
  onOpenTagBrowser,
  onEditDefaultTags,
  hasTagFilter,
  onClearTags,
}: RecipeLibraryTagFilterRowProps): ReactElement {
  const intl = useIntl();

  return (
    <div className="border-accent/18 flex flex-wrap items-start gap-x-5 gap-y-3.5 border-t pt-3.5">
      <div className="w-[11.875rem] flex-none">
        <div className="text-sm font-semibold">
          {intl.formatMessage({
            description: "RecipeLibraryTagFilterRow: heading - filter by tag",
            defaultMessage: "Filter by tag",
            id: "JM61kV",
          })}
        </div>
        <p className="text-default-500 mt-1 text-xs">
          {intl.formatMessage({
            description: "RecipeLibraryTagFilterRow: body - filter by tag",
            defaultMessage: "Your default tags. A recipe must carry every tag you pick.",
            id: "sVjIK5",
          })}
        </p>
        <Button variant="ghost" size="sm" className="text-accent mt-1.5 h-auto p-0" onPress={onEditDefaultTags}>
          {intl.formatMessage({
            description: "RecipeLibraryTagFilterRow: button - edit default tags",
            defaultMessage: "Edit default tags",
            id: "/GllmQ",
          })}
        </Button>
      </div>

      <div className="flex min-w-60 flex-1 flex-wrap items-center gap-1.5">
        {quickTags.map((tag) => (
          <TagChip key={tag} tag={tag} isSelected={selectedTags.includes(tag)} onPress={() => onToggleTag(tag)} />
        ))}

        {quickTags.length === 0 && (
          <span className="text-default-500 text-xs">
            {intl.formatMessage({
              description: "RecipeLibraryTagFilterRow: label - no default tags yet",
              defaultMessage: "No default tags yet.",
              id: "HMSbos",
            })}
          </span>
        )}

        <TagChip
          tag={intl.formatMessage({
            description: "RecipeLibraryTagFilterRow: button - browse the full tag catalogue",
            defaultMessage: "More tags",
            id: "y5xhNU",
          })}
          onPress={onOpenTagBrowser}
          startContent={<PlusIcon className="h-3.5 w-3.5 shrink-0" />}
          className="text-accent border-dashed"
        />

        {hasTagFilter && (
          <Button variant="ghost" size="sm" className="text-accent" onPress={onClearTags}>
            {intl.formatMessage({
              description: "RecipeLibraryTagFilterRow: button - clear the tag filters",
              defaultMessage: "Clear",
              id: "8ntRnK",
            })}
          </Button>
        )}
      </div>
    </div>
  );
}
