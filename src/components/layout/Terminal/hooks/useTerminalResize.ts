import React, { useCallback, useEffect } from "react";
import { useTerminalStore, useConfigStore, useEditorStore } from "../stores";
import type { InteractionMode } from "../types";

export const useTerminalResize = (
  terminalRef: React.RefObject<HTMLDivElement | null>
) => {
  const config = useConfigStore();
  const {
    position,
    size,
    setSize,
    isResizeLocked,
    interactionMode,
    setInteractionMode,
    setHoverZone,
  } = useTerminalStore();

  const pxToVw = useCallback(
    (px: number) => (px / window.innerWidth) * 100,
    []
  );
  const pxToVh = useCallback(
    (px: number) => (px / window.innerHeight) * 100,
    []
  );

  const getInteractionZone = useCallback(
    (e: MouseEvent): InteractionMode => {
      if (!terminalRef.current || isResizeLocked) return null;

      const rect = terminalRef.current.getBoundingClientRect();
      const leftEdge = e.clientX - rect.left <= config.RESIZE_HANDLE_SIZE;
      const bottomEdge = rect.bottom - e.clientY <= config.RESIZE_HANDLE_SIZE;

      if (leftEdge && bottomEdge) return "resize-corner";
      if (leftEdge) return "resize-left";
      if (bottomEdge) return "resize-bottom";

      return null;
    },
    [isResizeLocked, config.RESIZE_HANDLE_SIZE, terminalRef]
  );

  const handleMouseDown = useCallback(
    (e: MouseEvent) => {
      if (!terminalRef.current) return;
      const zone = getInteractionZone(e);
      if (!zone) return;

      e.preventDefault();
      e.stopPropagation();

      setInteractionMode(zone);

      const current = terminalRef.current;
      current._initialWidth = size.width;
      current._initialHeight = size.height;
      current._initialX = position.x;
      current._initialY = position.y;
      current._startX = e.clientX;
      current._startY = e.clientY;
    },
    [getInteractionZone, setInteractionMode, size, position, terminalRef]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (interactionMode) return;
      const zone = getInteractionZone(e);
      setHoverZone(zone);
    },
    [interactionMode, getInteractionZone, setHoverZone]
  );

  const handleMouseLeave = useCallback(() => {
    if (!interactionMode) setHoverZone(null);
  }, [interactionMode, setHoverZone]);

  const handleResizeMove = useCallback(
    (e: MouseEvent) => {
      if (!interactionMode?.startsWith("resize") || !terminalRef.current)
        return;

      const current = terminalRef.current;
      const { _startX, _startY, _initialWidth, _initialHeight } = current;

      const deltaX = e.clientX - (_startX ?? 0);
      const deltaY = e.clientY - (_startY ?? 0);

      let newWidth = _initialWidth ?? size.width;
      let newHeight = _initialHeight ?? size.height;

      if (
        interactionMode === "resize-left" ||
        interactionMode === "resize-corner"
      ) {
        const w = (_initialWidth ?? 0) - pxToVw(deltaX);
        newWidth = Math.max(
          config.MIN_WIDTH,
          Math.min(
            useEditorStore.getState().isEditorOpen ? config.MAX_WIDTH : 98,
            w
          )
        );
      }

      if (
        interactionMode === "resize-bottom" ||
        interactionMode === "resize-corner"
      ) {
        const h = (_initialHeight ?? 0) + pxToVh(deltaY);
        newHeight = Math.max(config.MIN_HEIGHT, Math.min(config.MAX_HEIGHT, h));
      }

      setSize({ width: newWidth, height: newHeight });
    },
    [interactionMode, size, setSize, config, terminalRef, pxToVw, pxToVh]
  );

  const handleResizeEnd = useCallback(() => {
    setInteractionMode(null);
  }, [setInteractionMode]);

  useEffect(() => {
    if (!interactionMode?.startsWith("resize")) return;

    document.addEventListener("mousemove", handleResizeMove, {
      passive: false,
    });
    document.addEventListener("mouseup", handleResizeEnd, { passive: false });

    return () => {
      document.removeEventListener("mousemove", handleResizeMove);
      document.removeEventListener("mouseup", handleResizeEnd);
    };
  }, [interactionMode, handleResizeMove, handleResizeEnd]);

  useEffect(() => {
    const terminal = terminalRef.current;
    if (!terminal) return;

    terminal.addEventListener("mousedown", handleMouseDown, { passive: false });
    terminal.addEventListener("mousemove", handleMouseMove, { passive: false });
    terminal.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      terminal.removeEventListener("mousedown", handleMouseDown);
      terminal.removeEventListener("mousemove", handleMouseMove);
      terminal.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [
    handleMouseDown,
    handleMouseMove,
    handleMouseLeave,
    terminalRef,
    isResizeLocked,
  ]);
};
