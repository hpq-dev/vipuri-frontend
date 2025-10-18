import type { Notification, NotifyType } from '@/utils/types';
import { v4 as uuidv4 } from 'uuid';
import { create } from 'zustand';

interface NotificationsState {
  notifications: Notification[];
  showNotify: (
    type: NotifyType,
    title: string,
    message: string,
    duration?: number
  ) => void;
  removeNotification: (id: string) => void;
  clearNotificationsByType: (type: NotifyType) => void;
}

export const useNotificationStore = create<NotificationsState>((set, get) => ({
  notifications: [],
  showNotify: (type, title, message, duration = 5000) => {
    const id = uuidv4();
    const notification: Notification = {
      id,
      type,
      title,
      message,
      timestamp: Date.now(),
    };
    set(state => ({ notifications: [...state.notifications, notification] }));
    setTimeout(() => get().removeNotification(id), duration);
  },
  removeNotification: id =>
    set(state => ({
      notifications: state.notifications.filter(n => n.id !== id),
    })),
  clearNotificationsByType: type =>
    set(state => ({
      notifications: state.notifications.filter(n => n.type !== type),
    })),
}));
