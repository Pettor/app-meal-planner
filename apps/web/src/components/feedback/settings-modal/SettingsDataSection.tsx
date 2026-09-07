import type { ChangeEvent, ReactElement } from "react";
import { Button, Label, TextArea, TextField } from "@heroui/react";
import { useIntl } from "react-intl";
import type { SettingsDataStatus } from "~/core/settings/UseSettingsData";

export interface SettingsDataSectionProps {
  json: string;
  status: SettingsDataStatus;
  onJsonChange: (json: string) => void;
  onApply: () => void;
  onDownload: () => void;
  onReset: () => void;
}

/** The cook's data as raw JSON: paste to replace, download to back up. */
export function SettingsDataSection({
  json,
  status,
  onJsonChange,
  onApply,
  onDownload,
  onReset,
}: SettingsDataSectionProps): ReactElement {
  const intl = useIntl();

  const editorLabel = intl.formatMessage({
    description: "SettingsDataSection: label - json editor",
    defaultMessage: "Your data as JSON",
    id: "ybpi8H",
  });

  const statusMessages: Record<SettingsDataStatus, string> = {
    idle: "",
    applied: intl.formatMessage({
      description: "SettingsDataSection: status - json applied",
      defaultMessage: "Applied.",
      id: "zI4Y8l",
    }),
    invalid: intl.formatMessage({
      description: "SettingsDataSection: status - json could not be parsed",
      defaultMessage: "Could not parse that JSON.",
      id: "BCD2Qy",
    }),
    reset: intl.formatMessage({
      description: "SettingsDataSection: status - reset to sample data",
      defaultMessage: "Reset to sample data.",
      id: "RdW41j",
    }),
  };

  return (
    <>
      <TextField>
        <Label className="sr-only">{editorLabel}</Label>
        <TextArea
          aria-label={editorLabel}
          spellCheck={false}
          value={json}
          onChange={(event: ChangeEvent<HTMLTextAreaElement>) => onJsonChange(event.target.value)}
          className="min-h-65 font-mono text-xs leading-relaxed"
        />
      </TextField>

      <div className="flex flex-wrap items-center gap-2">
        <Button variant="primary" onPress={onApply}>
          {intl.formatMessage({
            description: "SettingsDataSection: button - apply json",
            defaultMessage: "Apply JSON",
            id: "1DeDF/",
          })}
        </Button>
        <Button variant="outline" onPress={onDownload}>
          {intl.formatMessage({
            description: "SettingsDataSection: button - download data",
            defaultMessage: "Download",
            id: "6xk6VQ",
          })}
        </Button>
        <Button variant="danger-soft" onPress={onReset}>
          {intl.formatMessage({
            description: "SettingsDataSection: button - reset to sample data",
            defaultMessage: "Reset to sample data",
            id: "FYdcTe",
          })}
        </Button>
        <span aria-live="polite" className="text-muted text-sm">
          {statusMessages[status]}
        </span>
      </div>
    </>
  );
}
