import { useState } from "react";
import { toast } from "@heroui/react";
import { useAtom } from "jotai";
import { useIntl } from "react-intl";
import type { RecommendDialogProps } from "./RecommendDialog";
import { recommendTargetAtom } from "~/core/community/CommunityAtoms";
import { useCommunity } from "~/core/community/UseCommunity";

/**
 * Builds the recommend dialog's props from the community store. Only the
 * people the cook follows can be sent to — recommending to a stranger is not
 * a thing the design offers.
 */
export function useRecommendDialogController(): RecommendDialogProps {
  const intl = useIntl();
  const { people, following } = useCommunity();
  const [target, setTarget] = useAtom(recommendTargetAtom);

  const [note, setNote] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  function close(): void {
    setTarget(null);
    setNote("");
    setSelectedIds([]);
  }

  function send(): void {
    close();
    toast(
      intl.formatMessage({
        description: "UseRecommendDialogController: toast - recommendation sent",
        defaultMessage: "Recommendation sent.",
        id: "fYTB6G",
      })
    );
  }

  return {
    isOpen: target !== null,
    itemTitle: target?.title ?? "",
    targets: people.filter((person) => following.includes(person.id)),
    selectedIds,
    note,
    onNoteChange: setNote,
    onToggleTarget: (personId) =>
      setSelectedIds((current) =>
        current.includes(personId) ? current.filter((id) => id !== personId) : [...current, personId]
      ),
    onSend: send,
    onClose: close,
  };
}
