import type { ReactNode, ReactElement } from "react";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { Button, Card } from "@heroui/react";
import clsx from "clsx";
import { useIntl } from "react-intl";
import { CommunityBadge } from "~/components/display/community-badge/CommunityBadge";
import { TagChip } from "~/components/display/tag-chip/TagChip";
import type { Recipe } from "~/core/recipes/RecipeTypes";

export interface CommunityRecipeCardProps {
  recipe: Recipe;
  /** The "who added it" row. Omitted on a profile, where the owner is obvious. */
  header?: ReactNode;
  /** Feed cards give a photo room to breathe; grid cards keep it shorter. */
  photoHeight?: "tall" | "short";
  onRecommend: () => void;
  onOpen: () => void;
  className?: string;
}

/**
 * A recipe someone else published. Unlike `RecipeCard` — which is about
 * managing your own pool — this is about deciding whether to cook someone
 * else's, so it leads with the photo and ends with recommend and open.
 */
export function CommunityRecipeCard({
  recipe,
  header,
  photoHeight = "tall",
  onRecommend,
  onOpen,
  className,
}: CommunityRecipeCardProps): ReactElement {
  const intl = useIntl();

  return (
    <Card className={clsx("flex flex-col gap-0 overflow-hidden p-0", className)}>
      {header}

      <div
        className={clsx(
          "bg-surface-secondary text-default-400 relative flex items-center justify-center overflow-hidden",
          recipe.photoUrl ? (photoHeight === "tall" ? "h-57.5" : "h-45") : "h-24"
        )}
      >
        {recipe.photoUrl ? (
          <img src={recipe.photoUrl} alt={recipe.title} className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <PhotoIcon className="h-5.5 w-5.5 opacity-40" />
        )}
        <CommunityBadge kind="recipe" className="absolute top-2.5 left-2.5" />
      </div>

      <div className="flex flex-1 flex-col gap-2.5 px-[18px] pt-3.5 pb-4">
        <div className="text-lg leading-tight font-semibold text-pretty">{recipe.title}</div>
        <div className="flex flex-wrap gap-1.5">
          {recipe.tags.map((tag) => (
            <TagChip key={tag} tag={tag} />
          ))}
        </div>
      </div>

      <div className="border-border bg-surface-secondary flex items-center gap-2 border-t px-[18px] py-3">
        <span className="text-default-500 text-xs whitespace-nowrap">
          {intl.formatMessage(
            {
              description: "CommunityRecipeCard: label - cooking time",
              defaultMessage: "{minutes} min",
              id: "cN5bny",
            },
            { minutes: recipe.timeMinutes }
          )}
        </span>

        <Button size="sm" variant="ghost" className="ml-auto rounded-full" onPress={onRecommend}>
          {intl.formatMessage({
            description: "CommunityRecipeCard: button - send this recipe to someone",
            defaultMessage: "Recommend",
            id: "mUIrxo",
          })}
        </Button>
        <Button size="sm" variant="primary" className="rounded-full" onPress={onOpen}>
          {intl.formatMessage({
            description: "CommunityRecipeCard: button - open the recipe",
            defaultMessage: "View recipe",
            id: "bCfApS",
          })}
        </Button>
      </div>
    </Card>
  );
}
