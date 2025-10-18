import rightVector from "./assets/right_vector.png";
import leftVector from "./assets/left_vector.png";
import background from "./assets/background.png";
import { useAccountStore } from "@/stores/apps";
import { isGameEnv } from "@/utils/helpers";
import { RPCManager } from "@/utils/rpc";
import { useEffect } from "react";
import * as pages from "./pages";
import clsx from "clsx";

export const Account = () => {
  const accountStore = useAccountStore();

  useEffect(() => {
    if (!isGameEnv()) return;
    RPCManager.registerApp("Account");
    return () => RPCManager.unregisterApp("Account");
  }, []);

  return (
    <div
      className="relative h-full w-full select-none bg-cover bg-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="absolute inset-0 bg-dark-400/50 bg-gradient-to-t from-dark-400 via-dark-400 to-dark-400/95" />

      <img
        src={leftVector}
        alt="left-vector"
        className="pointer-events-none absolute left-[0vh] top-[0vh] h-full object-contain"
      />
      <img
        src={rightVector}
        alt="right-vector"
        className="pointer-events-none absolute right-[0vh] top-[0vh] h-full object-contain"
      />

      <div
        className={clsx(
          "relative z-10 flex items-center justify-center",
          accountStore.page === "register" ? "min-h-screen" : "min-h-[80vh]"
        )}
      >
        <div>
          {Object.entries(pages)
            .filter(
              ([key]) =>
                key.replace("Page", "").toLowerCase() === accountStore.page
            )
            .map(([key, Page]) => (
              <Page key={key} />
            ))}
        </div>
      </div>
    </div>
  );
};
