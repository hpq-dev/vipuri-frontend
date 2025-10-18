import type { Position, Size, InteractionMode } from "../types";
import { subscribeWithSelector } from "zustand/middleware";
import { create } from "zustand";

interface TerminalState {
  position: Position;
  size: Size;

  isOpen: boolean;
  isHidden: boolean;
  isTerminalHidden: boolean;
  isResizeLocked: boolean;

  interactionMode: InteractionMode;
  hoverZone: InteractionMode;

  setPosition: (position: Position) => void;
  setSize: (size: Size) => void;
  setIsOpen: (isOpen: boolean) => void;
  setIsHidden: (hidden: boolean) => void;
  setIsResizeLocked: (locked: boolean) => void;
  setInteractionMode: (mode: InteractionMode) => void;
  setHoverZone: (zone: InteractionMode) => void;
  toggleResizeLock: () => void;
  toggleHide: () => void;
  toggleTerminalHidden: () => void;
  reset: () => void;
}

const INITIAL_STATE = {
  position: { x: 74, y: 1 },
  size: { width: 25, height: 98 },
  isOpen: false,
  isHidden: false,
  isTerminalHidden: false,
  isResizeLocked: false,
  interactionMode: null as InteractionMode,
  hoverZone: null as InteractionMode,
} as const satisfies Partial<TerminalState>;

export const useTerminalStore = create<TerminalState>()(
  subscribeWithSelector((set) => ({
    ...INITIAL_STATE,

    setPosition: (position) => set({ position }),
    setSize: (size) => set({ size }),
    setIsOpen: (isOpen) => set({ isOpen }),
    setIsHidden: (isHidden) => set({ isHidden }),
    setIsResizeLocked: (isResizeLocked) => set({ isResizeLocked }),
    setInteractionMode: (interactionMode) => set({ interactionMode }),
    setHoverZone: (hoverZone) => set({ hoverZone }),

    toggleResizeLock: () =>
      set((state) => ({ isResizeLocked: !state.isResizeLocked })),
    toggleHide: () => set((state) => ({ isHidden: !state.isHidden })),
    toggleTerminalHidden: () =>
      set((state) => ({ isTerminalHidden: !state.isTerminalHidden })),

    reset: () => set(INITIAL_STATE),
  }))
);
