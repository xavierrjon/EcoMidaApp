import { favoritesService } from "@/services/favoritesService";
import { tipsService } from "@/services/tipsService";
import { Tip } from "@/types/tips";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TipDetailsScreen() {
  const { id } = useLocalSearchParams();
  const [isFavorite, setIsFavorite] = useState(false);
  const [tip, setTip] = useState<Tip | null>(null);

  useEffect(() => {
    loadTip();
    loadFavorite();
  }, []);

  const loadFavorite = async () => {
    const favorite = await favoritesService.isFavorite(String(id));
    setIsFavorite(favorite);
  };

  const loadTip = async () => {
    const data = await tipsService.getById(String(id));
    if (data) {
      setTip(data);
    }
  };

  const handleFavorite = async () => {
    await favoritesService.toggleFavorite(String(id));
    setIsFavorite((previous) => !previous);
  };

  const getCategoryIcon = () => {
    switch (tip?.category) {
      case "Conservação":
        return "food-apple-outline";
      case "Geladeira":
        return "fridge-outline";
      case "Congelamento":
        return "snowflake";
      case "Aproveitamento":
        return "recycle";
      default:
        return "lightbulb-outline";
    }
  };

  if (!tip) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text>Carregando dica...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.hero}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialCommunityIcons name="arrow-left" size={28} color="#FFFFFF" />
        </TouchableOpacity>

        <View style={styles.heroContent}>
          <View style={styles.categoryBadge}>
            <MaterialCommunityIcons
              name={getCategoryIcon()}
              size={16}
              color="#166534"
            />
            <Text style={styles.categoryText}>{tip.category}</Text>
          </View>

          <Text style={styles.title}>{tip.title}</Text>

          <Text style={styles.meta}>
            {tip.createdAt ?? "20/04/2026"} • {tip.readingTime ?? "3 min"}
          </Text>

          <Text style={styles.summary}>{tip.description}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.favoriteButton} onPress={handleFavorite}>
        <MaterialCommunityIcons
          name={isFavorite ? "heart" : "heart-outline"}
          size={22}
          color="#EF4444"
        />
        <Text style={styles.favoriteText}>
          {isFavorite ? "Favorito" : "Favoritar"}
        </Text>
      </TouchableOpacity>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.articleCard}>
          <Text style={styles.sectionTitle}>📖 Conteúdo</Text>

          <Text style={styles.text}>{tip.content}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  hero: {
    backgroundColor: "#22C55E",
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 60,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  heroContent: {
    marginTop: 28,
  },
  categoryBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "#DCFCE7",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
  },
  categoryText: {
    marginLeft: 6,
    fontSize: 12,
    fontWeight: "700",
    color: "#166534",
  },
  title: {
    marginTop: 18,
    fontSize: 30,
    fontWeight: "700",
    lineHeight: 38,
    color: "#FFFFFF",
  },
  meta: {
    marginTop: 12,
    color: "#FFFFFF",
    opacity: 0.9,
    fontSize: 14,
  },
  summary: {
    marginTop: 18,
    color: "#FFFFFF",
    fontSize: 16,
    lineHeight: 26,
    opacity: 0.95,
  },
  favoriteButton: {
    alignSelf: "center",
    marginTop: -25,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 999,
    elevation: 4,
  },
  favoriteText: {
    marginLeft: 8,
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  articleCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 24,
    marginBottom: 40,
    elevation: 2,
  },
  section: {},
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 16,
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 28,
    color: "#6B7280",
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 24,
  },
  text: {
    fontSize: 17,
    lineHeight: 34,
    letterSpacing: 0.2,
    color: "#374151",
  },
});
