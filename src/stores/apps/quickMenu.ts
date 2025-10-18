 
import { create } from "zustand";

interface IQuickMenuItem {
  label: string;
  identifier: string;
  requiredPermission?: {
    action: string;
    resource: any;
    inverted?: boolean;
  };
  icon?: string;
  children?: IQuickMenuItem[];
}

interface IQuickMenuStore {
  items: IQuickMenuItem[];
  selectedItemIdentifier: string[];
  setItems: (items: IQuickMenuItem[]) => void;
  setSelectedItemIdentifier: (identifier: string[]) => void;
  navigateToSibling: (identifier: string) => void;
  navigateToChild: (identifier: string) => void;
  navigateUp: () => void;
  navigateToRoot: () => void;
  getCurrentItems: () => IQuickMenuItem[];
  getCurrentLevel: () => number;
  canNavigateUp: () => boolean;
  canNavigateToChild: () => boolean;
  getCurrentLabel: () => string | undefined;
  findItemByPath: (path: string[]) => IQuickMenuItem | null;
}

export const useQuickMenuStore = create<IQuickMenuStore>((set, get) => ({
  items: [],
  selectedItemIdentifier: [],

  setItems: (items) => {
    set(() => ({ items }));
  },

  setSelectedItemIdentifier: (identifier) => {
    set(() => ({
      selectedItemIdentifier: identifier,
    }));
  },

  navigateToSibling: (identifier: string) => {
    const current = get().selectedItemIdentifier;
    if (current.length === 0) {
      set({ selectedItemIdentifier: [identifier] });
    } else {
      const newPath = [...current.slice(0, -1), identifier];
      set({ selectedItemIdentifier: newPath });
    }
  },

  navigateToChild: (identifier: string) => {
    const { selectedItemIdentifier: current, canNavigateToChild } = get();
    if (!canNavigateToChild()) return;
    set({ selectedItemIdentifier: [...current, identifier] });
  },

  navigateUp: () => {
    const current = get().selectedItemIdentifier;
    if (current.length > 1) {
      set({ selectedItemIdentifier: current.slice(0, -1) });
    } else if (current.length === 1) {
      set({ selectedItemIdentifier: [] });
    }
  },

  navigateToRoot: () => {
    set({ selectedItemIdentifier: [] });
  },

  getCurrentLevel: () => {
    return get().selectedItemIdentifier.length;
  },

  canNavigateUp: () => {
    return get().selectedItemIdentifier.length > 0;
  },

  findItemByPath: (path: string[]) => {
    const { items } = get();

    if (path.length === 0) return null;

    let currentLevel = items;
    let currentItem: IQuickMenuItem | null = null;

    for (let i = 0; i < path.length; i++) {
      const identifier = path[i];
      currentItem =
        currentLevel.find((item) => item.identifier === identifier) || null;

      if (!currentItem) return null;

      if (i < path.length - 1) {
        if (currentItem.children) {
          currentLevel = currentItem.children;
        } else {
          return null;
        }
      }
    }

    return currentItem;
  },

  canNavigateToChild: () => {
    const { selectedItemIdentifier, findItemByPath } = get();
    if (selectedItemIdentifier.length === 0) return false;
    const currentItem = findItemByPath(selectedItemIdentifier);
    return (currentItem?.children?.length ?? 0) > 0;
  },

  getCurrentItems: () => {
    const { items, selectedItemIdentifier } = get();

    if (selectedItemIdentifier.length === 0) {
      return items;
    }

    let currentLevel = items;

    for (let i = 0; i < selectedItemIdentifier.length - 1; i++) {
      const identifier = selectedItemIdentifier[i];
      const foundItem = currentLevel.find(
        (item) => item.identifier === identifier
      );
      if (foundItem?.children) {
        currentLevel = foundItem.children;
      } else {
        return [];
      }
    }

    return currentLevel;
  },

  getCurrentLabel: () => {
    const { selectedItemIdentifier, findItemByPath } = get();
    if (selectedItemIdentifier.length < 2) return undefined;
    const parentPath = selectedItemIdentifier.slice(0, -1);
    const parentItem = findItemByPath(parentPath);
    return parentItem ? `- ${parentItem.label}` : undefined;
  },
}));
