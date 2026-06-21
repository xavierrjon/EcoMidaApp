import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { useState, useEffect, useCallback } from "react";

import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

import { SafeAreaView } from "react-native-safe-area-context";

import { router } from "expo-router";

import { useFocusEffect } from "@react-navigation/native";

import TipCard from "@/components/tips/TipCard";

import { tipsService } from "@/services/tipsService";

import { favoritesService } from "@/services/favoritesService";

import { Tip } from "@/types/tips";

import { productsService } from "@/services/productsService";

import { notificationsService } from "@/services/notificationsService";

export default function TipsScreen() {
  const [search, setSearch] = useState("");
  const [tips, setTips] = useState<Tip[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    loadTips();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
      loadNotifications();
    }, [])
  );

  const loadTips = async () => {
    const data = await tipsService.getAll();
    setTips(data);
  };

  const [notificationCount,
  setNotificationCount] =
  useState(0);

  const loadFavorites = async () => {
    const data = await favoritesService.getFavorites();
    setFavorites(data);
  };

  const loadNotifications =
  async () => {
    const products =
      await productsService.getAll();

    const notifications =
      notificationsService.generate(
        products
      );

    setNotificationCount(
      notifications.length
    );
  };

  const filteredTips = tips.filter((tip) => {
  const matchesSearch =
    tip.title.toLowerCase().includes(search.toLowerCase()) ||
    tip.description.toLowerCase().includes(search.toLowerCase()) ||
    tip.category.toLowerCase().includes(search.toLowerCase());

  const matchesFavorite = !showFavorites || favorites.includes(tip.id);

  return matchesSearch && matchesFavorite;
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../../assets/images/icon.png")}
          style={styles.icon}
          resizeMode="contain"
        />

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() =>
              router.push("/notifications")
            }
          >
            <MaterialCommunityIcons
              name="bell-outline"
              size={26}
              color="#22C55E"
            />

            {notificationCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  {notificationCount > 9
                    ? "9+"
                    : notificationCount}
                </Text>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => router.push("/profile")}
          >
            <View style={styles.headerAvatarPlaceholder}>
              <MaterialCommunityIcons
                name="account"
                size={16}
                color="#FFFFFF"
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.title}>Dicas</Text>

      <View style={styles.searchRow}>
        <View style={styles.searchContainer}>
          <Feather
            name="search"
            size={20}
            color="#6B7280"
          />
          <TextInput
            placeholder="Buscar dicas..."
            placeholderTextColor="#9CA3AF"
            value={search}
            onChangeText={setSearch}
            style={styles.searchInput}
          />
        </View>

        <TouchableOpacity
          style={[
            styles.favoriteButton,
            showFavorites && styles.favoriteButtonActive,
          ]}
          onPress={() => setShowFavorites(!showFavorites)}
        >
          <MaterialCommunityIcons
            name={showFavorites ? "heart" : "heart-outline"}
            size={24}
            color={showFavorites ? "#EF4444" : "#111827"}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {filteredTips.map((tip) => (
          <TipCard
            key={tip.id}
            title={tip.title}
            category={tip.category}
            description={tip.description}
            readingTime={tip.readingTime}
            onPress={() =>
              router.push({
                pathname: "/tip-details",
                params: {
                  id: tip.id,
                },
              })
            }
          />
        ))}

        {filteredTips.length === 0 && (
          <View style={styles.emptyContainer}>
            <MaterialCommunityIcons
              name="lightbulb-outline"
              size={60}
              color="#22C55E"
            />
            <Text style={styles.emptyTitle}>Nenhuma dica encontrada</Text>
            <Text style={styles.emptyDescription}>
              Tente pesquisar outro termo.
            </Text>
          </View>
        )}
      </ScrollView>
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
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  icon: {
    width: 125,
    height: 45,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  iconButton: {
    padding: 4,
  },
  headerAvatarPlaceholder: {
    width: 28,
    height: 28,
    borderRadius: 19,
    backgroundColor: "#22C55E",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#111827",
    paddingHorizontal: 24,
    marginTop: 20,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 24,
    marginTop: 18,
    gap: 12,
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 54,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    color: "#111827",
  },
  favoriteButton: {
    width: 54,
    height: 54,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
  },
  favoriteButtonActive: {
    backgroundColor: "#FEE2E2",
  },
  content: {
    flex: 1,
    marginTop: 24,
    paddingHorizontal: 24,
  },
  emptyContainer: {
    alignItems: "center",
    marginTop: 80,
  },
  emptyTitle: {
    marginTop: 12,
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },
  emptyDescription: {
    marginTop: 6,
    fontSize: 14,
    color: "#6B7280",
  },

  badge: {
    position: "absolute",

    top: -4,
    right: -6,

    minWidth: 18,
    height: 18,

    borderRadius: 9,

    backgroundColor: "#EF4444",

    justifyContent: "center",
    alignItems: "center",

    paddingHorizontal: 4,
  },

  badgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "700",
  },
});