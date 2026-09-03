import type { ReactElement } from "react";

/**
 * Warm ambient wash used behind full-page layouts. The gradient stops are
 * derived from the theme's danger / accent / warning tokens, so it re-tints
 * automatically with the active theme.
 */
export function AmbientBackground(): ReactElement {
  return <div className="bg-ambient-wash pointer-events-none absolute inset-0 z-[-2] h-full w-full dark:opacity-55" />;
}
