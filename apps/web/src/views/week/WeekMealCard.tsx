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
    <div className="border-separator hover:bg-surface-secondary relative flex flex-1 cursor-pointer flex-col border-t transition-colors duration-200">
      <div className="flex items-baseline justify-between gap-2 px-3.5 pt-2.75 pb-2.25">
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

      <RecipePhoto photoUrl={meal.photoUrl} alt={meal.title} className="h-26" placeholderClassName="h-26" />

      <div className="px-3.5 pt-3 text-lg leading-tight font-semibold text-pretty">{meal.title}</div>
      <div className="flex flex-1 flex-wrap content-start gap-1.25 px-3.5 pt-2.5 pb-3.5">
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
