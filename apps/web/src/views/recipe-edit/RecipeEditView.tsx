import { useState } from "react";
import type { ReactElement } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import { Button, Modal, Separator } from "@heroui/react";
import { useIntl } from "react-intl";
import { RecipeScanDialog } from "~/components/feedback/recipe-scan-dialog/RecipeScanDialog";
import { TagBrowserDialog } from "~/components/feedback/tag-browser-dialog/TagBrowserDialog";
import type { RecipeTagCategory, ScannedRecipe } from "~/core/recipes/RecipeTypes";
import type { RecipeDraft } from "~/views/recipe-edit/RecipeDraft";
import { scannedRecipeToDraft } from "~/views/recipe-edit/RecipeDraft";
import { RecipeEditDetailsPanel } from "~/views/recipe-edit/RecipeEditDetailsPanel";
import { RecipeEditIngredientsPanel } from "~/views/recipe-edit/RecipeEditIngredientsPanel";
import { RecipeEditPhotoField } from "~/views/recipe-edit/RecipeEditPhotoField";
import { RecipeEditScanBanner } from "~/views/recipe-edit/RecipeEditScanBanner";
import { RecipeEditStepsPanel } from "~/views/recipe-edit/RecipeEditStepsPanel";
import { RecipeEditTagsPanel } from "~/views/recipe-edit/RecipeEditTagsPanel";
import { UseRecipeEditForm } from "~/views/recipe-edit/UseRecipeEditForm";
import { UseRecipeScan } from "~/views/recipe-edit/UseRecipeScan";

export interface RecipeEditViewProps {
  isOpen: boolean;
  /** The starting draft — blank for a new recipe, filled in when editing one. */
  initialDraft: RecipeDraft;
  isExistingRecipe: boolean;
  /** Tags offered as chips before the cook opens the full catalogue. */
  suggestedTags: string[];
  tagCatalogue: RecipeTagCategory[];
  /** Stands in for the scanning service until there is one. */
  sampleScanResult: ScannedRecipe;
  onSave: (draft: RecipeDraft) => void;
  onCancel: () => void;
  onDelete: () => void;
}

