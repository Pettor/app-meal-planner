import type { ReactElement } from "react";
import {
  ArrowLeftIcon,
  MinusIcon,
  PaperAirplaneIcon,
  PencilSquareIcon,
  PlusCircleIcon,
  PlusIcon,
  PrinterIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@heroui/react";
import { useIntl } from "react-intl";

export interface RecipeDetailToolbarProps {
  servings: number;
  isMine: boolean;
  isSaved: boolean;
  onBack: () => void;
  onIncreaseServings: () => void;
  onDecreaseServings: () => void;
  onEdit: () => void;
  onRecommend: () => void;
  onSave: () => void;
  onRemove: () => void;
  onPrint: () => void;
}

export function RecipeDetailToolbar({
  servings,
  isMine,
  isSaved,
  onBack,
  onIncreaseServings,
  onDecreaseServings,
  onEdit,
  onRecommend,
  onSave,
  onRemove,
  onPrint,
}: RecipeDetailToolbarProps): ReactElement {
  const intl = useIntl();

  return (
    <div className="mb-5 flex flex-wrap items-center justify-between gap-3 print:hidden">
      <Button variant="ghost" onPress={onBack} data-testid="recipe-detail__back">
        <ArrowLeftIcon className="mr-1.5 h-4 w-4" />
        {intl.formatMessage({
          description: "RecipeDetailToolbar: button - back",
          defaultMessage: "Back",
          id: "hoOxHk",
        })}
      </Button>

      <div className="flex flex-wrap items-center gap-2">
        <div className="border-border bg-surface flex items-center gap-1.5 rounded-lg border p-1">
          <Button
            variant="ghost"
            size="sm"
            isIconOnly
            onPress={onDecreaseServings}
            aria-label={intl.formatMessage({
              description: "RecipeDetailToolbar: aria-label - fewer servings",
              defaultMessage: "Cook for fewer people",
              id: "5gOH4I",
            })}
          >
            <MinusIcon className="h-4 w-4" />
          </Button>
          <span className="min-w-22 text-center text-sm font-medium" data-testid="recipe-detail__servings">
            {intl.formatMessage(
              {
                description: "RecipeDetailToolbar: label - servings",
                defaultMessage: "{count} people",
                id: "zyHIai",
              },
              { count: servings }
            )}
          </span>
          <Button
            variant="ghost"
            size="sm"
            isIconOnly
            onPress={onIncreaseServings}
            aria-label={intl.formatMessage({
              description: "RecipeDetailToolbar: aria-label - more servings",
              defaultMessage: "Cook for more people",
              id: "Bj+Y5j",
            })}
          >
            <PlusIcon className="h-4 w-4" />
          </Button>
        </div>

        {isMine && (
          <Button variant="outline" onPress={onEdit} data-testid="recipe-detail__edit">
            <PencilSquareIcon className="mr-1.5 h-4 w-4" />
            {intl.formatMessage({
              description: "RecipeDetailToolbar: button - edit",
              defaultMessage: "Edit",
              id: "WMX+ul",
            })}
          </Button>
        )}

        <Button variant="outline" onPress={onRecommend}>
          <PaperAirplaneIcon className="mr-1.5 h-4 w-4" />
          {intl.formatMessage({
            description: "RecipeDetailToolbar: button - recommend",
            defaultMessage: "Recommend",
            id: "r5KedM",
          })}
        </Button>

        {isSaved ? (
          <Button variant="ghost" className="text-danger" onPress={onRemove} data-testid="recipe-detail__remove">
            <TrashIcon className="mr-1.5 h-4 w-4" />
            {intl.formatMessage({
              description: "RecipeDetailToolbar: button - remove",
              defaultMessage: "Remove",
              id: "V4eYMP",
            })}
          </Button>
        ) : (
          <Button variant="secondary" onPress={onSave} data-testid="recipe-detail__save">
            <PlusCircleIcon className="mr-1.5 h-4 w-4" />
            {intl.formatMessage({
              description: "RecipeDetailToolbar: button - save to my recipes",
              defaultMessage: "Save to my recipes",
              id: "TGoMEm",
            })}
          </Button>
        )}

        <Button variant="primary" onPress={onPrint}>
          <PrinterIcon className="mr-1.5 h-4 w-4" />
          {intl.formatMessage({
            description: "RecipeDetailToolbar: button - print",
            defaultMessage: "Print",
            id: "MpB6Zq",
          })}
        </Button>
      </div>
    </div>
  );
}
