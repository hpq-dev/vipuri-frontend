import React, { useRef, useCallback, useMemo, useEffect } from "react";
import Editor, { useMonaco } from "@monaco-editor/react";
import { useEditorStore } from "../stores";
import { Icon } from "@iconify/react";
import { type editor, KeyMod, KeyCode } from "monaco-editor";
import globalTypes from "@ragempcommunity/types-client/index.d.ts?raw";

export const CodeEditor: React.FC = () => {
  const {
    code,
    fileName,
    setCode,
    executeCode,
    formatCode,
    setEditorInstance,
    side,
    setSide,
  } = useEditorStore();

  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const monaco = useMonaco();

  const editorOptions = useMemo(
    () => ({
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      fontSize: 12,
      fontFamily: "Consolas, Monaco, 'Courier New', monospace",
      lineNumbers: "on",
      folding: true,
      automaticLayout: false,
      formatOnPaste: true,
      formatOnType: true,
      autoIndent: "full",
      tabSize: 2,
      insertSpaces: true,
      wordWrap: "on",
      selectOnLineNumbers: true,
      matchBrackets: "always",
      autoClosingBrackets: "always",
      autoClosingQuotes: "always",
      suggestOnTriggerCharacters: true,
      acceptSuggestionOnEnter: "on",
      quickSuggestions: true,
      parameterHints: { enabled: true },
      hover: { enabled: true },
      contextmenu: false,
      mouseWheelZoom: true,
      smoothScrolling: false,
      cursorBlinking: "solid",
      cursorStyle: "line",
      renderLineHighlight: "line",
      selectionHighlight: false,
      occurrencesHighlight: false,
      codeLens: false,
      glyphMargin: false,
      lineDecorationsWidth: 10,
      lineNumbersMinChars: 3,
      foldingStrategy: "auto",
      showFoldingControls: "mouseover",
      unfoldOnClickAfterEndOfLine: true,
      dragAndDrop: false,
      links: false,
      colorDecorators: false,
      find: {
        addExtraSpaceOnTop: false,
        autoFindInSelection: "never",
        seedSearchStringFromSelection: "always",
      },
    }),
    []
  );

  const handleEditorDidMount = useCallback(
    (editor: editor.IStandaloneCodeEditor) => {
      editorRef.current = editor;
      setEditorInstance(editor);

      editor.addCommand(KeyMod.CtrlCmd | KeyCode.Enter, () => executeCode());
      editor.addCommand(KeyMod.CtrlCmd | KeyCode.KeyS, () => formatCode());
      editor.addCommand(KeyCode.F5, () => executeCode());

      setTimeout(() => {
        editor.layout();
      }, 100);
    },
    [executeCode, formatCode, setEditorInstance]
  );

  const handleEditorChange = useCallback(
    (value: string | undefined) => {
      setCode(value || "");
    },
    [setCode]
  );

  useEffect(() => {
    const handleResize = () => {
      if (editorRef.current) {
        editorRef.current.layout();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (monaco) {
      monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
        target: monaco.languages.typescript.ScriptTarget.ESNext,
        module: monaco.languages.typescript.ModuleKind.CommonJS,
        strict: true,
        allowNonTsExtensions: true,
        esModuleInterop: true,
        skipLibCheck: true,
      });

      monaco.languages.typescript.typescriptDefaults.addExtraLib(globalTypes);
    }
  }, [monaco]);

  return (
    <div className="flex flex-col h-full bg-neutral-900/95 border-r-[0.1vh] border-neutral-700/50">
      <div className="flex justify-between items-center px-[.5vw] py-[.8vh] bg-neutral-800/90 border-b-[0.1vh] border-neutral-700/20">
        <div className="flex items-center gap-[.4vw]">
          <Icon icon="mdi:file-code" className="text-[.8vw]" />
          <input
            type="text"
            value={fileName}
            readOnly
            onChange={(e) =>
              useEditorStore.getState().setFileName(e.target.value)
            }
            className="text-[.7vw] w-[3vw] font-medium bg-transparent border-none outline-none text-white"
          />
          <span
            className={`px-2 py-0.5 rounded text-xs font-semibold ${
              side === "browser"
                ? "bg-purple-600 text-purple-100"
                : "bg-orange-600 text-orange-100"
            } select-none`}
            title={`Current side: ${side}`}
          >
            {side.toUpperCase()}
          </span>
        </div>

        <div className="flex items-center gap-[.4vw]">
          <button
            onClick={() => setSide("browser")}
            className={`text-[.6vw] px-[.5vw] py-[.2vh] rounded transition-colors ${
              side === "browser"
                ? "bg-purple-600/30 text-purple-300"
                : "bg-neutral-700/30 text-neutral-400 hover:bg-neutral-600/40"
            }`}
            title="Switch to Browser execution"
          >
            Browser
          </button>
          <button
            onClick={() => setSide("client")}
            className={`text-[.6vw] px-[.5vw] py-[.2vh] rounded transition-colors ${
              side === "client"
                ? "bg-orange-600/30 text-orange-300"
                : "bg-neutral-700/30 text-neutral-400 hover:bg-neutral-600/40"
            }`}
            title="Switch to Client execution"
          >
            Client
          </button>

          <button
            onClick={formatCode}
            className="text-[.6vw] px-[.5vw] py-[.2vh] bg-blue-600/20 hover:bg-blue-600/30 rounded text-blue-400 transition-colors"
            title="Format code (Ctrl+S)"
          >
            Format
          </button>
          <button
            onClick={executeCode}
            className="text-[.6vw] px-[.5vw] py-[.2vh] bg-green-600/20 hover:bg-green-600/30 rounded text-green-400 transition-colors"
            title="Run code (F5 or Ctrl+Enter)"
          >
            Run
          </button>
        </div>
      </div>

      <div className="flex-1 relative">
        <Editor
          height="100%"
          defaultLanguage="typescript"
          language="typescript"
          value={code}
          onChange={handleEditorChange}
          onMount={handleEditorDidMount}
          theme="vs-dark"
          options={
            editorOptions as unknown as editor.IStandaloneEditorConstructionOptions
          }
          loading={null}
        />
      </div>

      <div className="flex justify-between items-center px-[.5vw] py-[.3vh] bg-neutral-800/50 text-[.5vw] text-neutral-400 border-t-[0.1vh] border-neutral-700/20">
        <span>JavaScript</span>
        <div className="flex gap-[.8vw]">
          <span>F5: Run</span>
          <span>Ctrl+Enter: Run</span>
          <span>Ctrl+S: Format</span>
        </div>
      </div>
    </div>
  );
};
