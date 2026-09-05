import type { ReactElement } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Button } from "@heroui/react";
import { useIntl } from "react-intl";
import { ToggleChip } from "~/components/input/toggle-chip/ToggleChip";
import type { RecipeScope } from "~/core/recipes/RecipeTypes";

export interface RecipeLibraryPageHeaderProps {
  scope: RecipeScope;
  onScopeChange: (scope: RecipeScope) => void;
  onAddRecipe: () => void;
}

export function RecipeLibraryPageHeader({
  scope,
  onScopeChange,
  onAddRecipe,
}: RecipeLibraryPageHeaderProps): ReactElement {
  const intl = useIntl();

  return (
    <div className="flex flex-wrap items-end justify-between gap-5">
      <div>
        <div className="text-default-500 mb-2 text-xs font-medium tracking-[0.09em] uppercase">
          {intl.formatMessage({
            description: "RecipeLibraryPageHeader: eyebrow - recipe library",
            defaultMessage: "Recipe library",
            id: "+cqj1Q",
          })}
        </div>
        <h1 className="mb-2 text-4xl leading-none tracking-tight md:text-5xl">
          {intl.formatMessage({
            description: "RecipeLibraryPageHeader: heading - title prefix",
            defaultMessage: "Recipe",
            id: "zJ1sl6",
          })}{" "}
          <span className="text-gradient-brand font-extrabold">
            {intl.formatMessage({
              description: "RecipeLibraryPageHeader: heading - title accent",
              defaultMessage: "pool",
              id: "vYFPb/",
            })}
          </span>
        </h1>
        <p className="text-default-500 max-w-[52ch] text-base">
          {scope === "mine"
            ? intl.formatMessage({
                description: "RecipeLibraryPageHeader: body - own recipes subtitle",
                defaultMessage: "Your own recipes. These are what the planner draws from.",
                id: "NiU4SE",
              })
            : intl.formatMessage({
                description: "RecipeLibraryPageHeader: body - community recipes subtitle",
                defaultMessage: "Every recipe shared in the community. Save the ones you want into your own pool.",
                id: "2fRQMt",
              })}
        </p>
        <div className="mt-4 flex gap-1.5">
          <ToggleChip
            label={intl.formatMessage({
              description: "RecipeLibraryPageHeader: scope - mine",
              defaultMessage: "Mine",
              id: "lpl1YV",
            })}
            isSelected={scope === "mine"}
            onChange={() => onScopeChange("mine")}
          />
          <ToggleChip
            label={intl.formatMessage({
              description: "RecipeLibraryPageHeader: scope - everyone",
              defaultMessage: "Everyone",
              id: "yEYGFQ",
            })}
            isSelected={scope === "everyone"}
            onChange={() => onScopeChange("everyone")}
          />
        </div>
      </div>

      <Button variant="primary" onPress={onAddRecipe} data-testid="recipe-library__add-recipe">
        <PlusIcon className="mr-1.5 h-4 w-4" />
        {intl.formatMessage({
          description: "RecipeLibraryPageHeader: button - add recipe",
          defaultMessage: "Add recipe",
          id: "lGtcPb",
        })}
      </Button>
    </div>
  );
}
