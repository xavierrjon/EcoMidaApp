export interface Notification {
  id: string;
  productName: string;
  message: string;
  type: "expired" | "today" | "warning";
}