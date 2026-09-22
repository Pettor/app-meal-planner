import { z } from "zod";
import type { PlanDayId, PlanMeal, PlanQuotaMode, PlanStatus, SavedPlan } from "~/core/plan/PlanTypes";

/**
 * The cook's own data, as one portable JSON blob.
 *
 * Everything the app persists locally — which recipes are theirs, their default
 * tags and every week they have saved — lives here, so the Data section can hand
 * it over for backup and take it back unchanged. Bump `SettingsSnapshotVersion`
 * whenever the shape stops being readable by an older build.
 */
export const SettingsSnapshotVersion = 1;

const planDayIdSchema: z.ZodType<PlanDayId> = z.enum([
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
]);
const planMealSchema: z.ZodType<PlanMeal> = z.enum(["lunch", "dinner"]);
const planQuotaModeSchema: z.ZodType<PlanQuotaMode> = z.enum(["atleast", "exactly", "atmost"]);
const planStatusSchema: z.ZodType<PlanStatus> = z.enum(["draft", "final"]);

const savedPlanSchema = z.object({
  status: planStatusSchema,
  draft: z.object({
    days: z.array(
      z.object({
        day: planDayIdSchema,
        lunch: z.boolean(),
        dinner: z.boolean(),
        people: z.number().int().nonnegative(),
      })
    ),
    quotas: z.array(
      z.object({
        tag: z.string(),
        mode: planQuotaModeSchema,
        n: z.number().int().nonnegative(),
      })
    ),
    slots: z.array(
      z.object({
        day: planDayIdSchema,
        meal: planMealSchema,
        people: z.number().int().nonnegative(),
        recipeId: z.string().nullable(),
      })
    ),
  }),
  savedAt: z.string(),
}) satisfies z.ZodType<SavedPlan>;

export const settingsSnapshotSchema = z.object({
  version: z.number().int().positive(),
  savedRecipeIds: z.array(z.string()),
  pinnedTags: z.array(z.string()),
  plans: z.record(z.string(), savedPlanSchema),
  selectedWeekKey: z.string(),
});

export type SettingsSnapshot = z.infer<typeof settingsSnapshotSchema>;

/** The blob as the cook sees it in the editor — indented, so it can be edited by hand. */
export function formatSettingsSnapshot(snapshot: SettingsSnapshot): string {
  return JSON.stringify(snapshot, null, 2);
}

/** Parses edited JSON back into a snapshot, or `null` when it is not one. */
export function parseSettingsSnapshot(text: string): SettingsSnapshot | null {
  let value: unknown;
  try {
    value = JSON.parse(text);
  } catch {
    return null;
  }

  const result = settingsSnapshotSchema.safeParse(value);
  return result.success ? result.data : null;
}
