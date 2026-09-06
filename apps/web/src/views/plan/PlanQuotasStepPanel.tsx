import type { ReactElement } from "react";
import { MinusIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Button, Card, Chip, Separator } from "@heroui/react";
import { useIntl } from "react-intl";
import { SearchField } from "~/components/input/input-field/SearchField";
import { ToggleChip } from "~/components/input/toggle-chip/ToggleChip";
import type { PlanQuotaRowViewModel, PlanTagPickViewModel } from "~/views/plan/UsePlanWizard";

export interface PlanQuotasStepPanelProps {
  quotaRows: PlanQuotaRowViewModel[];
  hasNoQuotas: boolean;
  quotaQuery: string;
  onQuotaQueryChange: (query: string) => void;
  isSearchingQuotaTags: boolean;
  quotaSearchResults: PlanTagPickViewModel[];
  hasNoQuotaSearchResults: boolean;
  createQuotaTagLabel: string;
  onCreateQuotaTag: () => void;
  yourTagChips: PlanTagPickViewModel[];
  popularTagChips: PlanTagPickViewModel[];
  onOpenEditDefaultTags: () => void;
  onOpenBrowseQuotaTags: () => void;
}

function TagPickChip({ chip }: { chip: PlanTagPickViewModel }): ReactElement {
  return (
    <ToggleChip
      label={chip.tag}
      isSelected={false}
      onChange={chip.onAdd}
      endContent={<span className="font-mono text-[11px] tabular-nums opacity-60">{chip.countLabel}</span>}
      className="border-border bg-surface border"
    />
  );
}

