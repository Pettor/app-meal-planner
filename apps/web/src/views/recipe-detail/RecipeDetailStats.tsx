import type { ReactElement } from "react";
import { ClockIcon, ListBulletIcon } from "@heroicons/react/24/outline";
import { useIntl } from "react-intl";

export interface RecipeDetailStatsProps {
  timeMinutes: number;
  ingredientCount: number;
}

/** The two numbers a cook checks before committing to a recipe: how long, how much shopping. */
export function RecipeDetailStats({ timeMinutes, ingredientCount }: RecipeDetailStatsProps): ReactElement {
  const intl = useIntl();

  return (
    <div className="bg-accent/8 flex flex-wrap gap-0.5 rounded-lg px-1 py-3.75">
      <span className="text-accent flex min-w-23 flex-1 flex-col items-center gap-1.75">
        <ClockIcon className="h-5 w-5" strokeWidth={1.6} />
        <span className="text-sm font-semibold">
          {intl.formatMessage(
            {
              description: "RecipeDetailStats: label - cooking time",
              defaultMessage: "{minutes} minutes",
              id: "bR5/Qd",
            },
            { minutes: timeMinutes }
          )}
        </span>
      </span>
      <span className="text-accent flex min-w-23 flex-1 flex-col items-center gap-1.75">
        <ListBulletIcon className="h-5 w-5" strokeWidth={1.6} />
        <span className="text-sm font-semibold">
          {intl.formatMessage(
            {
              description: "RecipeDetailStats: label - ingredient count",
              defaultMessage: "{count} ingredients",
              id: "NnC3fA",
            },
            { count: ingredientCount }
          )}
        </span>
      </span>
    </div>
  );
}
