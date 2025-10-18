import type { NotifyType } from '@/utils/types';
import { useNotificationStore } from '@/stores';

export const showNotify = (
  type: NotifyType,
  title: string,
  message: string,
  duration?: number
) => {
  useNotificationStore.getState().showNotify(type, title, message, duration);
};
