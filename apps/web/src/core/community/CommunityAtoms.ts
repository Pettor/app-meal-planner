import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { DefaultFollowing, SampleInboxItems } from "~/core/community/CommunitySampleData";
import type { InboxItem, SharedItemKind } from "~/core/community/CommunityTypes";
import type { PlanDraft } from "~/core/plan/PlanTypes";

/**
 * The ids of the people the cook follows.
 *
 * Persisted locally until `@package/api` grows a `Community` endpoint — the
 * feed, the people list and every profile read from here, so they stay in step.
 */
export const followingAtom = atomWithStorage<string[]>("community.following", DefaultFollowing);

/** Recommendations sent to the cook, minus the ones they have dealt with. */
export const inboxAtom = atomWithStorage<InboxItem[]>("community.inbox", SampleInboxItems);

/**
 * A shared week the cook chose to load, handed to the planner across the
 * navigation that takes them there. Cleared as soon as the wizard picks it up.
 */
export const pendingSharedPlanAtom = atom<PlanDraft | null>(null);

/** What the recommend dialog is currently offering to send, if it is open. */
export interface RecommendTarget {
  kind: SharedItemKind;
  /** The week or recipe's id, so the send can be attributed to it. */
  refId: string;
  title: string;
}

export const recommendTargetAtom = atom<RecommendTarget | null>(null);

/** The id of the shared week the cook is being asked to confirm loading. */
export const loadWeekTargetAtom = atom<string | null>(null);
