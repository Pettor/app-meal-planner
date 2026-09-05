import type { ReactElement, ReactNode } from "react";
import { Surface } from "@heroui/react";
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
    <Surface
      className={clsx(
        "relative flex min-h-screen flex-col",
        reserveMobileNavSpace && "pb-[calc(62px+env(safe-area-inset-bottom))] sm:pb-0"
      )}
      variant="default"
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
    </Surface>
  );
}
