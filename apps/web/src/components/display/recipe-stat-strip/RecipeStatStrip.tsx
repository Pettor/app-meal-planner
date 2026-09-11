import type { ReactElement } from "react";
import { ClockIcon, ListBulletIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useIntl } from "react-intl";

export type RecipeStatStripLayout = "stacked" | "inline";

export interface RecipeStatStripProps {
  timeMinutes: number;
  ingredientCount: number;
  /** `stacked` is the roomy hero treatment; `inline` is the compact one for cards. */
  layout?: RecipeStatStripLayout;
}

/**
 * The two numbers a cook checks before committing to a recipe: how long it
 * takes, and how much shopping it implies.
 */
export function RecipeStatStrip({
  timeMinutes,
  ingredientCount,
  layout = "stacked",
}: RecipeStatStripProps): ReactElement {
  const intl = useIntl();

  const isStacked = layout === "stacked";
  const stripClasses = clsx("bg-accent/8 flex gap-0.5 rounded-lg px-1", isStacked ? "flex-wrap py-3.75" : "py-2.25");
  const statClasses = clsx(
    "text-accent flex flex-1 items-center justify-center",
    isStacked ? "min-w-23 flex-col gap-1.75" : "min-w-0 gap-1.5"
  );
  const iconClasses = isStacked ? "h-5 w-5 shrink-0" : "h-3.75 w-3.75 shrink-0";
  const labelClasses = isStacked ? "text-sm font-semibold" : "text-xs font-semibold whitespace-nowrap";

  return (
    <div className={stripClasses}>
      <span className={statClasses}>
        <ClockIcon className={iconClasses} strokeWidth={1.6} />
        <span className={labelClasses}>
          {intl.formatMessage(
            {
              description: "RecipeStatStrip: label - cooking time",
              defaultMessage: "{minutes} minutes",
              id: "ESAh3g",
            },
            { minutes: timeMinutes }
          )}
        </span>
      </span>
      <span className={statClasses}>
        <ListBulletIcon className={iconClasses} strokeWidth={1.6} />
        <span className={labelClasses}>
          {intl.formatMessage(
            {
              description: "RecipeStatStrip: label - ingredient count",
              defaultMessage: "{count} ingredients",
              id: "1slQ/g",
            },
            { count: ingredientCount }
          )}
        </span>
      </span>
    </div>
  );
}
