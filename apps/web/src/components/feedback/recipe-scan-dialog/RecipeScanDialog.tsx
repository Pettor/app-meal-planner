import type { ChangeEvent, ReactElement } from "react";
import { CameraIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { Button, Chip, Modal, Spinner } from "@heroui/react";
import { useIntl } from "react-intl";
import { TagChip } from "~/components/display/tag-chip/TagChip";
import { TextInputField } from "~/components/input/input-field/TextInputField";
import type { ScannedRecipe } from "~/core/recipes/RecipeTypes";
import { formatAmount } from "~/core/recipes/RecipeUtils";

/** Where the scan flow is: waiting for a photo, reading it, or showing the result. */
export type RecipeScanStage = "capture" | "working" | "preview";

export interface RecipeScanDialogProps {
  isOpen: boolean;
  stage: RecipeScanStage;
  /** How many scans the cook has left today — each read costs one. */
  scansRemaining: number;
  scannedRecipe: ScannedRecipe | null;
  /** Free-text correction sent with a re-read, e.g. "it's 400g mushrooms, not 40". */
  correction: string;
  onCorrectionChange: (correction: string) => void;
  onPhotoSelected: (file: File) => void;
  onRerun: () => void;
  onUseRecipe: () => void;
  onClose: () => void;
}

/**
 * Reads a recipe out of a photo of a cookbook page or handwritten card, and
 * shows what it found before anything is inserted into the form.
 */
export function RecipeScanDialog({
  isOpen,
  stage,
  scansRemaining,
  scannedRecipe,
  correction,
  onCorrectionChange,
  onPhotoSelected,
  onRerun,
  onUseRecipe,
  onClose,
}: RecipeScanDialogProps): ReactElement {
  const intl = useIntl();

  const title = intl.formatMessage({
    description: "RecipeScanDialog: heading - title",
    defaultMessage: "Scan a recipe",
    id: "UfBkks",
  });

  function handleFileChange(event: ChangeEvent<HTMLInputElement>): void {
    const file = event.target.files?.[0];
    if (file) onPhotoSelected(file);
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Modal.Backdrop variant="blur">
        <Modal.Container size="lg">
          <Modal.Dialog aria-label={title}>
            <Modal.Header>
              <div className="flex w-full items-center gap-2.5">
                <SparklesIcon className="text-accent h-5 w-5 shrink-0" />
                <Modal.Heading>{title}</Modal.Heading>
                <Chip size="sm" variant="soft" color="default" className="ml-auto tabular-nums">
                  {intl.formatMessage(
                    {
                      description: "RecipeScanDialog: chip - scan quota",
                      defaultMessage: "{count} of 3 left",
                      id: "/KFX20",
                    },
                    { count: scansRemaining }
                  )}
                </Chip>
              </div>
            </Modal.Header>

            {stage === "capture" && (
              <Modal.Body className="flex flex-col gap-4.5">
                <p className="text-default-500 text-sm text-pretty">
                  {intl.formatMessage({
                    description: "RecipeScanDialog: body - intro",
                    defaultMessage:
                      "Photograph a cookbook page, a printout, or a handwritten card. The text is read and turned into a recipe you can check before saving.",
                    id: "cmZL1N",
                  })}
                </p>

                <label className="border-border bg-surface-secondary text-default-500 flex h-50 cursor-pointer flex-col items-center justify-center gap-2.5 rounded-xl border border-dashed">
                  <CameraIcon className="text-accent h-7.5 w-7.5" />
                  <span className="text-accent text-sm font-medium">
                    {intl.formatMessage({
                      description: "RecipeScanDialog: label - take a photo",
                      defaultMessage: "Take or choose a photo",
                      id: "A1+Pu1",
                    })}
                  </span>
                  <span className="text-xs">
                    {intl.formatMessage({
                      description: "RecipeScanDialog: body - photo hint",
                      defaultMessage: "One page at a time, as flat and well lit as you can get it",
                      id: "fUk986",
                    })}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    className="hidden"
                    onChange={handleFileChange}
                    aria-label={intl.formatMessage({
                      description: "RecipeScanDialog: aria-label - choose a photo",
                      defaultMessage: "Choose a photo to scan",
                      id: "WApZzH",
                    })}
                  />
                </label>

                {scansRemaining === 0 && (
                  <div className="bg-warning/16 rounded-lg px-3.5 py-3 text-xs leading-relaxed">
                    {intl.formatMessage({
                      description: "RecipeScanDialog: body - no scans left",
                      defaultMessage: "You've used all 3 scans for today. They reset at midnight.",
                      id: "5D7oPh",
                    })}
                  </div>
                )}
              </Modal.Body>
            )}

            {stage === "working" && (
              <Modal.Body className="flex flex-col items-center gap-3.5 py-13">
                <Spinner />
                <span className="text-default-500 text-sm">
                  {intl.formatMessage({
                    description: "RecipeScanDialog: body - reading the photo",
                    defaultMessage: "Reading the photo…",
                    id: "Tw7Dfl",
                  })}
                </span>
              </Modal.Body>
            )}

            {stage === "preview" && scannedRecipe && (
              <>
                <Modal.Body className="flex flex-col gap-4.5">
                  <div className="flex flex-col gap-1.5">
                    <span className="text-default-500 text-xs">
                      {intl.formatMessage({
                        description: "RecipeScanDialog: label - read from photo",
                        defaultMessage: "Read from your photo",
                        id: "ksLKLG",
                      })}
                    </span>
                    <span className="text-xl leading-tight">{scannedRecipe.title}</span>
                    <span className="text-default-500 text-sm">
                      {intl.formatMessage(
                        {
                          description: "RecipeScanDialog: body - scanned recipe meta",
                          defaultMessage: "{minutes} minutes · serves {servings}",
                          id: "kjKYVp",
                        },
                        { minutes: scannedRecipe.timeMinutes, servings: scannedRecipe.servings }
                      )}
                    </span>
                    <div className="mt-0.5 flex flex-wrap gap-1.5">
                      {scannedRecipe.tags.map((tag) => (
                        <TagChip key={tag} tag={tag} />
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-[1fr_1.2fr]">
                    <div className="flex min-w-0 flex-col gap-2">
                      <span className="text-default-500 text-[11px] font-semibold tracking-wider uppercase">
                        {intl.formatMessage({
                          description: "RecipeScanDialog: heading - ingredients",
                          defaultMessage: "Ingredients",
                          id: "9tHMp1",
                        })}
                      </span>
                      {scannedRecipe.ingredients.map((ingredient) => (
                        <span key={ingredient.item} className="text-sm leading-relaxed">
                          {formatAmount(ingredient.quantity, ingredient.unit)} {ingredient.item}
                        </span>
                      ))}
                    </div>
                    <div className="flex min-w-0 flex-col gap-2">
                      <span className="text-default-500 text-[11px] font-semibold tracking-wider uppercase">
                        {intl.formatMessage({
                          description: "RecipeScanDialog: heading - method",
                          defaultMessage: "Method",
                          id: "9Kzw2T",
                        })}
                      </span>
                      {scannedRecipe.steps.map((step, index) => (
                        <span key={step} className="flex gap-2 text-sm leading-relaxed">
                          <span className="text-accent font-semibold">{index + 1}</span>
                          <span>{step}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <TextInputField
                      value={correction}
                      onChange={onCorrectionChange}
                      label={intl.formatMessage({
                        description: "RecipeScanDialog: label - correction",
                        defaultMessage: "Something off?",
                        id: "6cFNrk",
                      })}
                      placeholder={intl.formatMessage({
                        description: "RecipeScanDialog: placeholder - correction",
                        defaultMessage: "e.g. it's 400g mushrooms, not 40",
                        id: "9Up6OS",
                      })}
                      description={intl.formatMessage({
                        description: "RecipeScanDialog: body - correction cost",
                        defaultMessage: "A re-read costs one scan.",
                        id: "YD4gLf",
                      })}
                    />
                    <Button
                      variant="outline"
                      className="self-start"
                      isDisabled={correction.trim().length === 0 || scansRemaining === 0}
                      onPress={onRerun}
                    >
                      {intl.formatMessage({
                        description: "RecipeScanDialog: button - re-read",
                        defaultMessage: "Re-read",
                        id: "iEYJNS",
                      })}
                    </Button>
                  </div>
                </Modal.Body>

                <Modal.Footer className="justify-between">
                  <span className="text-default-500 text-xs">
                    {intl.formatMessage({
                      description: "RecipeScanDialog: footer - editable later",
                      defaultMessage: "You can still edit everything after inserting.",
                      id: "U4rYpd",
                    })}
                  </span>
                  <div className="flex gap-2">
                    <Button variant="ghost" onPress={onClose}>
                      {intl.formatMessage({
                        description: "RecipeScanDialog: button - cancel",
                        defaultMessage: "Cancel",
                        id: "/Xd7fi",
                      })}
                    </Button>
                    <Button variant="primary" onPress={onUseRecipe} data-testid="recipe-scan-dialog__use">
                      {intl.formatMessage({
                        description: "RecipeScanDialog: button - use this recipe",
                        defaultMessage: "Use this recipe",
                        id: "qH1HNj",
                      })}
                    </Button>
                  </div>
                </Modal.Footer>
              </>
            )}
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
