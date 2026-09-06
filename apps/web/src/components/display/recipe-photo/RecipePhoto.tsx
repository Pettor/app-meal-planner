import type { ReactNode, ReactElement } from "react";
import { PhotoIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

export interface RecipePhotoProps {
  photoUrl: string | null;
  alt: string;
  /** Tailwind box for the photo band, e.g. `h-44` on cards, `h-10 w-13` for a row thumbnail. */
  className?: string;
  /** Height used when there is no photo — placeholders are usually shorter. */
  placeholderClassName?: string;
  /** Rendered under the icon when there is no photo, e.g. an "Add a photo" prompt. */
  placeholderContent?: ReactNode;
}

/**
 * The photo band on a recipe. Falls back to a dotted placeholder so a recipe
 * without a picture still reads as a card rather than a gap.
 */
export function RecipePhoto({
  photoUrl,
  alt,
  className,
  placeholderClassName,
  placeholderContent,
}: RecipePhotoProps): ReactElement {
  if (photoUrl) {
    return (
      <div className={clsx("overflow-hidden", className)}>
        <img src={photoUrl} alt={alt} className="h-full w-full object-cover" />
      </div>
    );
  }

  return (
    <div
      className={clsx(
        "bg-surface-secondary text-default-400 flex flex-col items-center justify-center gap-2 overflow-hidden",
        "[background-image:radial-gradient(color-mix(in_oklch,var(--muted)_30%,transparent)_1px,transparent_1px)] [background-size:12px_12px]",
        placeholderClassName ?? className
      )}
    >
      <PhotoIcon className="h-7 w-7 opacity-55" />
      {placeholderContent}
    </div>
  );
}
