import type { ChangeEvent, ReactElement } from "react";
import { useIntl } from "react-intl";
import { RecipePhoto } from "~/components/display/recipe-photo/RecipePhoto";

export interface RecipeEditPhotoFieldProps {
  photoUrl: string | null;
  title: string;
  onPhotoSelected: (file: File) => void;
}

/** The recipe photo, swapped by picking a file anywhere on the band. */
export function RecipeEditPhotoField({ photoUrl, title, onPhotoSelected }: RecipeEditPhotoFieldProps): ReactElement {
  const intl = useIntl();

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    const file = event.target.files?.[0];
    if (file) onPhotoSelected(file);
  }

  return (
    <label className="block cursor-pointer">
      <RecipePhoto
        photoUrl={photoUrl}
        alt={title}
        className="h-65"
        placeholderClassName="border-border h-45 border-b"
        placeholderContent={
          <>
            <span className="text-accent text-sm font-medium">
              {intl.formatMessage({
                description: "RecipeEditPhotoField: label - add a photo",
                defaultMessage: "Add a photo",
                id: "15aR48",
              })}
            </span>
            <span className="text-xs">
              {intl.formatMessage({
                description: "RecipeEditPhotoField: body - photo hint",
                defaultMessage: "Optional, sits on top of the recipe",
                id: "56W5uG",
              })}
            </span>
          </>
        }
      />
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
        aria-label={intl.formatMessage({
          description: "RecipeEditPhotoField: aria-label - choose a photo",
          defaultMessage: "Choose a recipe photo",
          id: "lARzdN",
        })}
      />
    </label>
  );
}
