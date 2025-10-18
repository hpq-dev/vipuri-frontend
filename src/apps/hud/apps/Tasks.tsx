import { Header } from "@/components/common";
import { useHudStore } from "@/stores/apps";
import { isGameEnv } from "@/utils/helpers"; 
import clsx from "clsx";
import { useEffect } from "react";

interface ITasks {
  identifier: string;
  title: string;
  description: string;
  type: "yellow" | "green" | "red";
  progress: number;
} 

export const Tasks = () => {
  const { registerApp, unregisterApp, tasks, stateApps } = useHudStore();
  const { data, updateTask, addTask, removeTask } = tasks;

  useEffect(() => {
    if (!isGameEnv()) return;
    registerApp?.("Tasks");
    return () => unregisterApp?.("Tasks");
  }, [registerApp, unregisterApp]);

  useEffect(() => {
    if (!isGameEnv()) return;
   
  }, [updateTask, addTask, removeTask]);

  const getColor = (type: ITasks["type"], isBackground = false) =>
    clsx(
      type === "green"
        ? isBackground
          ? "bg-success/20"
          : "bg-success"
        : type === "yellow"
        ? isBackground
          ? "bg-warning/20"
          : "bg-warning"
        : isBackground
        ? "bg-error/20"
        : "bg-error"
    );

  return stateApps.Tasks ? (
    <div className="absolute right-[1.3vw] top-[0vh] flex min-h-[90vh] items-center justify-center">
      <div className="flex flex-col items-end justify-end gap-[1.5vh]">
        {data
          .filter((t) => t.progress < 100 || t.progress === -1)
          .map(({ identifier, title, description, type, progress }) => (
            <div
              key={identifier}
              className="flex max-w-[10vw] flex-col items-end justify-end"
            >
              <Header
                title={title}
                description={description}
                titleClassName={clsx(
                  type === "green"
                    ? "text-success"
                    : type === "yellow"
                    ? "text-warning"
                    : "text-error",
                  "uppercase text-shadow-xs text-[0.75vw]"
                )}
                descriptionClassName={clsx(
                  type === "green"
                    ? "text-success/75"
                    : type === "yellow"
                    ? "text-warning/75"
                    : "text-error/75",
                  "text-[0.6vw]"
                )}
                className="flex items-end justify-end text-end text-shadow-xs"
              />
              {progress !== -1 && (
                <div
                  className={clsx(
                    "mt-[1vh] h-[1vh] w-[3vw] overflow-hidden",
                    getColor(type, true)
                  )}
                >
                  <div
                    className={clsx(
                      "h-full transition-all duration-300",
                      getColor(type)
                    )}
                    style={{ width: `${progress}%` }}
                  />
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  ) : null;
};
