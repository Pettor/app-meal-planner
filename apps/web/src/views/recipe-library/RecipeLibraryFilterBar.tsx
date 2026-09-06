import type { ReactElement } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Button } from "@heroui/react";
import { useIntl } from "react-intl";
import { TagChip } from "~/components/display/tag-chip/TagChip";
import { SearchField } from "~/components/input/input-field/SearchField";

export interface RecipeLibraryFilterBarProps {
  query: string;
  onQueryChange: (query: string) => void;
  availableTags: string[];
  selectedTags: string[];
  onToggleTag: (tag: string) => void;
  /** Opens the full catalogue, for tags no recipe in the pool carries yet. */
  onOpenTagBrowser: () => void;
  hasTagFilter: boolean;
  onClearTags: () => void;
}

export function RecipeLibraryFilterBar({
  query,
  onQueryChange,
  availableTags,
  selectedTags,
  onToggleTag,
  onOpenTagBrowser,
  hasTagFilter,
  onClearTags,
}: RecipeLibraryFilterBarProps): ReactElement {
  const intl = useIntl();

  return (
    <div className="mt-7 flex flex-wrap items-center gap-3">
      <SearchField
        value={query}
        onChange={onQueryChange}
        className="w-full sm:w-65"
        placeholder={intl.formatMessage({
          description: "RecipeLibraryFilterBar: placeholder - search recipes",
          defaultMessage: "Search recipes",
          id: "TLMnF1",
        })}
        ariaLabel={intl.formatMessage({
          description: "RecipeLibraryFilterBar: aria-label - search recipes",
          defaultMessage: "Search recipes",
          id: "BSVHvm",
        })}
      />
      <div className="flex flex-wrap items-center gap-1.5">
        {availableTags.map((tag) => (
          <TagChip key={tag} tag={tag} isSelected={selectedTags.includes(tag)} onPress={() => onToggleTag(tag)} />
        ))}

        <TagChip
          tag={intl.formatMessage({
            description: "RecipeLibraryFilterBar: button - browse the full tag catalogue",
            defaultMessage: "More tags",
            id: "AcHbon",
          })}
          onPress={onOpenTagBrowser}
          startContent={<PlusIcon className="h-3.5 w-3.5 shrink-0" />}
          className="text-accent border-dashed"
        />

        {hasTagFilter && (
          <Button variant="ghost" size="sm" className="text-accent" onPress={onClearTags}>
            {intl.formatMessage({
              description: "RecipeLibraryFilterBar: button - clear the tag filters",
              defaultMessage: "Clear filters",
              id: "F5XChG",
            })}
          </Button>
        )}
      </div>
    </div>
  );
}
