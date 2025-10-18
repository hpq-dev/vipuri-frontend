import { AppWindow, SideBar, Terminal } from "./components/layout";
import { isDevEnvironment, isGameEnv, showNotify } from "./utils/helpers";
import { type NotifyType } from "@/utils/types";
import { useCommonStore } from "./stores/common";
import { AnimatePresence } from "framer-motion";
import { useNotificationStore } from "./stores";
import React, { useEffect } from "react";
import { Notify, AbilityContext } from "./libs";
import * as apps from "./apps";
import clsx from "clsx"; 

const App: React.FC = () => {
  const notifications = useNotificationStore((state) => state.notifications);
  const activeApps = useCommonStore((state) => state.activeApps);
  const zOrder = useCommonStore((state) => state.zOrder);
  const commonStore = useCommonStore();
 

  return (
    <div
      className={clsx(
        "h-screen w-full select-none",
        !isGameEnv() &&
          isDevEnvironment() &&
          "bg-[url('/background.jpg')] bg-cover"
      )}
    >
      <AbilityContext.Provider value={commonStore.ability}>
        <SideBar />
        <Terminal />
        <AnimatePresence>
          {zOrder
            .filter((appName) => activeApps.includes(appName))
            .map((appName, idx) => {
              const BASE_ZINDEX = 100;
              const zIndex = BASE_ZINDEX + idx;
              const Component = (apps as Record<string, React.FC>)[appName];
              if (!Component) return null;
              return (
                <AppWindow key={appName} name={appName} zIndex={zIndex}>
                  <Component />
                </AppWindow>
              );
            })}
        </AnimatePresence>

        <Notify notifications={notifications} />
      </AbilityContext.Provider>
    </div>
  );
};

export default App;
