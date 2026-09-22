/**
 * Options shared by every `atomWithStorage` atom in the app.
 *
 * `getOnInit` reads the persisted value when the atom is created rather than on mount.
 * Jotai v3 dropped the extra re-render that used to follow mounting, so an atom relying
 * on the `onMount` read shows its initial value and never picks up the stored one —
 * persisted state was lost on every reload. The app is client-only, so reading
 * `localStorage` at creation time is safe.
 */
export const StorageOptions = { getOnInit: true } as const;
