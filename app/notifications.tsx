import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useEffect, useState } from "react";

import { productsService } from "@/services/productsService";

import { notificationsService } from "@/services/notificationsService";

import { Notification } from "@/types/notification";

import { router } from "expo-router";

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    const products = await productsService.getAll();

    const generated = notificationsService.generate(products);

    setNotifications(generated);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialCommunityIcons name="arrow-left" size={26} color="#111827" />
        </TouchableOpacity>

        <Text style={styles.title}>Notificações</Text>
      </View>

      {notifications.length === 0 ? (
        <View style={styles.emptyState}>
          <View style={styles.iconWrapper}>
            <MaterialCommunityIcons
              name="bell-check-outline"
              size={42}
              color="#22C55E"
            />
          </View>

          <Text style={styles.emptyTitle}>Tudo em dia</Text>

          <Text style={styles.emptyDescription}>
            Nenhum alimento próximo do vencimento.
          </Text>
        </View>
      ) : (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View
                style={[
                  styles.iconCircle,
                  item.type === "expired"
                    ? styles.expiredCircle
                    : styles.warningCircle,
                ]}
              >
                <MaterialCommunityIcons
                  name={
                    item.type === "expired" ? "alert-circle" : "clock-alert"
                  }
                  size={22}
                  color={item.type === "expired" ? "#DC2626" : "#F59E0B"}
                />
              </View>

              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.productName}</Text>

                <Text style={styles.cardMessage}>{item.message}</Text>
              </View>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    paddingHorizontal: 24,
    paddingTop: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#111827",
  },

  listContent: {
    padding: 24,
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 6,

    elevation: 2,
  },

  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },

  expiredCircle: {
    backgroundColor: "#FEE2E2",
  },

  warningCircle: {
    backgroundColor: "#FEF3C7",
  },

  cardContent: {
    flex: 1,
    marginLeft: 12,
  },

  cardTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
  },

  cardMessage: {
    marginTop: 4,
    color: "#6B7280",
    fontSize: 14,
    lineHeight: 20,
  },

  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },

  iconWrapper: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: "#DCFCE7",
    justifyContent: "center",
    alignItems: "center",
  },

  emptyTitle: {
    marginTop: 16,
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },

  emptyDescription: {
    marginTop: 8,
    fontSize: 15,
    color: "#6B7280",
    textAlign: "center",
  },
});
