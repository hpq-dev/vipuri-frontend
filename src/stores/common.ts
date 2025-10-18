import {
  createMongoAbility,
  type MongoAbility,
  type MongoQuery,
  type RawRuleOf,
} from "@casl/ability";
import { create } from "zustand"; 

interface CommonStore {
  sideBar: boolean;
  activeApps: string[];
  closableApps: string[];
  zOrder: string[];
  ability: ReturnType<
    typeof createMongoAbility<
      [string, any],
      MongoQuery
    >
  >;
  user: any;
  items: any;

  setAppStatus: (app: string, status: boolean) => void;
  focusApp: (app: string) => void;
  toggleSideBar: () => void;
  setPermissions: (
    rules: RawRuleOf<
      MongoAbility<[string, any], MongoQuery>
    >[]
  ) => void;
  setUser: (user: any) => void;
  setItems: (
    items: (any)[]
  ) => void;
  addAppToClosable: (appName: string) => void;
}

export const useCommonStore = create<CommonStore>((set) => ({
  sideBar: false,
  activeApps: [],
  closableApps: [],
  zOrder: [],
  ability: createMongoAbility(),
  user: null,
  items: [],

  setAppStatus: (app, status) =>
    set((state) => {
      let nextActive = state.activeApps;
      let nextZOrder = state.zOrder;

      if (status) {
        if (!state.activeApps.includes(app)) {
          nextActive = [...state.activeApps, app];
          nextZOrder = [...state.zOrder.filter((a) => a !== app), app];
        }
      } else {
        nextActive = state.activeApps.filter((a) => a !== app);
        nextZOrder = state.zOrder.filter((a) => a !== app);
      }

      return { activeApps: nextActive, zOrder: nextZOrder };
    }),

  focusApp: (app) =>
    set((state) => ({
      zOrder: [...state.zOrder.filter((a) => a !== app), app],
    })),

  toggleSideBar: () => set((state) => ({ sideBar: !state.sideBar })),

  setPermissions: (rules) => {
    set(() => ({
      ability:
        createMongoAbility<
          MongoAbility<[string, any], MongoQuery>
        >(rules),
    }));
  },

  setUser: (user) => {
    set(() => ({
      user,
    }));
  },

  setItems: (items) => {
    console.log(items);
    set(() => ({
      items,
    }));
  },

  addAppToClosable: (appName) => {
    set(({ closableApps }) => ({
      closableApps: [...closableApps, appName],
    }));
  },
}));
