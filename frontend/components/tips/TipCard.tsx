import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { MaterialCommunityIcons }
  from "@expo/vector-icons";

interface TipCardProps {
  title: string;
  category: string;
  description: string;
  readingTime: string;
  onPress: () => void;
}

export default function TipCard({
  title,
  category,
  description,
  readingTime,
  onPress,
}: TipCardProps) {

  const getCategoryIcon = () => {
    switch (category) {
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

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.9}
      onPress={onPress}
    >
      <View style={styles.categoryContainer}>
        <MaterialCommunityIcons
          name={
            getCategoryIcon()
          }
          size={18}
          color="#22C55E"
        />

        <Text style={styles.category}>
          {category}
        </Text>
      </View>

      <Text style={styles.title}>
        {title}
      </Text>

      <Text style={styles.description}>
        {description}
      </Text>

      <View style={styles.footer}>
        <View style={styles.readingContainer}>
          <MaterialCommunityIcons
            name="book-open-page-variant-outline"
            size={16}
            color="#6B7280"
          />

          <Text
            style={styles.readingTime}
          >
            {readingTime}
          </Text>
        </View>

        <MaterialCommunityIcons
          name="arrow-right"
          size={22}
          color="#22C55E"
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",

    borderRadius: 22,

    padding: 20,

    marginBottom: 16,

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.04,

    shadowRadius: 6,

    elevation: 2,
  },

  categoryContainer: {
    flexDirection: "row",
    alignItems: "center",

    alignSelf: "flex-start",

    backgroundColor: "#DCFCE7",

    paddingHorizontal: 12,
    paddingVertical: 6,

    borderRadius: 999,
  },

  category: {
    marginLeft: 6,

    fontSize: 12,
    fontWeight: "700",

    color: "#166534",
  },

  title: {
    marginTop: 16,

    fontSize: 20,
    fontWeight: "700",

    color: "#111827",
  },

  description: {
    marginTop: 10,

    fontSize: 15,

    lineHeight: 24,

    color: "#6B7280",
  },

  footer: {
    marginTop: 18,

    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",
  },

  readingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  readingTime: {
    marginLeft: 6,

    fontSize: 13,
    fontWeight: "600",

    color: "#6B7280",
  },
});