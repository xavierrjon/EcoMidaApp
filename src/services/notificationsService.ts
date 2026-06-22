import { Notification } from "@/types/notification";
import { Product } from "@/types/product";

export const notificationsService = {
  generate(products: Product[]): Notification[] {
    const notifications: Notification[] = [];

    const today = new Date();

    products.forEach((product) => {
      if (product.status !== "ativo") {
        return;
      }

      const [day, month, year] = product.expirationDate.split("/");

      const expirationDate = new Date(
        Number(year),
        Number(month) - 1,
        Number(day),
      );

      const diffTime = expirationDate.getTime() - today.getTime();

      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays < 0) {
        notifications.push({
          id: product.id,
          productName: product.name,
          message: `Vencido há ${Math.abs(diffDays)} dia(s)`,
          type: "expired",
        });
      } else if (diffDays === 0) {
        notifications.push({
          id: product.id,
          productName: product.name,
          message: "Vence hoje",
          type: "today",
        });
      } else if (diffDays <= 7) {
        notifications.push({
          id: product.id,
          productName: product.name,
          message: `Vence em ${diffDays} dia(s)`,
          type: "warning",
        });
      }
    });

    return notifications;
  },
};
