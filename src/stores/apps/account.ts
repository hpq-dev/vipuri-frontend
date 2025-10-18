import { create } from "zustand";

type TAccountPage = "login" | "register" | "loading" | "queue";

interface AccountStore {
  page: TAccountPage;
  loading: number;
  registerStep: number;
  data: {
    firstName?: string;
    lastName?: string;
    nationality?: string;
    releasedBy?: string;
    birthDate?: string;
    email: string;
    password: string;
    repeatPassword: string;
    rememberMe?: boolean;
    acceptRules?: boolean;
  };
  setData: (
    updater:
      | AccountStore["data"]
      | ((prev: AccountStore["data"]) => AccountStore["data"]),
  ) => void;
  setLoading: (loading: number) => void;
  setPage: (page: TAccountPage) => void;
  setRegisterStep: (step: number) => void;
}

export const useAccountStore = create<AccountStore>((set) => ({
  page: "loading",
  loading: 0,
  registerStep: 0,
  data: {
    firstName: "",
    lastName: "",
    nationality: "",
    releasedBy: "",
    birthDate: "",
    email: "",
    password: "",
    repeatPassword: "",
    rememberMe: false,
    acceptRules: false,
  },
  setData: (updater) =>
    set((state) => ({
      data: typeof updater === "function" ? updater(state.data) : updater,
    })),
  setLoading: (loading) => set({ loading }),
  setPage: (page) => set({ page }),
  setRegisterStep: (registerStep) => set({ registerStep }),
}));
