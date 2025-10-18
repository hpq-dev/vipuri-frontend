export type InteractionMode =
  | null
  | "resize-left"
  | "resize-bottom"
  | "resize-corner"
  | "drag";
export type TerminalState = "normal";

export interface Position {
  x: number;
  y: number;
}
export interface Size {
  width: number;
  height: number;
}

export interface DragState {
  isDragging: boolean;
  startX: number;
  startY: number;
  initialX: number;
  initialY: number;
}
export interface ResizeState {
  isResizing: boolean;
  startX: number;
  startY: number;
  initialWidth: number;
  initialHeight: number;
}

export type LogLevel = "info" | "warn" | "error";
export type LogEntry = {
  level: "info" | "warn" | "error";
  value: unknown;
  timestamp: string;
};

export {};

declare global {
  interface Element {
    _startX?: number;
    _startY?: number;
    _initialWidth?: number;
    _initialHeight?: number;
    _initialX?: number;
    _initialY?: number;
    _dragStartX?: number;
    _dragStartY?: number;
  }
}
