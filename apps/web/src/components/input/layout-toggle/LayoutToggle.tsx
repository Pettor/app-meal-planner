import type { ReactElement } from "react";
import clsx from "clsx";
import { useIntl } from "react-intl";
import { ToggleChip } from "~/components/input/toggle-chip/ToggleChip";

export interface LayoutToggleOption<TLayout extends string> {
  value: TLayout;
  label: string;
}

export interface LayoutToggleProps<TLayout extends string> {
  options: LayoutToggleOption<TLayout>[];
  value: TLayout;
  onChange: (value: TLayout) => void;
  className?: string;
}

/**
 * Switches how a week is laid out — the planner's review step and the week page
 * both offer one, so the control reads the same on either.
 */
export function LayoutToggle<TLayout extends string>({
  options,
  value,
  onChange,
  className,
}: LayoutToggleProps<TLayout>): ReactElement {
  const intl = useIntl();

  return (
    <div className={clsx("flex items-center gap-1.5", className)}>
      <span className="text-default-500 mr-1 text-xs">
        {intl.formatMessage({
          description: "LayoutToggle: label - layout",
          defaultMessage: "Layout",
          id: "UdDyl7",
        })}
      </span>
      {options.map((option) => (
        <ToggleChip
          key={option.value}
          label={option.label}
          isSelected={option.value === value}
          onChange={() => onChange(option.value)}
        />
      ))}
    </div>
  );
}
