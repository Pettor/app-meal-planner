import type { ReactElement } from "react";
import { useIntl } from "react-intl";
import { TagBrowserDialog } from "~/components/feedback/tag-browser-dialog/TagBrowserDialog";
import { WeekPickerDialog } from "~/components/feedback/week-picker-dialog/WeekPickerDialog";
import type { PlanDraft, PlanStatus, SavedPlan } from "~/core/plan/PlanTypes";
import type { Recipe, RecipeTagCategory } from "~/core/recipes/RecipeTypes";
import { PlanDaysStepPanel } from "~/views/plan/PlanDaysStepPanel";
import { PlanGenerateStepPanel } from "~/views/plan/PlanGenerateStepPanel";
import { PlanQuotasStepPanel } from "~/views/plan/PlanQuotasStepPanel";
import { PlanRecipeSwapDialog } from "~/views/plan/PlanRecipeSwapDialog";
import { PlanResultsStepPanel } from "~/views/plan/PlanResultsStepPanel";
import { PlanWizardHeader } from "~/views/plan/PlanWizardHeader";
import { UsePlanWizard } from "~/views/plan/UsePlanWizard";

export interface PlanViewProps {
  /** The cook's own recipe pool — what the planner draws from. */
  recipes: Recipe[];
  tagCatalogue: RecipeTagCategory[];
  /** Tags offered first when setting quotas for a week. */
  pinnedTags: string[];
  /** Weeks already saved, so reopening one edits it instead of starting over. */
  plans: Record<string, SavedPlan>;
  /** The week the wizard opens on — the one the rest of the app is looking at. */
  initialWeekKey: string;
  /** A shared week loaded from the community, opened straight on the review step. */
  initialDraft?: PlanDraft | null;
  onWeekSaved: (weekKey: string, status: PlanStatus, draft: PlanDraft) => void;
}

/** The "Plan a week" wizard: days and people, quotas, generate, then refine and save. */
export function PlanView({
  recipes,
  tagCatalogue,
  pinnedTags,
  plans,
  initialWeekKey,
  initialDraft,
  onWeekSaved,
}: PlanViewProps): ReactElement {
  const intl = useIntl();
  const wizard = UsePlanWizard({
    recipes,
    tagCatalogue,
    pinnedTags,
    plans,
    initialWeekKey,
    initialDraft,
    onWeekSaved,
  });

  return (
    <div className="mx-auto w-full max-w-[77.5rem] px-6 py-9">
      <PlanWizardHeader
        stepEyebrow={wizard.stepEyebrow}
        stepSubtitle={wizard.stepSubtitle}
        stepTabs={wizard.stepTabs}
        canGoBack={wizard.canGoBack}
        onBack={wizard.onBack}
        nextLabel={wizard.nextLabel}
        onNext={wizard.onNext}
        showSaveDraft={wizard.showSaveDraft}
        onSaveDraft={wizard.onSaveDraft}
      />

      {wizard.step === 1 && (
        <PlanDaysStepPanel
          weekLine={wizard.weekLine}
          hasExistingPlanForWeek={wizard.hasExistingPlanForWeek}
          onOpenWeekPicker={wizard.onOpenWeekPicker}
          dayRows={wizard.dayRows}
          mealSummary={wizard.mealSummary}
          onApplyFirstDayToAll={wizard.onApplyFirstDayToAll}
        />
      )}

      {wizard.step === 2 && (
        <PlanQuotasStepPanel
          quotaRows={wizard.quotaRows}
          hasNoQuotas={wizard.hasNoQuotas}
          quotaQuery={wizard.quotaQuery}
          onQuotaQueryChange={wizard.onQuotaQueryChange}
          isSearchingQuotaTags={wizard.isSearchingQuotaTags}
          quotaSearchResults={wizard.quotaSearchResults}
          hasNoQuotaSearchResults={wizard.hasNoQuotaSearchResults}
          createQuotaTagLabel={wizard.createQuotaTagLabel}
          onCreateQuotaTag={wizard.onCreateQuotaTag}
          yourTagChips={wizard.yourTagChips}
          popularTagChips={wizard.popularTagChips}
          onOpenEditDefaultTags={wizard.onOpenEditDefaultTags}
          onOpenBrowseQuotaTags={wizard.onOpenBrowseQuotaTags}
        />
      )}

      {wizard.step === 3 && (
        <PlanGenerateStepPanel
          mealsToFillCount={wizard.mealsToFillCount}
          generateSummary={wizard.generateSummary}
          onGenerate={wizard.onGenerate}
          onStartEmpty={wizard.onStartEmpty}
        />
      )}

      {wizard.step === 4 && (
        <PlanResultsStepPanel
          layout={wizard.layout}
          onLayoutChange={wizard.onLayoutChange}
          quotaStatus={wizard.quotaStatus}
          onRerollAll={wizard.onRerollAll}
          slotRows={wizard.slotRows}
          gridDays={wizard.gridDays}
        />
      )}

      <WeekPickerDialog {...wizard.weekPicker} />

      <PlanRecipeSwapDialog
        isOpen={wizard.isSwapOpen}
        title={wizard.swapTitle}
        resultsLabel={wizard.swapResultsLabel}
        hasNoResults={wizard.hasNoSwapResults}
        query={wizard.pickerQuery}
        onQueryChange={wizard.onPickerQueryChange}
        tagChips={wizard.pickerTagChips}
        options={wizard.swapOptions}
        onClose={wizard.onCloseSwap}
      />

      <TagBrowserDialog
        isOpen={wizard.isEditDefaultTagsOpen}
        description={intl.formatMessage({
          description: "PlanView: body - edit default tags dialog description",
          defaultMessage: "Pick the tags offered first every time you plan a week.",
          id: "GuxalG",
        })}
        catalogue={tagCatalogue}
        selectedTags={wizard.pinnedTags}
        onToggleTag={wizard.onTogglePinnedTag}
        onClose={wizard.onCloseEditDefaultTags}
      />

      <TagBrowserDialog
        isOpen={wizard.isBrowseQuotaTagsOpen}
        description={intl.formatMessage({
          description: "PlanView: body - browse quota tags dialog description",
          defaultMessage: "Pick the tags this week should be built around.",
          id: "ztO1kU",
        })}
        catalogue={tagCatalogue}
        selectedTags={wizard.quotaTagsInDraft}
        onToggleTag={wizard.onToggleQuotaTag}
        onClose={wizard.onCloseBrowseQuotaTags}
      />
    </div>
  );
}
