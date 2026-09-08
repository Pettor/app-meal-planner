import type { ReactElement } from "react";
import { useIntl } from "react-intl";

export interface RecipeDetailMethodProps {
  steps: string[];
}

export function RecipeDetailMethod({ steps }: RecipeDetailMethodProps): ReactElement {
  const intl = useIntl();

  return (
    <div>
      {/* The min-height keeps this level with the ingredients heading, which carries the servings stepper. */}
      <div className="mb-3.5 flex min-h-9.5 items-center">
        <h2 className="text-xl font-semibold tracking-[-0.01em]">
          {intl.formatMessage({
            description: "RecipeDetailMethod: heading - method",
            defaultMessage: "Method",
            id: "TMVAnA",
          })}
        </h2>
      </div>
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
