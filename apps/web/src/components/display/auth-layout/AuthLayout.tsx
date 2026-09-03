import type { ReactElement, ReactNode } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Button, Card, CardContent } from "@heroui/react";
import { useIntl } from "react-intl";
import { authLayoutMessages } from "./AuthLayout.messages";
import { AuthPromoPanel } from "./AuthPromoPanel";

export interface AuthLayoutProps {
  appName: string;
  title: string;
  subtitle: string;
  /** Top-right action rendered inside the card, e.g. the settings button. */
  headerAction?: ReactNode;
  /** Alert area above the form — demo notice, submit errors, confirmations. */
  banner?: ReactNode;
  /** Switch prompt rendered below the form. */
  footer?: ReactNode;
  children: ReactNode;
  onBack?: () => void;
}

/**
 * Shared shell for the public auth screens: a marketing panel beside a card
 * that holds the title, an alert area, the form and a switch prompt. The
 * marketing panel collapses away below the `lg` breakpoint.
 */
export function AuthLayout({
  appName,
  title,
  subtitle,
  headerAction,
  banner,
  footer,
  children,
  onBack,
}: AuthLayoutProps): ReactElement {
  const intl = useIntl();
  const hasTopRow = Boolean(onBack) || Boolean(headerAction);

  return (
    <div className="flex w-full max-w-[1080px] flex-col items-center gap-9 py-6 lg:grid lg:grid-cols-[minmax(280px,1fr)_minmax(360px,420px)] lg:items-center lg:gap-[clamp(36px,6vw,72px)]">
      <AuthPromoPanel appName={appName} />

      <Card className="w-full max-w-[460px] overflow-hidden p-0 shadow-2xl lg:max-w-none">
        <div className="h-[3px] bg-[image:var(--brand-gradient)]" />
        <CardContent className="flex flex-col gap-5 px-8 pt-7 pb-8">
          {hasTopRow && (
            <div className="-mt-1.5 flex items-center justify-between">
              {onBack ? (
                <Button
                  isIconOnly
                  className="-ml-2"
                  variant="ghost"
                  onPress={onBack}
                  aria-label={intl.formatMessage(authLayoutMessages.back)}
                  data-testid="auth-layout__back-button"
                >
                  <ArrowLeftIcon className="h-5 w-5" />
                </Button>
              ) : (
                <span />
              )}
              {headerAction}
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <h2 className="text-3xl leading-[1.12]">{title}</h2>
            <p className="text-muted text-sm text-pretty">{subtitle}</p>
          </div>

          {banner}
          {children}
          {footer}
        </CardContent>
      </Card>
    </div>
  );
}
