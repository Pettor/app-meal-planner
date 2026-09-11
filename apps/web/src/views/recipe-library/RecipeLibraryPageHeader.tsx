import type { ReactElement } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Button } from "@heroui/react";
import { useIntl } from "react-intl";

export interface RecipeLibraryPageHeaderProps {
  onAddRecipe: () => void;
}

export function RecipeLibraryPageHeader({ onAddRecipe }: RecipeLibraryPageHeaderProps): ReactElement {
  const intl = useIntl();

  return (
    <div className="flex flex-wrap items-end justify-between gap-x-7 gap-y-5">
      <div className="min-w-0">
        <div className="text-default-500 mb-1.5 text-xs font-medium tracking-[0.09em] uppercase">
          {intl.formatMessage({
            description: "RecipeLibraryPageHeader: eyebrow - recipe library",
            defaultMessage: "Recipe library",
            id: "+cqj1Q",
          })}
        </div>
        <h1 className="mb-1.5 text-4xl leading-[1.05] font-medium tracking-[-0.02em]">
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
        <p className="text-default-500 max-w-[60ch] text-sm">
          {intl.formatMessage({
            description: "RecipeLibraryPageHeader: body - subtitle",
            defaultMessage: "Your own recipes. These are what the planner draws from.",
            id: "Kx3M+D",
          })}
        </p>
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
