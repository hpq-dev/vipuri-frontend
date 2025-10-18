export type NotifyType = "error" | "warning" | "success";

export interface Notification {
  id: string;
  type: NotifyType;
  title: string;
  message: string;
  timestamp: number;
}
