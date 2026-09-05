import type { ReactElement } from "react";
import { useIntl } from "react-intl";

export interface RecipeDetailMethodProps {
  steps: string[];
}

export function RecipeDetailMethod({ steps }: RecipeDetailMethodProps): ReactElement {
  const intl = useIntl();

  return (
    <div>
      <h2 className="text-default-500 mb-4 text-xs font-semibold tracking-[0.09em] uppercase">
        {intl.formatMessage({
          description: "RecipeDetailMethod: heading - method",
          defaultMessage: "Method",
          id: "TMVAnA",
        })}
      </h2>
      <ol className="flex flex-col gap-4.5">
        {steps.map((step, index) => (
          <li key={step} className="flex items-start gap-3.5">
            <span className="bg-accent/12 text-accent mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold">
              {index + 1}
            </span>
            <p className="text-base leading-relaxed text-pretty">{step}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
