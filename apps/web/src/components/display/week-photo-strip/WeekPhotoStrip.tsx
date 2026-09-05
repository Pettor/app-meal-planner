import type { ReactElement } from "react";
import { PhotoIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { CommunityBadge } from "~/components/display/community-badge/CommunityBadge";

export interface WeekPhotoStripProps {
  /** Four cells' worth of photos — `null` where the week has none. */
  photos: (string | null)[];
  /** Names the week the strip belongs to, for the photos' alt text. */
  weekTitle: string;
  className?: string;
}

/**
 * The four-up photo band across the top of a shared week, with the "Week"
 * badge pinned into its corner. Days without a photo keep their cell so the
 * band stays the same shape whatever the week is made of.
 */
export function WeekPhotoStrip({ photos, weekTitle, className }: WeekPhotoStripProps): ReactElement {
  return (
    <div className={clsx("relative grid h-35 grid-cols-4 gap-0.5", className)}>
      {photos.map((photo, index) => (
        <span
          key={index}
          className="bg-surface-secondary text-default-400 relative flex items-center justify-center overflow-hidden"
        >
          {photo ? (
            <img src={photo} alt={weekTitle} className="absolute inset-0 h-full w-full object-cover" />
          ) : (
            <PhotoIcon className="h-5 w-5 opacity-45" />
          )}
        </span>
      ))}

      <CommunityBadge kind="week" className="absolute top-2.5 left-2.5" />
    </div>
  );
}
