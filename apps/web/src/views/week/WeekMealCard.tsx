import type { ReactElement } from "react";
import clsx from "clsx";
import { useIntl } from "react-intl";
import { RecipePhoto } from "~/components/display/recipe-photo/RecipePhoto";
import { TagChip } from "~/components/display/tag-chip/TagChip";
import type { WeekMealViewModel } from "~/views/week/UseWeekOverview";

export interface WeekMealCardProps {
  meal: WeekMealViewModel;
}

/** One planned meal inside a day column — click it to open the recipe. */
export function WeekMealCard({ meal }: WeekMealCardProps): ReactElement {
  const intl = useIntl();

  return (
    <div className="border-border bg-surface-secondary hover:border-accent/40 relative flex flex-1 flex-col overflow-hidden rounded-lg border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg">
      <div className="flex items-baseline justify-between gap-2 px-3 pt-2.5 pb-2">
        <span
          className={clsx(
            "flex items-center gap-1.5 text-[10px] font-bold tracking-[0.09em] uppercase",
            meal.isDinner ? "text-accent" : "text-warning"
          )}
        >
          <span className={clsx("h-1.5 w-1.5 rounded-full", meal.isDinner ? "bg-accent" : "bg-warning")} />
          {meal.mealLabel}
        </span>
        <span className="text-default-500 text-xs">{meal.peopleLabel}</span>
      </div>

      <RecipePhoto photoUrl={meal.photoUrl} alt={meal.title} className="h-22" placeholderClassName="h-22" />

      <div className="px-3 pt-2.5 text-base leading-snug font-semibold text-pretty">{meal.title}</div>
      <div className="flex flex-1 flex-wrap content-start gap-1 px-3 pt-2.5 pb-3">
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
