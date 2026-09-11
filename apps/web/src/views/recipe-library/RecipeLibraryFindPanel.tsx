import type { ReactElement } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Button } from "@heroui/react";
import { useIntl } from "react-intl";
import { SearchField } from "~/components/input/input-field/SearchField";
import { RecipeLibraryTagFilterRow } from "~/views/recipe-library/RecipeLibraryTagFilterRow";
import type { RecipeLibraryTagFilterRowProps } from "~/views/recipe-library/RecipeLibraryTagFilterRow";

export interface RecipeLibraryFindPanelProps extends RecipeLibraryTagFilterRowProps {
  query: string;
  onQueryChange: (query: string) => void;
  /** Recipes left after the filters. */
  shownCount: number;
  /** Recipes in the pool before any filter. */
  totalCount: number;
  onBrowseCommunity: () => void;
}

/**
 * Everything that narrows the pool, gathered into one panel: the search box, the
 * default tags as quick filters, and a count of what survived them.
 */
export function RecipeLibraryFindPanel({
  query,
  onQueryChange,
  shownCount,
  totalCount,
  onBrowseCommunity,
  ...tagFilter
}: RecipeLibraryFindPanelProps): ReactElement {
  const intl = useIntl();

  return (
    <section className="border-accent/26 mt-5 flex flex-col gap-3.5 rounded-xl border bg-[color-mix(in_oklch,var(--accent)_5%,var(--surface))] px-5 py-4.5">
      <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-4">
        <div className="min-w-50">
          <div className="flex items-center gap-2 text-lg font-semibold tracking-[-0.01em]">
            <MagnifyingGlassIcon className="text-accent h-4.5 w-4.5 shrink-0" />
            {intl.formatMessage({
              description: "RecipeLibraryFindPanel: heading - find a recipe",
              defaultMessage: "What are you looking for?",
              id: "qyOrax",
            })}
          </div>
          <p className="text-default-500 mt-1.25 text-xs">
            {intl.formatMessage({
              description: "RecipeLibraryFindPanel: body - how to find a recipe",
              defaultMessage: "Search by recipe name, or narrow it down by tag below.",
              id: "Au7aoJ",
            })}
          </p>
        </div>

        <div className="flex min-w-60 flex-1 flex-col gap-1.75 sm:max-w-90">
          <SearchField
            value={query}
            onChange={onQueryChange}
            className="bg-surface w-full"
            placeholder={intl.formatMessage({
              description: "RecipeLibraryFindPanel: placeholder - search recipes",
              defaultMessage: "e.g. lasagna, soup, pancakes",
              id: "AAO1tx",
            })}
            ariaLabel={intl.formatMessage({
              description: "RecipeLibraryFindPanel: aria-label - search recipes",
              defaultMessage: "Search recipes",
              id: "SVpXlA",
            })}
          />
          <div className="text-default-500 flex flex-wrap items-baseline gap-1.5 text-xs">
            <span>
              {intl.formatMessage({
                description: "RecipeLibraryFindPanel: label - looking for more recipes",
                defaultMessage: "Looking for more recipes?",
                id: "Ar+C9+",
              })}
            </span>
            <Button
              variant="ghost"
              size="sm"
              className="text-accent h-auto p-0"
              onPress={onBrowseCommunity}
              data-testid="recipe-library__browse-community"
            >
              {intl.formatMessage({
                description: "RecipeLibraryFindPanel: button - browse the community",
                defaultMessage: "Browse the community",
                id: "MXh8Tp",
              })}
            </Button>
          </div>
        </div>
      </div>

      <RecipeLibraryTagFilterRow {...tagFilter} />

      <div className="text-default-500 flex items-center gap-2 text-sm">
        <span className="text-foreground font-semibold tabular-nums">
          {intl.formatMessage(
            {
              description: "RecipeLibraryFindPanel: label - how many recipes are showing",
              defaultMessage: "{shown} of {total, plural, one {# recipe} other {# recipes}}",
              id: "6T71vw",
            },
            { shown: shownCount, total: totalCount }
          )}
        </span>
        <span>
          {tagFilter.hasTagFilter
            ? intl.formatMessage(
                {
                  description: "RecipeLibraryFindPanel: label - tag filters active",
                  defaultMessage: "· {count, plural, one {# tag filter} other {# tag filters}} active",
                  id: "sudj29",
                },
                { count: tagFilter.selectedTags.length }
              )
            : intl.formatMessage({
                description: "RecipeLibraryFindPanel: label - no tag filter active",
                defaultMessage: "· No tag filter active",
                id: "YR8Z0n",
              })}
        </span>
      </div>
    </section>
  );
}
