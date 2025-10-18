import type { Notification, NotifyType } from "@/utils/types";
import { useState, useCallback, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const timers = useRef<Record<string, NodeJS.Timeout>>({});

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    if (timers.current[id]) {
      clearTimeout(timers.current[id]);
      delete timers.current[id];
    }
  }, []);

  const addNotification = useCallback(
    (type: NotifyType, title: string, message: string, duration = 5000) => {
      const id = uuidv4();
      const newNotification: Notification = {
        id,
        type,
        title,
        message,
        timestamp: Date.now(),
      };

      setNotifications((prev) => [...prev, newNotification]);

      timers.current[id] = setTimeout(() => {
        removeNotification(id);
      }, duration);
    },
    [removeNotification]
  );

  const clearNotificationsByType = useCallback((type: NotifyType) => {
    setNotifications((prev) => prev.filter((n) => n.type !== type));
  }, []);

  return {
    notifications,
    addNotification,
    removeNotification,
    clearNotificationsByType,
  };
};
