import { type ReactElement } from "react";
import clsx from "clsx";
import { Logo } from "../Logo/Logo";

export interface LogoFullProps {
  appName: string;
  size: "xsmall" | "small" | "medium" | "large";
}

export function LogoFull({ appName, size = "large" }: LogoFullProps): ReactElement {
  function logoTextClass(): string {
    switch (size) {
      case "xsmall":
        return "text-xl";
      case "small":
        return "text-4xl";
      case "medium":
        return "text-5xl";
      case "large":
        return "text-6xl";
    }
  }

  return (
    <div className="flex flex-row gap-3">
      <div className="flex items-center">
        <Logo size={size} />
      </div>
      <div className="flex items-center">
        <span className={clsx("font-family-display", logoTextClass())}>{appName}</span>
      </div>
    </div>
  );
}