/** Step 2: quotas the randomizer respects when it fills the week. */
export function PlanQuotasStepPanel({
  quotaRows,
  hasNoQuotas,
  quotaQuery,
  onQuotaQueryChange,
  isSearchingQuotaTags,
  quotaSearchResults,
  hasNoQuotaSearchResults,
  createQuotaTagLabel,
  onCreateQuotaTag,
  yourTagChips,
  popularTagChips,
  onOpenEditDefaultTags,
  onOpenBrowseQuotaTags,
}: PlanQuotasStepPanelProps): ReactElement {
  const intl = useIntl();

  const searchLabel = intl.formatMessage({
    description: "PlanQuotasStepPanel: placeholder - search community tags",
    defaultMessage: "Search community tags",
    id: "27ddR2",
  });

  return (
    <div className="grid grid-cols-1 gap-4.5 md:grid-cols-2">
      <Card variant="secondary">
        <Card.Header>
          <Card.Title>
            {intl.formatMessage({
              description: "PlanQuotasStepPanel: heading - quotas for the week",
              defaultMessage: "Quotas for the week",
              id: "dYKklw",
            })}
          </Card.Title>
          <Card.Description>
            {intl.formatMessage({
              description: "PlanQuotasStepPanel: body - quotas description",
              defaultMessage: "The planner respects these when it fills the week.",
              id: "ksnurK",
            })}
          </Card.Description>
        </Card.Header>
        <Card.Content className="flex flex-col gap-0">
          {quotaRows.map((row) => (
            <div
              key={row.tag}
              className="border-separator grid grid-cols-[1fr_auto] items-center gap-x-2.5 gap-y-2 border-b py-2.5 last:border-b-0 sm:flex sm:gap-3"
            >
              <Chip
                variant="secondary"
                className="border-border bg-surface col-start-1 row-start-1 justify-self-start rounded-full border px-2.5 py-1 text-sm sm:mr-auto"
              >
                {row.tag}
              </Chip>
              <Button
                variant="outline"
                size="sm"
                className="bg-surface col-start-1 row-start-2 w-full min-w-0 justify-center sm:w-auto sm:min-w-26"
                onPress={row.onCycleMode}
              >
                {row.modeLabel}
              </Button>
              <div className="border-border bg-surface col-start-2 row-start-2 flex items-center gap-1 justify-self-end rounded-md border p-0.5">
                <Button
                  variant="ghost"
                  size="sm"
                  isIconOnly
                  onPress={row.onDecrease}
                  aria-label={intl.formatMessage(
                    {
                      description: "PlanQuotasStepPanel: aria-label - decrease quota",
                      defaultMessage: "Fewer {tag}",
                      id: "AJfD1x",
                    },
                    { tag: row.tag }
                  )}
                >
                  <MinusIcon className="h-3.5 w-3.5" />
                </Button>
                <span className="min-w-5.5 text-center text-sm font-semibold">{row.n}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  isIconOnly
                  onPress={row.onIncrease}
                  aria-label={intl.formatMessage(
                    {
                      description: "PlanQuotasStepPanel: aria-label - increase quota",
                      defaultMessage: "More {tag}",
                      id: "4hHbCd",
                    },
                    { tag: row.tag }
                  )}
                >
                  <PlusIcon className="h-3.5 w-3.5" />
                </Button>
              </div>
              <Button
                variant="ghost"
                size="sm"
                isIconOnly
                className="text-danger col-start-2 row-start-1 justify-self-end"
                onPress={row.onRemove}
                aria-label={intl.formatMessage(
                  {
                    description: "PlanQuotasStepPanel: aria-label - remove quota",
                    defaultMessage: "Remove {tag} quota",
                    id: "HFY8EB",
                  },
                  { tag: row.tag }
                )}
              >
                <XMarkIcon className="h-4 w-4" />
              </Button>
            </div>
          ))}
          {hasNoQuotas && (
            <p className="text-default-500 py-2 text-sm">
              {intl.formatMessage({
                description: "PlanQuotasStepPanel: body - no quotas yet",
                defaultMessage: "No quotas yet, the week will be filled at random.",
                id: "/ya1sX",
              })}
            </p>
          )}
        </Card.Content>
      </Card>

      <Card variant="secondary">
        <Card.Header>
          <Card.Title>
            {intl.formatMessage({
              description: "PlanQuotasStepPanel: heading - add a quota",
              defaultMessage: "Add a quota",
              id: "yj75TH",
            })}
          </Card.Title>
          <Card.Description>
            {intl.formatMessage({
              description: "PlanQuotasStepPanel: body - add a quota description",
              defaultMessage: "Search the community tag pool, or start from the popular ones.",
              id: "bwDv6A",
            })}
          </Card.Description>
        </Card.Header>
        <Card.Content className="flex flex-col gap-3.5">
          <SearchField
            value={quotaQuery}
            onChange={onQuotaQueryChange}
            placeholder={searchLabel}
            ariaLabel={searchLabel}
          />

          {isSearchingQuotaTags ? (
            <>
              <div className="flex flex-wrap gap-1.5">
                {quotaSearchResults.map((chip) => (
                  <TagPickChip key={chip.tag} chip={chip} />
                ))}
              </div>
              {hasNoQuotaSearchResults && (
                <div className="flex flex-wrap items-center gap-2.5">
                  <p className="text-default-500 text-sm">
                    {intl.formatMessage({
                      description: "PlanQuotasStepPanel: body - no tag matches",
                      defaultMessage: "No community tag matches that.",
                      id: "Ojopgv",
                    })}
                  </p>
                  <Button variant="outline" size="sm" className="bg-surface" onPress={onCreateQuotaTag}>
                    {createQuotaTagLabel}
                  </Button>
                </div>
              )}
            </>
          ) : (
            <>
              {yourTagChips.length > 0 && (
                <div>
                  <div className="text-default-500 mb-2 text-[11px] font-semibold tracking-wider uppercase">
                    {intl.formatMessage({
                      description: "PlanQuotasStepPanel: label - your tags",
                      defaultMessage: "Your tags",
                      id: "JYLpGe",
                    })}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {yourTagChips.map((chip) => (
                      <TagPickChip key={chip.tag} chip={chip} />
                    ))}
                  </div>
                </div>
              )}
              <div>
                <div className="text-default-500 mb-2 text-[11px] font-semibold tracking-wider uppercase">
                  {intl.formatMessage({
                    description: "PlanQuotasStepPanel: label - popular in the community",
                    defaultMessage: "Popular in the community",
                    id: "+aNmSE",
                  })}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {popularTagChips.map((chip) => (
                    <TagPickChip key={chip.tag} chip={chip} />
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2.5">
                <Button variant="ghost" size="sm" className="text-accent -ml-3" onPress={onOpenEditDefaultTags}>
                  {intl.formatMessage({
                    description: "PlanQuotasStepPanel: button - edit default tags",
                    defaultMessage: "Edit your default tags",
                    id: "/nm29K",
                  })}
                </Button>
                <Button variant="ghost" size="sm" className="text-accent -mr-3" onPress={onOpenBrowseQuotaTags}>
                  {intl.formatMessage({
                    description: "PlanQuotasStepPanel: button - browse all tags",
                    defaultMessage: "Browse all tags",
                    id: "m0nnwJ",
                  })}
                </Button>
              </div>
            </>
          )}

          <Separator />
          <p className="text-default-500 text-xs">
            {intl.formatMessage({
              description: "PlanQuotasStepPanel: body - quota hint",
              defaultMessage:
                "At most is a ceiling, good for expensive or heavy meals. At least is a floor the randomizer fills first.",
              id: "me57gH",
            })}
          </p>
        </Card.Content>
      </Card>
    </div>
  );
}
