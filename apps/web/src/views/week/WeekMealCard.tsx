import type { ReactElement } from "react";
import clsx from "clsx";
import { useIntl } from "react-intl";
import { RecipePhoto } from "~/components/display/recipe-photo/RecipePhoto";
import { TagChip } from "~/components/display/tag-chip/TagChip";
import type { WeekMealViewModel } from "~/views/week/UseWeekOverview";

export interface WeekMealCardProps {
  meal: WeekMealViewModel;
  /** The first meal of a day needs no rule above it. */
  isFirst: boolean;
}

/**
 * One planned meal inside a day column — click it to open the recipe. Meals run
 * flush and hairline-separated down the day, so the photographs stack edge to
 * edge and the day reads as one column rather than a tray of small cards.
 */
export function WeekMealCard({ meal, isFirst }: WeekMealCardProps): ReactElement {
  const intl = useIntl();
  const isDinner = meal.mealType === "dinner";

  return (
    <div
      className={clsx(
        "hover:bg-surface-secondary relative flex cursor-pointer flex-col transition-colors duration-200",
        !isFirst && "border-separator border-t"
      )}
    >
      <div className="flex items-center justify-between gap-2 px-3.5 pt-3 pb-2.5">
        <span
          className={clsx(
            "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold tracking-[0.1em] uppercase",
            isDinner ? "bg-accent text-accent-foreground" : "bg-warning text-warning-foreground"
          )}
        >
          {meal.mealLabel}
        </span>
        <span className="text-default-500 text-xs">{meal.peopleLabel}</span>
      </div>

      <RecipePhoto photoUrl={meal.photoUrl} alt={meal.title} className="aspect-[4/3] w-full" iconClassName="h-6 w-6" />

      <div className="px-3.5 pt-3 text-lg leading-[1.25] font-bold tracking-[-0.01em] text-pretty">{meal.title}</div>
      <div className="flex flex-1 flex-wrap content-start gap-1.25 px-3.5 pt-2.5 pb-4">
        {meal.tags.map((tag) => (
          <TagChip key={tag} tag={tag} />
        ))}
      </div>

      {/*
       * The whole card opens the recipe. A stretched button keeps that reachable
       * by keyboard without nesting the photo and chips inside a button.
       */}
      <button
        type="button"
        className="absolute inset-0 cursor-pointer focus-visible:outline-2 focus-visible:-outline-offset-2"
        onClick={meal.onOpen}
      >
        <span className="sr-only">
          {intl.formatMessage(
            {
              description: "WeekMealCard: aria-label - open recipe",
              defaultMessage: "Open {title}",
              id: "iVc5xo",
            },
            { title: meal.title }
          )}
        </span>
      </button>
    </div>
  );
}
