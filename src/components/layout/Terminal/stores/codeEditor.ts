import { create } from "zustand";
import { useTerminalStore } from "./terminalStore";
import { useCommandStore } from "./commandStore";
interface EditorState {
  isEditorOpen: boolean;
  code: string;
  fileName: string;
  editorInstance: unknown | null;
  side: "browser" | "client";

  setIsEditorOpen: (isOpen: boolean) => void;
  setCode: (code: string) => void;
  setFileName: (name: string) => void;
  setEditorInstance: (editor: unknown) => void;
  setSide: (side: "browser" | "client") => void;
  toggleEditor: () => void;
  executeCode: () => void;
  formatCode: () => void;
}

const DEFAULT_TERMINAL_WIDTH = 58;

export const useEditorStore = create<EditorState>()((set, get) => ({
  isEditorOpen: false,
  code: ``,
  fileName: "vipuri.js",
  editorInstance: null,
  side: "browser",

  setIsEditorOpen: (isOpen) => set({ isEditorOpen: isOpen }),
  setCode: (code) => set({ code }),
  setFileName: (name) => set({ fileName: name }),
  setEditorInstance: (editorInstance) => set({ editorInstance }),
  setSide: (side) => set({ side }),

  toggleEditor: () => {
    const { isEditorOpen } = get();
    const { setSize, size } = useTerminalStore.getState();
    if (!isEditorOpen && size.width > DEFAULT_TERMINAL_WIDTH) {
      setSize({ width: DEFAULT_TERMINAL_WIDTH, height: size.height });
    }
    set({ isEditorOpen: !isEditorOpen });
  },

  executeCode: async () => {
    const { code, side } = get();
    const { log } = useCommandStore.getState();
    const cleanCode = code.trim();
    if (!cleanCode) return;

    try {
      if (side === "client") { 
        log("Sent code to client via RPC", "info");
        return;
      }

      const logs: unknown[] = [];
      const mockConsole = {
        log: (...args: unknown[]) =>
          logs.push(args.length === 1 ? args[0] : args),
        error: (...args: unknown[]) =>
          logs.push(args.length === 1 ? args[0] : args),
        warn: (...args: unknown[]) =>
          logs.push(args.length === 1 ? args[0] : args),
        info: (...args: unknown[]) =>
          logs.push(args.length === 1 ? args[0] : args),
      };

      const sandbox = {
        console: mockConsole,
        JSON,
        Math,
        Date,
        Array,
        Object,
        String,
        Number,
        parseInt,
        parseFloat,
        isNaN,
        isFinite,
      };

      const asyncFn = new Function(
        ...Object.keys(sandbox),
        `
        return (async () => {
          ${cleanCode}
        })();
      `
      );

      const result = await asyncFn(...Object.values(sandbox));
      logs.forEach((logItem) => log(logItem, "info"));
      if (result !== undefined && result !== null) log(result, "info");
    } catch (error) {
      log(`Execution Error: ${error}`, "error");
    }
  },

  formatCode: () => {
    const { editorInstance } = get();
    if (editorInstance) {
      (
        editorInstance as unknown as {
          getAction: (actionId: string) => { run: () => void } | undefined;
        }
      )
        .getAction("editor.action.formatDocument")
        ?.run();
    }
  },
}));
