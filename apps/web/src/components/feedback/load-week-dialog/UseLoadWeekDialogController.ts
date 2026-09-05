import { toast } from "@heroui/react";
import { useNavigate } from "@tanstack/react-router";
import { useAtom } from "jotai";
import { useIntl } from "react-intl";
import type { LoadWeekDialogProps } from "./LoadWeekDialog";
import { loadWeekTargetAtom } from "~/core/community/CommunityAtoms";
import type { CommunityPerson } from "~/core/community/CommunityTypes";
import { sharedWeekDays, sharedWeekRecipes } from "~/core/community/CommunityUtils";
import { useCommunity } from "~/core/community/UseCommunity";
import { useDayShortNames } from "~/core/plan/PlanDayLabels";
import { isoWeekNumber, parseWeekKey } from "~/core/plan/PlanUtils";
import { usePlans } from "~/core/plan/UsePlans";
import { useRecipes } from "~/core/recipes/UseRecipes";

/** Stands in for an owner that has gone missing, so the dialog can still close. */
const unknownOwner: CommunityPerson = {
  id: "unknown",
  name: "?",
  handle: "",
  avatarUrl: null,
  color: "var(--muted)",
  bio: "",
  followsMe: false,
};

/**
 * Builds the load-week dialog's props. Confirming copies the shared week into
 * the planner as a draft for the week the app is currently on, and saves the
 * recipes it needs into the cook's pool — the planner only draws from what
 * they own, so a week loaded without them would arrive half empty.
 */
export function useLoadWeekDialogController(): LoadWeekDialogProps {
  const intl = useIntl();
  const navigate = useNavigate();
  const dayNames = useDayShortNames();
  const { weekById, personById, loadSharedWeek } = useCommunity();
  const { recipes, saveRecipes } = useRecipes();
  const { selectedWeekKey } = usePlans();
  const [weekId, setWeekId] = useAtom(loadWeekTargetAtom);

  const week = weekId ? weekById(weekId) : null;
  const owner = week ? personById(week.ownerId) : null;

  /** The week's recipes the cook doesn't own yet — these come along with it. */
  const missingRecipeIds = week
    ? sharedWeekRecipes(week, recipes)
        .filter((recipe): recipe is NonNullable<typeof recipe> => recipe !== null && !recipe.isSaved)
        .map((recipe) => recipe.id)
    : [];

  function confirm(): void {
    if (!week) return;
    saveRecipes(missingRecipeIds);
    loadSharedWeek(week, recipes);
    setWeekId(null);
    toast(
      intl.formatMessage({
        description: "UseLoadWeekDialogController: toast - week loaded into the planner",
        defaultMessage: "Loaded. Refine it and save.",
        id: "ofu1c3",
      })
    );
    void navigate({ to: "/plan" });
  }

  return {
    isOpen: week !== null,
    weekTitle: week?.title ?? "",
    owner: owner ?? unknownOwner,
    days: week ? sharedWeekDays(week, recipes, dayNames) : [],
    targetWeekNumber: String(isoWeekNumber(parseWeekKey(selectedWeekKey))),
    missingRecipeCount: missingRecipeIds.length,
    onConfirm: confirm,
    onClose: () => setWeekId(null),
  };
}