/** Writing or editing a recipe, including the AI photo scan shortcut. Presented as a modal over the page behind it. */
export function RecipeEditView({
  isOpen,
  initialDraft,
  isExistingRecipe,
  suggestedTags,
  tagCatalogue,
  sampleScanResult,
  onSave,
  onCancel,
  onDelete,
}: RecipeEditViewProps): ReactElement {
  const intl = useIntl();
  const form = UseRecipeEditForm(initialDraft);
  const scan = UseRecipeScan(sampleScanResult);
  const [isTagBrowserOpen, setIsTagBrowserOpen] = useState(false);

  // The chips show the recipe's own tags first, then the suggestions it doesn't have.
  const offeredTags = [...form.draft.tags, ...suggestedTags.filter((tag) => !form.draft.tags.includes(tag))];

  const heading = isExistingRecipe
    ? intl.formatMessage({
        description: "RecipeEditView: heading - edit recipe",
        defaultMessage: "Edit recipe",
        id: "E72JXP",
      })
    : intl.formatMessage({
        description: "RecipeEditView: heading - new recipe",
        defaultMessage: "New recipe",
        id: "aV5f1p",
      });

  function handleSave(): void {
    const validated = form.validate();
    if (validated) onSave(validated);
  }

  function handleUseScannedRecipe(): void {
    if (scan.scannedRecipe) form.setDraft(scannedRecipeToDraft(scan.scannedRecipe));
    scan.close();
  }

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={(open) => !open && onCancel()}>
        <Modal.Backdrop variant="blur">
          <Modal.Container size="lg">
            <Modal.Dialog aria-label={heading} className="max-w-[53.75rem] gap-0 overflow-hidden p-0">
              <Modal.Header className="border-separator flex-row items-center justify-between gap-3 border-b px-6 py-4">
                <Modal.Heading className="text-xl font-normal">{heading}</Modal.Heading>
                <div className="flex gap-2">
                  <Button variant="ghost" onPress={onCancel} data-testid="recipe-edit__cancel">
                    {intl.formatMessage({
                      description: "RecipeEditView: button - cancel",
                      defaultMessage: "Cancel",
                      id: "nzoJuD",
                    })}
                  </Button>
                  <Button variant="primary" onPress={handleSave} data-testid="recipe-edit__save">
                    {intl.formatMessage({
                      description: "RecipeEditView: button - save recipe",
                      defaultMessage: "Save recipe",
                      id: "6v8Bhx",
                    })}
                  </Button>
                </div>
              </Modal.Header>

              <Modal.Body className="mt-0 flex flex-col gap-0 p-0">
                <RecipeEditScanBanner scansRemaining={scan.scansRemaining} onOpenScan={scan.open} />

                <RecipeEditPhotoField
                  photoUrl={form.draft.photoUrl}
                  title={form.draft.title}
                  onPhotoSelected={(file) => form.setField("photoUrl", URL.createObjectURL(file))}
                />

                <div className="flex flex-col gap-6 px-6 pt-7 pb-9 md:px-8">
                  <RecipeEditDetailsPanel
                    title={form.draft.title}
                    servings={form.draft.servings}
                    timeMinutes={form.draft.timeMinutes}
                    onTitleChange={(title) => form.setField("title", title)}
                    onServingsChange={(servings) => form.setField("servings", servings)}
                    onTimeChange={(timeMinutes) => form.setField("timeMinutes", timeMinutes)}
                  />

                  <RecipeEditTagsPanel
                    offeredTags={offeredTags}
                    selectedTags={form.draft.tags}
                    hasTagError={form.hasTagError}
                    onToggleTag={form.toggleTag}
                    onAddTag={form.addTag}
                    onBrowseAllTags={() => setIsTagBrowserOpen(true)}
                  />

                  <Separator />

                  <RecipeEditIngredientsPanel
                    ingredients={form.draft.ingredients}
                    onUpdate={form.updateIngredient}
                    onAdd={form.addIngredient}
                    onRemove={form.removeIngredient}
                  />

                  <RecipeEditStepsPanel
                    steps={form.draft.steps}
                    onUpdate={form.updateStep}
                    onAdd={form.addStep}
                    onRemove={form.removeStep}
                  />

                  {isExistingRecipe && (
                    <div className="flex justify-end">
                      <Button variant="danger-soft" onPress={onDelete} data-testid="recipe-edit__delete">
                        <TrashIcon className="mr-1.5 h-4 w-4" />
                        {intl.formatMessage({
                          description: "RecipeEditView: button - delete recipe",
                          defaultMessage: "Delete recipe",
                          id: "GV0nrT",
                        })}
                      </Button>
                    </div>
                  )}
                </div>
              </Modal.Body>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>

      <TagBrowserDialog
        isOpen={isTagBrowserOpen}
        description={intl.formatMessage({
          description: "RecipeEditView: body - tag browser description",
          defaultMessage: "Pick the tags that describe this recipe.",
          id: "xwjsAy",
        })}
        catalogue={tagCatalogue}
        selectedTags={form.draft.tags}
        onToggleTag={form.toggleTag}
        onClose={() => setIsTagBrowserOpen(false)}
      />

      <RecipeScanDialog
        isOpen={scan.isOpen}
        stage={scan.stage}
        scansRemaining={scan.scansRemaining}
        scannedRecipe={scan.scannedRecipe}
        correction={scan.correction}
        onCorrectionChange={scan.setCorrection}
        onPhotoSelected={scan.scanPhoto}
        onRerun={scan.rerun}
        onUseRecipe={handleUseScannedRecipe}
        onClose={scan.close}
      />
    </>
  );
}
