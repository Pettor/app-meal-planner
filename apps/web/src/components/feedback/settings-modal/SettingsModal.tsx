import { useState, useEffect, type ReactElement } from "react";
import {
  CircleStackIcon,
  InformationCircleIcon,
  LanguageIcon,
  SunIcon,
  TagIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { Modal, Tabs } from "@heroui/react";
import { useBreakpoint } from "@package/react";
import clsx from "clsx";
import { useIntl } from "react-intl";
import type { SettingsAboutSectionProps } from "./SettingsAboutSection";
import { SettingsAboutSection } from "./SettingsAboutSection";
import type { SettingsAccountSectionProps } from "./SettingsAccountSection";
import { SettingsAccountSection } from "./SettingsAccountSection";
import type { SettingsAppearanceSectionProps } from "./SettingsAppearanceSection";
import { SettingsAppearanceSection } from "./SettingsAppearanceSection";
import type { SettingsDataSectionProps } from "./SettingsDataSection";
import { SettingsDataSection } from "./SettingsDataSection";
import type { SettingsDefaultTagsSectionProps } from "./SettingsDefaultTagsSection";
import { SettingsDefaultTagsSection } from "./SettingsDefaultTagsSection";
import type { SettingsLanguageSectionProps } from "./SettingsLanguageSection";
import { SettingsLanguageSection } from "./SettingsLanguageSection";
import type { SettingsSection } from "~/core/settings/SettingsSection";

export interface SettingsModalProps {
  isOpen: boolean;
  sections: SettingsSection[];
  initialSection?: SettingsSection;
  onClose: () => void;
  /** Signed in only — before that there is no account to show. */
  account?: SettingsAccountSectionProps;
  appearance: SettingsAppearanceSectionProps;
  language: SettingsLanguageSectionProps;
  /** Signed in only — the cook's own tags. */
  defaultTags?: SettingsDefaultTagsSectionProps;
  /** Signed in only — the cook's own data. */
  data?: SettingsDataSectionProps;
  aboutDetails: SettingsAboutSectionProps;
}

const SectionIcons: Record<SettingsSection, ReactElement> = {
  account: <UserCircleIcon className="size-4.5 shrink-0" />,
  appearance: <SunIcon className="size-4.5 shrink-0" />,
  language: <LanguageIcon className="size-4.5 shrink-0" />,
  tags: <TagIcon className="size-4.5 shrink-0" />,
  data: <CircleStackIcon className="size-4.5 shrink-0" />,
  about: <InformationCircleIcon className="size-4.5 shrink-0" />,
};

/**
 * Every preference, behind one nav rail.
 *
 * The rail names the sections and the pane header says what each one is for, so
 * no section repeats its own title. Below `sm` the rail turns into a scrolling
 * strip above the pane rather than taking half the width.
 */
export function SettingsModal({
  isOpen,
  sections,
  initialSection,
  onClose,
  account,
  appearance,
  language,
  defaultTags,
  data,
  aboutDetails,
}: SettingsModalProps): ReactElement {
  const intl = useIntl();
  const isWide = useBreakpoint("sm");
  const [activeSection, setActiveSection] = useState<SettingsSection>(initialSection ?? sections[0] ?? "appearance");

  useEffect(() => {
    if (isOpen && initialSection) {
      setActiveSection(initialSection);
    }
  }, [isOpen, initialSection]);

  const title = intl.formatMessage({
    description: "SettingsModal: heading - title",
    defaultMessage: "Settings",
    id: "A5kccO",
  });

  function getSectionLabel(section: SettingsSection): string {
    switch (section) {
      case "account":
        return intl.formatMessage({
          description: "SettingsModal: tab - account",
          defaultMessage: "Account",
          id: "itKwWQ",
        });
      case "appearance":
        return intl.formatMessage({
          description: "SettingsModal: tab - appearance",
          defaultMessage: "Appearance",
          id: "miFRsV",
        });
      case "language":
        return intl.formatMessage({
          description: "SettingsModal: tab - language",
          defaultMessage: "Language",
          id: "ypOlkq",
        });
      case "tags":
        return intl.formatMessage({
          description: "SettingsModal: tab - default tags",
          defaultMessage: "Your default tags",
          id: "XdjdbR",
        });
      case "data":
        return intl.formatMessage({
          description: "SettingsModal: tab - data",
          defaultMessage: "Data",
          id: "fPc6KK",
        });
      case "about":
        return intl.formatMessage({
          description: "SettingsModal: tab - about",
          defaultMessage: "About",
          id: "pPj4qN",
        });
    }
  }

  function getSectionDescription(section: SettingsSection): string {
    switch (section) {
      case "account":
        return intl.formatMessage({
          description: "SettingsModal: body - account section purpose",
          defaultMessage: "The details you signed in with.",
          id: "5Vzqiv",
        });
      case "appearance":
        return intl.formatMessage({
          description: "SettingsModal: body - appearance section purpose",
          defaultMessage: "Light, dark, or follow the operating system.",
          id: "S6tf2s",
        });
      case "language":
        return intl.formatMessage({
          description: "SettingsModal: body - language section purpose",
          defaultMessage: "Interface language. Recipe text stays as you wrote it.",
          id: "n6xojA",
        });
      case "tags":
        return intl.formatMessage({
          description: "SettingsModal: body - default tags section purpose",
          defaultMessage: "Offered first when you set quotas for a week. Click one to remove it.",
          id: "ICh02C",
        });
      case "data":
        return intl.formatMessage({
          description: "SettingsModal: body - data section purpose",
          defaultMessage:
            "Recipes, tags and the current week live in one JSON blob. Paste to replace, download to back up.",
          id: "kJRKid",
        });
      case "about":
        return intl.formatMessage({
          description: "SettingsModal: body - about section purpose",
          defaultMessage: "Which build of the app you are looking at.",
          id: "I58VNp",
        });
    }
  }

  function renderSection(section: SettingsSection): ReactElement {
    switch (section) {
      case "account":
        return account ? <SettingsAccountSection {...account} /> : <></>;
      case "appearance":
        return <SettingsAppearanceSection {...appearance} />;
      case "language":
        return <SettingsLanguageSection {...language} />;
      case "tags":
        return defaultTags ? <SettingsDefaultTagsSection {...defaultTags} /> : <></>;
      case "data":
        return data ? <SettingsDataSection {...data} /> : <></>;
      case "about":
        return <SettingsAboutSection {...aboutDetails} />;
    }
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Modal.Backdrop variant="blur">
        <Modal.Container size="lg">
          <Modal.Dialog aria-label={title} className="max-w-220 gap-0 overflow-hidden p-0 sm:h-[min(38.75rem,86vh)]">
            <Tabs
              orientation={isWide ? "vertical" : "horizontal"}
              selectedKey={activeSection}
              onSelectionChange={(key) => setActiveSection(key as SettingsSection)}
              className="min-h-0 flex-1 gap-0"
            >
              <div className="border-separator bg-surface-secondary flex min-w-0 shrink-0 flex-col border-b p-3 sm:w-53 sm:border-r sm:border-b-0 sm:px-3 sm:py-5">
                <div className="text-muted hidden px-2.5 pb-2.5 text-xs font-medium tracking-[0.09em] uppercase sm:block">
                  {title}
                </div>
                <Tabs.ListContainer className="rounded-none bg-transparent">
                  <Tabs.List
                    aria-label={intl.formatMessage({
                      description: "SettingsModal: aria-label - settings navigation",
                      defaultMessage: "Settings navigation",
                      id: "QJ8Qdm",
                    })}
                    className="gap-1"
                  >
                    {sections.map((section) => (
                      <Tabs.Tab
                        key={section}
                        id={section}
                        className="data-[selected=true]:text-foreground h-auto w-auto justify-start gap-2.5 rounded-md px-3 py-2.25 text-left whitespace-nowrap sm:w-full"
                      >
                        {SectionIcons[section]}
                        {getSectionLabel(section)}
                        {/*
                         * An accent bar down the leading edge — the selection is marked, not filled.
                         * `variant="secondary"` draws this bar itself, but only through a
                         * `.tabs--secondary > .tabs__list-container` selector, and the rail wrapper
                         * around the list breaks that direct-child match. Hence the explicit shape.
                         */}
                        <Tabs.Indicator
                          className={clsx(
                            "bg-accent rounded-none shadow-none",
                            isWide ? "top-0 h-full w-0.5" : "top-auto bottom-0 h-0.5 w-full"
                          )}
                        />
                      </Tabs.Tab>
                    ))}
                  </Tabs.List>
                </Tabs.ListContainer>
              </div>

              <div className="flex min-h-0 min-w-0 flex-1 flex-col">
                <div className="border-separator flex items-start gap-3 border-b px-6 pt-5 pb-3.5">
                  <div className="min-w-0 flex-1">
                    <Modal.Heading className="text-lg">{getSectionLabel(activeSection)}</Modal.Heading>
                    <p className="text-muted mt-1 text-sm">{getSectionDescription(activeSection)}</p>
                  </div>
                  <Modal.CloseTrigger className="static shrink-0" />
                </div>
                {sections.map((section) => (
                  <Tabs.Panel
                    key={section}
                    id={section}
                    className="m-0 flex min-h-0 flex-1 flex-col gap-2.5 overflow-y-auto px-6 py-5"
                  >
                    {renderSection(section)}
                  </Tabs.Panel>
                ))}
              </div>
            </Tabs>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
