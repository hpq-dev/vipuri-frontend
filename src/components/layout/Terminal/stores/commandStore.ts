import { create } from "zustand";
import type { LogEntry, LogLevel } from "../types";

interface CommandState {
  outputHistory: LogEntry[];
  commandHistory: string[];
  historyIndex: number;
  input: string;

  setInput: (input: string) => void;
  setOutputHistory: (history: LogEntry[]) => void;
  addOutput: (entry: LogEntry) => void;
  log: (value: unknown, level?: LogLevel) => void;
  executeCommand: (command: string) => void;
  navigateHistory: (direction: "up" | "down") => string;
  clearOutput: () => void;
}

const builtinCommands = {
  clear: () => "__CLEAR__",
  date: () => new Date().toLocaleString(),
  help: () => "Available commands: clear, date, help",
  eval: (arg: string) => {
    try {
      return eval(arg);
    } catch (error) {
      return `Error: ${error instanceof Error ? error.message : String(error)}`;
    }
  },
} as const;

export const useCommandStore = create<CommandState>()((set, get) => ({
  outputHistory: [
    {
      level: "info",
      value: "Welcome to Terminal v2.0.",
      type: "text",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    },
  ],
  commandHistory: [],
  historyIndex: -1,
  input: "",

  setInput: (input) => set({ input }),
  setOutputHistory: (outputHistory) => set({ outputHistory }),

  addOutput: (entry) =>
    set((state) => ({
      outputHistory: [...state.outputHistory, entry],
    })),

  log: (value, level = "info") => {
    const timestamp = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    get().addOutput({
      level,
      value,
      timestamp,
    });
  },

  executeCommand: (line) => {
    const trimmed = line.trim();
    if (!trimmed) return;

    const [cmd, ...args] = trimmed.split(" ");
    const arg = args.join(" ");
    const { commandHistory, log, setInput } = get();

    set({
      commandHistory: [...commandHistory, trimmed],
      historyIndex: -1,
    });

    const runner = builtinCommands[cmd as keyof typeof builtinCommands];
    if (!runner) {
      log(`Command not found: ${cmd}`, "error");
      setInput("");
      return;
    }

    const raw =
      runner.length === 0
        ? (runner as () => string)()
        : (runner as (p: string) => string)(arg);

    if (raw === undefined || raw === null) {
      setInput("");
      return;
    }

    if (raw === "__CLEAR__") {
      set({ outputHistory: [] });
    } else {
      log(raw, "info");
    }

    setInput("");
  },

  navigateHistory: (direction) => {
    const { commandHistory, historyIndex, input } = get();

    if (commandHistory.length === 0) return input;

    let newIndex = historyIndex;
    if (direction === "up") {
      newIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
    } else {
      newIndex = Math.max(historyIndex - 1, -1);
    }

    set({ historyIndex: newIndex });

    if (newIndex === -1) {
      return "";
    }
    return commandHistory[commandHistory.length - 1 - newIndex];
  },

  clearOutput: () => set({ outputHistory: [] }),
}));
