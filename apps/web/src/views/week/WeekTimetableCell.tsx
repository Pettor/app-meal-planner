import type { ReactElement } from "react";
import clsx from "clsx";
import { useIntl } from "react-intl";
import { RecipePhoto } from "~/components/display/recipe-photo/RecipePhoto";
import { TagChip } from "~/components/display/tag-chip/TagChip";
import type { PlanMeal } from "~/core/plan/PlanTypes";
import type { WeekTimetableSlotViewModel } from "~/views/week/UseWeekTimetable";

/**
 * Each row washes its cells in its own colour, so a meal is tellable from the
 * one above it without reading either label. The tints are faint on purpose —
 * the photographs are what the eye should land on.
 */
const CELL_TINT: Record<PlanMeal, string> = {
  lunch: "bg-warning/7",
  dinner: "bg-accent/6",
};

/** The dot under a meal repeats its row's colour, for the same reason. */
const DOT_COLOUR: Record<PlanMeal, string> = {
  lunch: "bg-warning",
  dinner: "bg-accent",
};

export interface WeekTimetableCellProps {
  slot: WeekTimetableSlotViewModel;
  /** Grid borders, which only the table knows how to draw. */
  className?: string;
}

/** One meal of one day in the timetable — click it to open the recipe. */
export function WeekTimetableCell({ slot, className }: WeekTimetableCellProps): ReactElement {
  const intl = useIntl();
  const { meal } = slot;

  return (
    <div
      className={clsx(
        "relative flex min-w-0 flex-col",
        CELL_TINT[slot.mealType],
        meal && "hover:bg-surface-tertiary/55 cursor-pointer transition-colors duration-200",
        // Today's column is washed once more, so it reads as a single stripe
        // straight down the week rather than as a run of highlighted cells.
        slot.isToday && "before:bg-accent/4 before:pointer-events-none before:absolute before:inset-0",
        className
      )}
    >
      {meal ? (
        <div className="relative flex h-full flex-col gap-2 p-2.5 pb-3">
          <RecipePhoto
            photoUrl={meal.photoUrl}
            alt={meal.title}
            className="h-[3.625rem] w-full rounded-md min-[1180px]:h-[4.75rem]"
            iconClassName="h-5 w-5"
          />
          <span className="text-sm leading-[1.3] font-semibold tracking-[-0.005em] text-pretty [overflow-wrap:anywhere]">
            {meal.title}
          </span>
          <span className="mt-auto flex flex-wrap gap-1">
            {meal.tags.map((tag) => (
              <TagChip key={tag} tag={tag} size="sm" />
            ))}
          </span>
          <span className="text-default-500 flex items-center gap-1.25 text-[10px]">
            <span className={clsx("size-[5px] flex-none rounded-full", DOT_COLOUR[slot.mealType])} />
            {meal.peopleLabel}
          </span>
        </div>
      ) : (
        <div className="text-default-500 relative flex min-h-27.5 items-center justify-center p-3.5 text-center text-xs">
          {slot.blankLabel}
        </div>
      )}

      {/*
       * The whole cell opens the recipe. A stretched button keeps that reachable
       * by keyboard without nesting the photo and chips inside a button.
       */}
      {meal && (
        <button
          type="button"
          className="absolute inset-0 cursor-pointer focus-visible:outline-2 focus-visible:-outline-offset-2"
          onClick={meal.onOpen}
        >
          <span className="sr-only">
            {intl.formatMessage(
              {
                description: "WeekTimetableCell: aria-label - open recipe",
                defaultMessage: "Open {title}",
                id: "aVp3eg",
              },
              { title: meal.title }
            )}
          </span>
        </button>
      )}
    </div>
  );
}
