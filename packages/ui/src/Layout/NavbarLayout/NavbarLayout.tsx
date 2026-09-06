import type { ReactElement, ReactNode } from "react";
import clsx from "clsx";
import { Logo } from "../../Branding/Logo/Logo";

export interface NavbarLayoutProps {
  navbarElement: ReactNode;
  backgroundElement?: ReactNode;
  footer?: boolean;
  footerText?: string;
  footerCopyright?: string;
  footerContent?: ReactNode;
  /** Reserves space below the page content for a fixed mobile bottom navigation bar rendered by `navbarElement`. */
  reserveMobileNavSpace?: boolean;
  children?: ReactNode;
}

export function NavbarLayout({
  backgroundElement,
  navbarElement,
  footer,
  footerText,
  footerCopyright,
  footerContent,
  reserveMobileNavSpace,
  children,
}: NavbarLayoutProps): ReactElement {
  return (
    /*
     * Deliberately transparent so the page reads on the theme's `--background`
     * (set on `html`), which is the ground raised surfaces are meant to sit on.
     * Painting `--surface` here would give the page the same colour as every
     * card on it — and it also has to stay unpainted for `backgroundElement`,
     * which renders at `z-[-2]` and would be covered by a background of our own.
     */
    <div
      className={clsx(
        "text-foreground relative flex min-h-screen flex-col",
        reserveMobileNavSpace && "pb-[calc(62px+env(safe-area-inset-bottom))] sm:pb-0"
      )}
    >
      {backgroundElement}
      {navbarElement}
      <main className="container mx-auto flex-1 p-4">{children}</main>
      {footer && (
        <footer className="container mx-auto flex flex-col place-items-center px-12 pb-12">
          <div className="grid place-items-center gap-0.5">
            <Logo size="large" />
            <p className="text-base font-bold">{footerText ?? "Made with ☕ by Petter Hancock"}</p>
            <p>{footerCopyright ?? "Copyright © 2024 - All rights reserved"}</p>
            {footerContent && <div className="mt-4">{footerContent}</div>}
          </div>
        </footer>
      )}
    </div>
  );
}
