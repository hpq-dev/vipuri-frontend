import React from "react";
import { Icon } from "@iconify/react";
import { useCommandStore } from "../stores";
import type { LogEntry } from "../types";
import JsonView from "@uiw/react-json-view";

const bgClasses: Record<LogEntry["level"], string> = {
  info: "",
  warn: "bg-yellow-500/20",
  error: "bg-red-500/20",
};

const textClasses: Record<LogEntry["level"] | "timestamp", string> = {
  info: "text-gray-400",
  timestamp: "text-gray-500",
  warn: "text-yellow-500",
  error: "text-red-500",
};

const processAnsiCodes = (text: string): string => {
  return (
    text
      // eslint-disable-next-line no-control-regex
      .replace(/\u001b\[0m/g, "</span>") // Reset
      // eslint-disable-next-line no-control-regex
      .replace(/\u001b\[31m/g, '<span style="color: #ef4444">')
      // eslint-disable-next-line no-control-regex
      .replace(/\u001b\[32m/g, '<span style="color: #22c55e">')
      // eslint-disable-next-line no-control-regex
      .replace(/\u001b\[33m/g, '<span style="color: #eab308">')
      // eslint-disable-next-line no-control-regex
      .replace(/\u001b\[34m/g, '<span style="color: #3b82f6">')
      // eslint-disable-next-line no-control-regex
      .replace(/\u001b\[35m/g, '<span style="color: #a855f7">')
      // eslint-disable-next-line no-control-regex
      .replace(/\u001b\[36m/g, '<span style="color: #06b6d4">')
      // eslint-disable-next-line no-control-regex
      .replace(/\u001b\[37m/g, '<span style="color: #e5e7eb">')
      // eslint-disable-next-line no-control-regex
      .replace(/\u001b\[90m/g, '<span style="color: #6b7280">')
      // eslint-disable-next-line no-control-regex
      .replace(/\u001b\[91m/g, '<span style="color: #f87171">')
      // eslint-disable-next-line no-control-regex
      .replace(/\u001b\[92m/g, '<span style="color: #4ade80">')
      // eslint-disable-next-line no-control-regex
      .replace(/\u001b\[93m/g, '<span style="color: #facc15">')
      // eslint-disable-next-line no-control-regex
      .replace(/\u001b\[94m/g, '<span style="color: #60a5fa">')
      // eslint-disable-next-line no-control-regex
      .replace(/\u001b\[95m/g, '<span style="color: #c084fc">')
      // eslint-disable-next-line no-control-regex
      .replace(/\u001b\[96m/g, '<span style="color: #67e8f9">')
      // eslint-disable-next-line no-control-regex
      .replace(/\u001b\[97m/g, '<span style="color: #f9fafb">')
  );
};

const customTheme = {
  "--w-rjv-font-family": "Inter",
  "--w-rjv-color": "#9cdcfe",
  "--w-rjv-key-number": "#268bd2",
  "--w-rjv-key-string": "#9cdcfe",
  "--w-rjv-background-color": "transparent",
  "--w-rjv-line-color": "#36334280",
  "--w-rjv-arrow-color": "#838383",
  "--w-rjv-edit-color": "var(--w-rjv-color)",
  "--w-rjv-info-color": "#9c9c9c7a",
  "--w-rjv-update-color": "#9cdcfe",
  "--w-rjv-copied-color": "#9cdcfe",
  "--w-rjv-copied-success-color": "#28a745",

  "--w-rjv-curlybraces-color": "#d4d4d4",
  "--w-rjv-colon-color": "#d4d4d4",
  "--w-rjv-brackets-color": "#d4d4d4",
  "--w-rjv-ellipsis-color": "#cb4b16",
  "--w-rjv-quotes-color": "var(--w-rjv-key-string)",
  "--w-rjv-quotes-string-color": "var(--w-rjv-type-string-color)",

  "--w-rjv-type-string-color": "#ce9178",
  "--w-rjv-type-int-color": "#b5cea8",
  "--w-rjv-type-float-color": "#b5cea8",
  "--w-rjv-type-bigint-color": "#b5cea8",
  "--w-rjv-type-boolean-color": "#569cd6",
  "--w-rjv-type-date-color": "#b5cea8",
  "--w-rjv-type-url-color": "#3b89cf",
  "--w-rjv-type-null-color": "#569cd6",
  "--w-rjv-type-nan-color": "#859900",
  "--w-rjv-type-undefined-color": "#569cd6",
} as React.CSSProperties;

function renderValue(value: unknown) {
  if (typeof value === "object" && value !== null) {
    return <JsonView style={customTheme} value={value} />;
  }

  if (typeof value === "string") {
    const processed = processAnsiCodes(value);
    return <span dangerouslySetInnerHTML={{ __html: processed }} />;
  }

  return String(value);
}

export const OutputPane: React.FC = () => {
  const { outputHistory } = useCommandStore();

  const copyToClipboard = async (text: string | object) => {
    try {
      const textToCopy =
        typeof text === "string" ? text : JSON.stringify(text, null, 2);
      await navigator.clipboard.writeText(textToCopy);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="flex-1 py-[0.5vh] text-[.7vw] overflow-y-auto [&::-webkit-scrollbar-thumb]:rounded-[0.1vw] [&::-webkit-scrollbar-thumb]:bg-dark-200 [&::-webkit-scrollbar-track]:bg-dark-300 [&::-webkit-scrollbar]:w-[0.5vw] bg-black/20">
      {outputHistory.map(({ level, value, timestamp }, i) => (
        <div
          key={i}
          className={`flex justify-between items-center py-[.7vh] px-[.5vw] text-[.7vw] border-b-[0.1vh] border-neutral-700/30 text-gray-300 ${bgClasses[level]}`}
        >
          <span className={`flex-1 whitespace-pre-wrap ${textClasses[level]}`}>
            {typeof value} {renderValue(value)}
          </span>

          <div className="flex items-center gap-[.4vw] ml-4">
            <span
              className={`${
                textClasses[
                  level === "error" || level === "warn" ? level : "timestamp"
                ]
              } text-[.55vw]`}
            >
              {timestamp}
            </span>

            <Icon
              icon="mdi:content-copy"
              className="text-[.7vw] text-gray-400 hover:text-white cursor-pointer transition-colors"
              onClick={() => copyToClipboard(value as string | object)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
