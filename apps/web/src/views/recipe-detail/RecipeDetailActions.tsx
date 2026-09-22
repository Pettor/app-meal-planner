import type { ReactElement } from "react";
import {
  PaperAirplaneIcon,
  PencilSquareIcon,
  PlusCircleIcon,
  PrinterIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@heroui/react";
import { useIntl } from "react-intl";

export interface RecipeDetailActionsProps {
  isMine: boolean;
  isSaved: boolean;
  onEdit: () => void;
  onRecommend: () => void;
  onSave: () => void;
  onRemove: () => void;
  onPrint: () => void;
}

/** Everything you can do to a recipe, sitting at the foot of the hero copy. */
export function RecipeDetailActions({
  isMine,
  isSaved,
  onEdit,
  onRecommend,
  onSave,
  onRemove,
  onPrint,
}: RecipeDetailActionsProps): ReactElement {
  const intl = useIntl();

  return (
    <div className="border-separator mt-auto flex flex-wrap items-center gap-2 border-t pt-5 print:hidden">
      {isMine && (
        <Button variant="outline" onPress={onEdit} data-testid="recipe-detail__edit">
          <PencilSquareIcon className="mr-1.5 h-4 w-4" />
          {intl.formatMessage({
            description: "RecipeDetailActions: button - edit",
            defaultMessage: "Edit",
            id: "8QWH/2",
          })}
        </Button>
      )}

      <Button variant="outline" onPress={onRecommend}>
        <PaperAirplaneIcon className="mr-1.5 h-4 w-4" />
        {intl.formatMessage({
          description: "RecipeDetailActions: button - recommend",
          defaultMessage: "Recommend",
          id: "qH944z",
        })}
      </Button>

      {isSaved ? (
        <Button
          variant="ghost"
          className="text-danger border-danger/40 border"
          onPress={onRemove}
          data-testid="recipe-detail__remove"
        >
          <TrashIcon className="mr-1.5 h-4 w-4" />
          {intl.formatMessage({
            description: "RecipeDetailActions: button - remove",
            defaultMessage: "Remove",
            id: "NNM8UP",
          })}
        </Button>
      ) : (
        <Button variant="secondary" onPress={onSave} data-testid="recipe-detail__save">
          <PlusCircleIcon className="mr-1.5 h-4 w-4" />
          {intl.formatMessage({
            description: "RecipeDetailActions: button - save to my recipes",
            defaultMessage: "Save to my recipes",
            id: "pKTw06",
          })}
        </Button>
      )}

      <Button variant="primary" onPress={onPrint}>
        <PrinterIcon className="mr-1.5 h-4 w-4" />
        {intl.formatMessage({
          description: "RecipeDetailActions: button - print",
          defaultMessage: "Print",
          id: "SsaGTQ",
        })}
      </Button>
    </div>
  );
}
