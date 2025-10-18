import React, { useEffect, useRef, useMemo, useCallback } from "react";
import {
  useTerminalStore,
  useCommandStore,
  useConfigStore,
  useEditorStore,
} from "./stores";
import { useTerminalResize } from "./hooks/useTerminalResize";
import { OutputPane } from "./components/OutputPane";
import { InputLine } from "./components/InputLine";
import { Header } from "./components/Header";
import { useCommonStore } from "@/stores"; 
import { isGameEnv } from "@/utils/helpers";
import { CodeEditor } from "./components/CodeEditor";
 

export const Terminal: React.FC = () => {
  const terminalRef = useRef<HTMLDivElement | null>(null);
  const config = useConfigStore();
  const { log } = useCommandStore();
  const { ability } = useCommonStore();

  const {
    position,
    size,
    isOpen,
    setIsOpen,
    isHidden,
    toggleHide,
    isResizeLocked,
    hoverZone,
    isTerminalHidden,
  } = useTerminalStore();

  const { isEditorOpen } = useEditorStore();

  const dimensions = useMemo(() => {
    const editorWidth = isEditorOpen ? 40 : 0;
    return {
      containerWidth: size.width + editorWidth,
      editorWidth,
      terminalWidth: size.width,
    };
  }, [size.width, isEditorOpen]);

  useEffect(() => {
    if (!isGameEnv()) return;

    const nativeConsoleMapper = {
      log: (input: unknown) => log(input, "info"),
      info: (input: unknown) => log(input, "info"),
      error: (input: unknown) => log(input, "error"),
      warn: (input: unknown) => log(input, "warn"),
    } as const;

    const originalConsoleFns: Partial<
      Record<keyof typeof nativeConsoleMapper, typeof console.log>
    > = {};

    for (const key of Object.keys(
      nativeConsoleMapper
    ) as (keyof typeof nativeConsoleMapper)[]) {
      originalConsoleFns[key] = console[key];
    }

    for (const [key, fn] of Object.entries(nativeConsoleMapper) as [
      keyof typeof nativeConsoleMapper,
      (...input: unknown[]) => void
    ][]) {
      console[key] = (...args: unknown[]) => {
        originalConsoleFns[key]?.(...args);
        fn(...args);
      };
    }
 

    return () => {
      for (const key of Object.keys(
        nativeConsoleMapper
      ) as (keyof typeof nativeConsoleMapper)[]) {
        if (originalConsoleFns[key]) {
          console[key] = originalConsoleFns[key]!;
        }
      } 
    };
  }, [log]);

  useEffect(() => {
    if (!ability.can("openTerminal", "game")) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key.toUpperCase() !== config.OPEN_KEY) return;
      event.preventDefault();
      if (isTerminalHidden) {
        toggleHide(); 
      } else {
        setIsOpen(!isOpen); 
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    isOpen,
    setIsOpen,
    config.OPEN_KEY,
    ability,
    isTerminalHidden,
    toggleHide,
    isHidden,
  ]);

  useTerminalResize(terminalRef);

  const handleResizeStart = useCallback(() => {
    if (isEditorOpen) {
      const editorContainer = document.querySelector(
        ".monaco-editor-container"
      );
      if (editorContainer) {
        (editorContainer as HTMLElement).style.display = "none";
      }
    }
  }, [isEditorOpen]);

  const handleResizeEnd = useCallback(() => {
    if (isEditorOpen) {
      const editorContainer = document.querySelector(
        ".monaco-editor-container"
      );
      if (editorContainer) {
        (editorContainer as HTMLElement).style.display = "block";
        window.dispatchEvent(new Event("resize"));
      }
    }
  }, [isEditorOpen]);

  useEffect(() => {
    const handleMouseDown = () => {
      handleResizeStart();
    };

    const handleMouseUp = () => {
      handleResizeEnd();
    };

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleResizeStart, handleResizeEnd]);

  const terminalStyle = {
    top: `${position.y}vh`,
    right: `${config.SCREEN_MARGIN}vw`,
    width: `${dimensions.containerWidth}vw`,
    height: `${size.height}vh`,
    opacity: isHidden ? 0.5 : 1,
    pointerEvents: isHidden ? "none" : "auto",
    willChange: "transform",
  } as React.CSSProperties;

  const cursor = isHidden
    ? "default"
    : hoverZone === "resize-left" && !isResizeLocked
    ? "ew-resize"
    : hoverZone === "resize-bottom" && !isResizeLocked
    ? "ns-resize"
    : hoverZone === "resize-corner" && !isResizeLocked
    ? "nwse-resize"
    : "";

  return (
    isOpen && (
      <>
        <style>{`body{cursor:${cursor}!important}`}</style>

        <div
          ref={terminalRef}
          className={`fixed bg-neutral-900/95 text-white flex flex-row select-none shadow-2xl border-y-[0.1vh] border-x-[0.1vw] border-neutral-700/50 rounded-[.7vh] overflow-hidden z-[999999] transition-opacity duration-300`}
          style={terminalStyle}
        >
          {isEditorOpen && (
            <div
              className="flex-shrink-0"
              style={{
                width: `${dimensions.editorWidth}vw`,
                height: "100%",
                contain: "layout style paint",
              }}
            >
              <CodeEditor />
            </div>
          )}

          <div
            className="flex-1 flex flex-col relative"
            style={{
              width: `${dimensions.terminalWidth}vw`,
              height: "100%",
              contain: "layout style paint",
            }}
          >
            {!isHidden && !isResizeLocked && (
              <>
                <div
                  className="absolute left-0 top-0 bottom-0 bg-transparent z-10"
                  style={{ width: config.RESIZE_HANDLE_SIZE }}
                  data-resize-handle="left"
                />
                <div
                  className="absolute left-0 right-0 bottom-0 bg-transparent z-10"
                  style={{ height: config.RESIZE_HANDLE_SIZE }}
                  data-resize-handle="bottom"
                />
                <div
                  className="absolute left-0 bottom-0 bg-transparent z-10"
                  style={{
                    width: config.RESIZE_HANDLE_SIZE,
                    height: config.RESIZE_HANDLE_SIZE,
                  }}
                  data-resize-handle="corner"
                />
              </>
            )}

            <Header className="relative z-20" />

            <div className="flex-1 flex flex-col min-h-[0vh]">
              <OutputPane />
              {!isHidden && <InputLine />}
            </div>
          </div>
        </div>
      </>
    )
  );
};
