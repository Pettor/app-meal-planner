import type { ReactElement, ReactNode } from "react";
import { ShoppingCartIcon, TagIcon, UsersIcon } from "@heroicons/react/24/outline";
import { LogoFull } from "@package/ui";
import { useIntl } from "react-intl";
import { authLayoutMessages } from "./AuthLayout.messages";

export interface AuthPromoPanelProps {
  appName: string;
}

interface PromoFeature {
  icon: ReactNode;
  title: string;
  body: string;
}

export function AuthPromoPanel({ appName }: AuthPromoPanelProps): ReactElement {
  const intl = useIntl();

  const features: PromoFeature[] = [
    {
      icon: <TagIcon className="h-[18px] w-[18px]" />,
      title: intl.formatMessage(authLayoutMessages.tagsTitle),
      body: intl.formatMessage(authLayoutMessages.tagsBody),
    },
    {
      icon: <ShoppingCartIcon className="h-[18px] w-[18px]" />,
      title: intl.formatMessage(authLayoutMessages.shoppingTitle),
      body: intl.formatMessage(authLayoutMessages.shoppingBody),
    },
    {
      icon: <UsersIcon className="h-[18px] w-[18px]" />,
      title: intl.formatMessage(authLayoutMessages.sharingTitle),
      body: intl.formatMessage(authLayoutMessages.sharingBody),
    },
  ];

  return (
    <div className="hidden min-w-0 flex-col gap-8 lg:flex">
      <LogoFull appName={appName} size="xsmall" />

      <div className="flex flex-col gap-3.5">
        <h1 className="max-w-[15ch] text-5xl leading-[1.06]">
          {intl.formatMessage(authLayoutMessages.headline, {
            accent: (chunks) => (
              <span key="accent" className="text-gradient-brand italic">
                {chunks}
              </span>
            ),
          })}
        </h1>
        <p className="text-muted max-w-[46ch] text-base text-pretty">
          {intl.formatMessage(authLayoutMessages.tagline)}
        </p>
      </div>

      <ul className="flex max-w-[44ch] flex-col gap-5.5">
        {features.map((feature) => (
          <li key={feature.title} className="flex gap-3.5">
            <span className="bg-accent-soft text-accent flex h-[38px] w-[38px] flex-none items-center justify-center rounded-xl">
              {feature.icon}
            </span>
            <span className="flex flex-col gap-[3px]">
              <span className="text-sm font-semibold">{feature.title}</span>
              <span className="text-muted text-sm text-pretty">{feature.body}</span>
            </span>
          </li>
        ))}
      </ul>

      <div className="text-muted flex items-center gap-2.5 text-xs">
        <span className="flex">
          <span className="border-background h-[22px] w-[22px] rounded-full border-2 bg-[oklch(0.62_0.108_196)]" />
          <span className="border-background bg-brand-middle -ml-2 h-[22px] w-[22px] rounded-full border-2" />
          <span className="border-background bg-accent -ml-2 h-[22px] w-[22px] rounded-full border-2" />
        </span>
        <span>{intl.formatMessage(authLayoutMessages.socialProof)}</span>
      </div>
    </div>
  );
}
