import { create } from "zustand"; 
 

interface ITasks {
  identifier: string;
  title: string;
  description: string;
  type: "yellow" | "green" | "red";
  progress: number;
}

interface IHudStore {
  activeApps: string[];
  stateApps: Record<string, boolean>;

  chat: {
    messages: {
      message: string;
      category: string;
    }[];
    historyIndex: number | null;
    history: string[];
    tempMessage: string;
    message: string;
    category: string;
    barStatus: boolean;
    categories: {
      id: number;
      name: string;
      key: string;
    }[];

    setMessage: (message: string) => void;
    setTempMessage: (message: string) => void;
    setHistory: (history: string[]) => void;
    setHistoryIndex: (index: number | null) => void;
    addMessage: (message: { message: string; category: string }) => void;
    clearMessages: (category: string) => void;
    toggleBarStatus: (status: boolean) => void;
    setCategory: (category: string) => void;
  };

  meta: {
    rec: boolean;
    safezone: boolean;
    date: string;
    time: string;

    setRec: (rec: boolean) => void;
    setSafezone: (safezone: boolean) => void;
    setDate: (date: string) => void;
    setTime: (time: string) => void;
  };

  tasks: {
    data: ITasks[];
    updateTask: (task: ITasks) => void;
    addTask: (task: ITasks) => void;
    removeTask: (identifier: string) => void;
  };

  info: {
    playersOnline: number;
    playerId: number;

    setPlayersOnline: (playersOnline: number) => void;
    setPlayerId: (playerId: number) => void;
  };

  loading: {
    title: string;
    value: number;
    goal: number;

    update: (title: string, value: number, goal: number) => void;
  };

  speedo: {
    scale: number;
    speed: number;
    toggle: boolean;
    gear: number;
    fuel: number;
    shakeOffset: { x: number; y: number };

    setScale: (scale: number) => void;
    setSpeed: (speed: number) => void;
    setToggle: (toggle: boolean) => void;
    setGear: (gear: number) => void;
    setFuel: (fuel: number) => void;
    setShakeOffset: (offset: { x: number; y: number }) => void;
  };

  minimap: {
    voicerange: number;
    speaking: boolean;
    radio: boolean;

    setSpeaking: (speaking: boolean) => void;
    setVoiceRange(range: number): void;
    setRadio: (radio: boolean) => void;
  };

  keys: {
    keyword: string;
    action: string;
  }[];

  registerKeys: (title: string, name: string) => void;
  unRegisterKeys: (title: string, name: string) => void;
  setAppStatus: (app: string, status: boolean) => void;
  setAppState: (appName: string, state: boolean) => void;
  registerApp?: (appName: string) => void;
  unregisterApp?: (appName: string) => void;
}

