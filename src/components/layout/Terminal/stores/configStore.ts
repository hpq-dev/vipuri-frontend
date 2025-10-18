import { create } from "zustand";

interface ConfigState {
  DEFAULT_WIDTH: number;
  MIN_WIDTH: number;
  MIN_HEIGHT: number;
  MAX_WIDTH: number;
  MAX_HEIGHT: number;
  RESIZE_HANDLE_SIZE: number;
  SCREEN_MARGIN: number;
  OPEN_KEY: string;
}

export const useConfigStore = create<ConfigState>()(() => ({
  DEFAULT_WIDTH: 25,
  MIN_WIDTH: 25,
  MIN_HEIGHT: 25,
  MAX_WIDTH: 58,
  MAX_HEIGHT: 98,
  RESIZE_HANDLE_SIZE: 8,
  SCREEN_MARGIN: 1,
  OPEN_KEY: "F2",
}));
