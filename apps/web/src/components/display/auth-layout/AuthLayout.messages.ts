import type { MessageTag, NoMessageValues, TypedMessageDescriptor } from "react-intl";
import { defineMessages } from "react-intl";

// react-intl 12 derives an empty argument contract for plain `defineMessages` calls, so any
// message taking values (here the <accent> tag in `headline`) declares its contract explicitly.
// A type alias, not an interface: `defineMessages` constrains its contract map to
// `Record<string, MessageValues>`, which only a type alias satisfies implicitly.
type AuthLayoutMessageValues = {
  back: NoMessageValues;
  headline: { accent: MessageTag };
  tagline: NoMessageValues;
  tagsTitle: NoMessageValues;
  tagsBody: NoMessageValues;
  shoppingTitle: NoMessageValues;
  shoppingBody: NoMessageValues;
  sharingTitle: NoMessageValues;
  sharingBody: NoMessageValues;
  socialProof: NoMessageValues;
};

export const authLayoutMessages: {
  readonly [K in keyof AuthLayoutMessageValues]: TypedMessageDescriptor<AuthLayoutMessageValues[K]>;
} = defineMessages<AuthLayoutMessageValues>(
  {
    back: {
      description: "AuthLayout: aria-label - back button",
      defaultMessage: "Back",
      id: "QbsjKw",
    },
    headline: {
      description: "AuthPromoPanel: heading - marketing headline. <accent> wraps the emphasised word.",
      defaultMessage: "A week of dinners, <accent>decided</accent> in a few minutes.",
      id: "3didM4",
    },
    tagline: {
      description: "AuthPromoPanel: body - marketing tagline",
      defaultMessage:
        "Keep your recipes in one pool, tag them, and let the planner fill the week around the rules you set.",
      id: "Gn/PPZ",
    },
    tagsTitle: {
      description: "AuthPromoPanel: heading - tag quotas feature",
      defaultMessage: "Tags do the deciding",
      id: "HW3ERD",
    },
    tagsBody: {
      description: "AuthPromoPanel: body - tag quotas feature",
      defaultMessage:
        "Set quotas — at least two vegetarian, fish once, nothing over 40 minutes — and let the planner fill the week around them.",
      id: "AtUxS4",
    },
    shoppingTitle: {
      description: "AuthPromoPanel: heading - shopping list feature",
      defaultMessage: "The shopping list builds itself",
      id: "5OPS8l",
    },
    shoppingBody: {
      description: "AuthPromoPanel: body - shopping list feature",
      defaultMessage: "Every planned meal, scaled to the number of plates, collapsed into one list you can print.",
      id: "XkyoEZ",
    },
    sharingTitle: {
      description: "AuthPromoPanel: heading - sharing feature",
      defaultMessage: "Cook with other people",
      id: "O8JbUn",
    },
    sharingBody: {
      description: "AuthPromoPanel: body - sharing feature",
      defaultMessage: "Follow friends, borrow a week you like, and send recipes straight to their inbox.",
      id: "fbfEha",
    },
    socialProof: {
      description: "AuthPromoPanel: body - shared planning footnote",
      defaultMessage: "Plan on your own, or share weeks with the people you cook with.",
      id: "c/1GxV",
    },
  },
  { typed: true }
);
