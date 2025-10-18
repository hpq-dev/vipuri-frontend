import type { Notification, NotifyType } from "@/utils/types";
import { BellIcon } from "@/utils/icons/hud";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";

interface NotifyProps {
  notifications: Notification[];
}

const descriptionColorByType: Record<NotifyType, string> = {
  error: "text-error/50",
  warning: "text-warning/50",
  success: "text-success/50",
};

const textColorByType: Record<NotifyType, string> = {
  error: "text-error",
  warning: "text-warning",
  success: "text-success",
};

const bgColorByType: Record<NotifyType, string> = {
  error: "bg-error",
  warning: "bg-warning",
  success: "bg-success",
};

export const Notify: React.FC<NotifyProps> = ({ notifications }) => {
  // Create a unique key for each notification based on type, title, and message
  const createNotificationKey = (notification: Notification): string => {
    return `${notification.type}|${notification.title}|${notification.message}`;
  };

  // Group notifications by their unique combination of type, title, and message
  const grouped = notifications.reduce<Record<string, Notification[]>>(
    (acc, notification) => {
      const key = createNotificationKey(notification);
      acc[key] = acc[key] || [];
      acc[key].push(notification);
      return acc;
    },
    {},
  );

  // Get all groups that have notifications
  const groupsWithNotifications = Object.keys(grouped).filter(
    (key) => grouped[key]?.length > 0,
  );

  return (
    <div className="absolute left-0 top-[2vh] z-[9999] flex w-full items-center justify-center">
      <div className="flex w-[20vw] flex-col gap-[1vh]">
        <AnimatePresence initial={false}>
          {groupsWithNotifications.map((groupKey) => {
            const items = grouped[groupKey];
            const latest = items[items.length - 1];
            const count = items.length;

            return (
              <motion.div
                key={groupKey}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3 }}
                layout
                className="relative flex w-full p-[0.5vh] rounded-[1vh] bg-dark-300 shadow-sm shadow-black/30"
              >
                <div className="flex w-full items-center justify-start gap-[1vw]">
                  <div className="flex h-full w-[2vw] flex-shrink-0 items-center justify-center rounded-[0.8vh] bg-dark-200">
                    <BellIcon
                      className={`h-full w-[1.4vw] ${textColorByType[latest.type]}`}
                    />
                  </div>

                  <div className="flex flex-grow flex-col justify-center gap-[0.1vh] py-[1vh]">
                    <h1
                      className={`text-[0.9vw] font-bold uppercase italic ${textColorByType[latest.type]}`}
                    >
                      {latest.title}
                    </h1>
                    <p
                      className={`text-[0.6vw] italic ${descriptionColorByType[latest.type]}`}
                    >
                      {latest.message}
                    </p>
                  </div>
                </div>

                <div
                  className={`absolute right-[0.2vw] top-[0.4vh] rounded-[0.8vh] px-[0.3vw] py-[0.3vh] ${bgColorByType[latest.type]}`}
                >
                  <h1 className="text-[0.6vw] font-extrabold text-black">
                    {count}X
                  </h1>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};
