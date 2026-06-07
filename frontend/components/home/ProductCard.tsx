import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

interface ProductCardProps {
  name: string;
  category: string;
  quantity: number;
  expirationDate: string;
  status: "ativo" | "consumido" | "descartado";
}

const getCategoryIcon = (
  category: string
) => {
  switch (category) {
    case "Bebida":
      return "cup-water";

    case "Fruta":
      return "food-apple";

    case "Legume":
      return "carrot";

    case "Laticínio":
      return "glass-mug";

    case "Proteína":
      return "food-steak";

    case "Padaria":
      return "bread-slice";

    case "Congelado":
      return "snowflake";

    default:
      return "package-variant";
  }
};

export default function ProductCard({
  name,
  category,
  quantity,
  expirationDate,
  status,
}: ProductCardProps) {
  return (
    <View style={styles.card}>

        <View style={styles.header}>

            <View style={styles.iconContainer}>
            <MaterialCommunityIcons
                name={getCategoryIcon(category)}
                size={28}
                color="#22C55E"
            />
            </View>

            <View style={styles.info}>

            <Text style={styles.name}>
                {name}
            </Text>

            <View style={styles.categoryBadge}>
                <Text style={styles.categoryBadgeText}>
                {category}
                </Text>
            </View>

            </View>

        </View>

        <View style={styles.details}>

            <View style={styles.detailRow}>
            <MaterialCommunityIcons
                name="package-variant-closed"
                size={18}
                color="#6B7280"
            />

            <Text style={styles.detail}>
                {quantity} unidade(s)
            </Text>
            </View>

            <View style={styles.detailRow}>
            <MaterialCommunityIcons
                name="calendar-outline"
                size={18}
                color="#6B7280"
            />

            <Text style={styles.detail}>
                {expirationDate}
            </Text>
            </View>

        </View>

        {status === "ativo" && (
            <View style={styles.actions}>

            <TouchableOpacity
                style={styles.consumeButton}
            >
                <Text style={styles.consumeText}>
                Consumir
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.discardButton}
            >
                <Text style={styles.discardText}>
                Descartar
                </Text>
            </TouchableOpacity>

            </View>
        )}

    </View>
  );
}

const styles = StyleSheet.create({

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 6,

    elevation: 3,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: "#DCFCE7",
    justifyContent: "center",
    alignItems: "center",
  },

  info: {
    marginLeft: 12,
  },

  categoryBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#DCFCE7",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    marginTop: 6,
  },

  categoryBadgeText: {
    color: "#166534",
    fontSize: 12,
    fontWeight: "600",
  },

  name: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111827",
  },

  details: {
    marginTop: 18,
    gap: 10,
  },

  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  detail: {
    fontSize: 14,
    color: "#374151",
  },

  actions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 16,
  },

  consumeButton: {
    flex: 1,
    backgroundColor: "#22C55E",
    borderRadius: 14,
    paddingVertical: 13,
    alignItems: "center",
  },

  consumeText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },

  discardButton: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: "#EF4444",
    borderRadius: 14,
    paddingVertical: 13,
    alignItems: "center",
  },

  discardText: {
    color: "#EF4444",
    fontWeight: "600",
  },

});