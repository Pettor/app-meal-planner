import type { ReactElement } from "react";
import { useIntl } from "react-intl";
import { SearchField } from "~/components/input/input-field/SearchField";
import { ToggleChip } from "~/components/input/toggle-chip/ToggleChip";

export interface RecipeLibraryFilterBarProps {
  query: string;
  onQueryChange: (query: string) => void;
  availableTags: string[];
  selectedTags: string[];
  onToggleTag: (tag: string) => void;
}

export function RecipeLibraryFilterBar({
  query,
  onQueryChange,
  availableTags,
  selectedTags,
  onToggleTag,
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
      <div className="flex flex-wrap gap-1.5">
        {availableTags.map((tag) => (
          <ToggleChip key={tag} label={tag} isSelected={selectedTags.includes(tag)} onChange={() => onToggleTag(tag)} />
        ))}
      </div>
    </div>
  );
}