export const useHudStore = create<IHudStore>((set) => ({
  activeApps: [],
  stateApps: Object.assign({
    Chat: true,
    Speedo: true,
    Minimap: true,
    Info: true,
    Meta: true,
    Loading: false,
    Tasks: true,
    Keys: true,
    Food: true,
  }),
  chat: {
    messages: [],
    message: "",
    tempMessage: "",
    historyIndex: null,
    history: [],
    category: "Chat",
    barStatus: false,
    categories: [
      {
        id: 0,
        name: "Chat",
        key: "default",
      },
    ],

    setMessage: (message: string) =>
      set((state) => ({ chat: { ...state.chat, message } })),

    clearMessages: (category: string) =>
      set((state) => ({
        chat: {
          ...state.chat,
          messages: state.chat.messages.filter(
            (msg) => msg.category !== category,
          ),
        },
      })),

    setTempMessage: (message: string) =>
      set((state) => ({ chat: { ...state.chat, tempMessage: message } })),

    setHistory: (history: string[]) =>
      set((state) => ({ chat: { ...state.chat, history } })),

    setHistoryIndex: (index: number | null) =>
      set((state) => ({ chat: { ...state.chat, historyIndex: index } })),

    setCategory: (category) =>
      set((state) => ({ chat: { ...state.chat, category } })),

    toggleBarStatus: (status: boolean) =>
      set((state) => ({ chat: { ...state.chat, barStatus: status } })),

    addMessage: (message: { message: string; category: string }) =>
      set((state) => ({
        chat: { ...state.chat, messages: [...state.chat.messages, message] },
      })),
  },

  tasks: {
    data: [],
    updateTask: (task: ITasks) =>
      set((state) => ({
        tasks: {
          ...state.tasks,
          data: state.tasks.data.map((t) =>
            t.identifier === task.identifier ? { ...t, ...task } : t,
          ),
        },
      })),
    addTask: (task: ITasks) =>
      set((state) => ({
        tasks: { ...state.tasks, data: [...state.tasks.data, task] },
      })),
    removeTask: (identifier: string) =>
      set((state) => ({
        tasks: {
          ...state.tasks,
          data: state.tasks.data.filter((t) => t.identifier !== identifier),
        },
      })),
  },

  meta: {
    rec: false,
    safezone: false,
    date: "12.02.2026",
    time: "00:00",

    setRec: (rec: boolean) =>
      set((state) => ({ meta: { ...state.meta, rec } })),
    setSafezone: (safezone: boolean) =>
      set((state) => ({ meta: { ...state.meta, safezone } })),
    setDate: (date: string) =>
      set((state) => ({ meta: { ...state.meta, date } })),
    setTime: (time: string) =>
      set((state) => ({ meta: { ...state.meta, time } })),
  },

  speedo: {
    scale: 1,
    speed: 0,
    toggle: false,
    fuel: 0,
    gear: 0,
    shakeOffset: { x: 0, y: 0 },

    setFuel: (fuel: number) =>
      set((state) => ({
        speedo: {
          ...state.speedo,
          fuel: Math.round((fuel / 100) * 100) / 100,
        },
      })),
    setScale: (scale: number) =>
      set((state) => ({ speedo: { ...state.speedo, scale } })),
    setSpeed: (speed: number) =>
      set((state) => ({ speedo: { ...state.speedo, speed } })),
    setToggle: (toggle: boolean) =>
      set((state) => ({ speedo: { ...state.speedo, toggle } })),

    setGear: (gear: number) =>
      set((state) => ({ speedo: { ...state.speedo, gear } })),
    setShakeOffset: (offset: { x: number; y: number }) =>
      set((state) => ({ speedo: { ...state.speedo, shakeOffset: offset } })),
  },

  minimap: {
    speaking: false,
    radio: false,
    voicerange: 2,
    setVoiceRange: (range: number) => {
      set((state) => ({ minimap: { ...state.minimap, voicerange: range } }));
    },
    setSpeaking: (speaking: boolean) =>
      set((state) => ({ minimap: { ...state.minimap, speaking } })),
    setRadio: (radio: boolean) =>
      set((state) => ({ minimap: { ...state.minimap, radio } })),
  },

  info: {
    playersOnline: 0,
    playerId: 0,

    setPlayersOnline: (playersOnline: number) =>
      set((state) => ({ info: { ...state.info, playersOnline } })),

    setPlayerId: (playerId: number) =>
      set((state) => ({ info: { ...state.info, playerId } })),
  },

  loading: {
    title: "",
    value: 0,
    goal: 0,

    update: (title: string, value: number, goal: number) =>
      set((state) => ({
        loading: { ...state.loading, title, value, goal },
      })),
  },

  keys: [],

  registerKeys: (title: string, name: string) =>
    set((state) => ({
      keys: [...state.keys, { keyword: name, action: title }],
    })),

  unRegisterKeys: (title: string, name: string) =>
    set((state) => ({
      keys: state.keys.filter(
        (key) => key.keyword !== name || key.action !== title,
      ),
    })),

  setAppStatus: (app, status) =>
    set((state) => ({
      activeApps: status
        ? [...state.activeApps, app]
        : state.activeApps.filter((a) => a !== app),
    })),

  setAppState: (appName, toggle) =>
    set((state) => ({
      stateApps: { ...state.stateApps, [appName]: toggle },
    })),

  registerApp: (appName) => { 
  },
  unregisterApp: (appName) => { 
  },
}));
