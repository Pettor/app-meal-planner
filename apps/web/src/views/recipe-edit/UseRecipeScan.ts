import { useState } from "react";
import type { RecipeScanStage } from "~/components/feedback/recipe-scan-dialog/RecipeScanDialog";
import type { ScannedRecipe } from "~/core/recipes/RecipeTypes";

const DAILY_SCAN_ALLOWANCE = 3;

/** How long the fake read takes, in milliseconds. Replace with the real call. */
const SCAN_DURATION_MS = 1200;

export interface UseRecipeScanResult {
  isOpen: boolean;
  stage: RecipeScanStage;
  scansRemaining: number;
  scannedRecipe: ScannedRecipe | null;
  correction: string;
  setCorrection: (correction: string) => void;
  open: () => void;
  close: () => void;
  scanPhoto: () => void;
  rerun: () => void;
}

/**
 * Drives the photo-scan dialog.
 *
 * There is no scanning service yet, so a read is simulated and always returns
 * `sampleResult`. The state machine is the real one, so wiring it up later means
 * replacing the two timers with the service call.
 */
export function UseRecipeScan(sampleResult: ScannedRecipe): UseRecipeScanResult {
  const [isOpen, setIsOpen] = useState(false);
  const [stage, setStage] = useState<RecipeScanStage>("capture");
  const [scansRemaining, setScansRemaining] = useState(DAILY_SCAN_ALLOWANCE);
  const [scannedRecipe, setScannedRecipe] = useState<ScannedRecipe | null>(null);
  const [correction, setCorrection] = useState("");

  function runScan(): void {
    if (scansRemaining === 0) return;
    setScansRemaining((current) => current - 1);
    setStage("working");
    window.setTimeout(() => {
      setScannedRecipe(sampleResult);
      setStage("preview");
    }, SCAN_DURATION_MS);
  }

  function close(): void {
    setIsOpen(false);
    setStage("capture");
    setScannedRecipe(null);
    setCorrection("");
  }

  return {
    isOpen,
    stage,
    scansRemaining,
    scannedRecipe,
    correction,
    setCorrection,
    open: () => setIsOpen(true),
    close,
    scanPhoto: runScan,
    rerun: runScan,
  };
}
