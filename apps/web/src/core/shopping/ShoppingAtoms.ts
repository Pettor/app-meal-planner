import { atomWithStorage } from "jotai/utils";

/**
 * Which lines have been ticked off, keyed by `item|unit`.
 *
 * Persisted locally so the list survives a reload mid-shop. Keying on the
 * ingredient rather than on the week means a re-plan keeps the ticks that still
 * apply, which is what the design does.
 */
export const checkedShoppingLinesAtom = atomWithStorage<Record<string, boolean>>("shopping-checked", {});
