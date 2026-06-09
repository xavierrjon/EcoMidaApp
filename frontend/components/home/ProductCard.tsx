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

  onConsume?: () => void;
  onDiscard?: () => void;
  onReactivate?: () => void;
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

const getExpirationStatus = (
  expirationDate: string
) => {
  const [day, month, year] =
    expirationDate.split("/");

  const expiration = new Date(
    Number(year),
    Number(month) - 1,
    Number(day)
  );

  const today = new Date();

  today.setHours(0, 0, 0, 0);
  expiration.setHours(0, 0, 0, 0);

  const diffDays = Math.ceil(
    (expiration.getTime() -
      today.getTime()) /
      (1000 * 60 * 60 * 24)
  );

  if (diffDays < 0) {
    return "expired";
  }

  if (diffDays <= 3) {
    return "warning";
  }

  return "valid";
};

export default function ProductCard({
  name,
  category,
  quantity,
  expirationDate,
  status,
  onConsume,
  onDiscard,
  onReactivate,
}: ProductCardProps) {
  const expirationStatus =
    getExpirationStatus(
      expirationDate
    );

  const iconColor =
    expirationStatus === "expired"
      ? "#EF4444"
      : expirationStatus === "warning"
      ? "#F59E0B"
      : "#22C55E";

  const iconBackground =
    expirationStatus === "expired"
      ? "#FEE2E2"
      : expirationStatus === "warning"
      ? "#FEF3C7"
      : "#DCFCE7";

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View
          style={[
            styles.iconContainer,
            {
              backgroundColor:
                iconBackground,
            },
          ]}
        >
          <MaterialCommunityIcons
            name={getCategoryIcon(category)}
            size={28}
            color={iconColor}
          />
        </View>

        <View style={styles.info}>
          <Text style={styles.name}>
            {name}
          </Text>

          <View
            style={[
              styles.categoryBadge,
              {
                backgroundColor:
                  iconBackground,
              },
            ]}
          >
            <Text
              style={[
                styles.categoryBadgeText,
                {
                  color: iconColor,
                },
              ]}
            >
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

        {status === "ativo" &&
          expirationStatus === "warning" && (
            <View style={styles.warningBadge}>
              <MaterialCommunityIcons
                name="clock-alert-outline"
                size={16}
                color="#D97706"
              />

              <Text style={styles.warningBadgeText}>
                Vence em breve
              </Text>
            </View>
        )}

        {status === "ativo" &&
          expirationStatus === "expired" && (
            <View style={styles.expiredBadge}>
              <MaterialCommunityIcons
                name="alert-circle-outline"
                size={16}
                color="#DC2626"
              />

              <Text style={styles.expiredBadgeText}>
                Produto vencido
              </Text>
            </View>
        )}
      </View>

      {status === "ativo" && (
        <View style={styles.actions}>
          <TouchableOpacity
            style={
              styles.consumeButton
            }
            onPress={onConsume}
          >
            <Text
              style={styles.consumeText}
            >
              Consumir
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={
              styles.discardButton
            }
            onPress={onDiscard}
          >
            <Text
              style={styles.discardText}
            >
              Descartar
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {status !== "ativo" && (
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.reactivateButton}
            onPress={onReactivate}
          >
            <Text
              style={
                styles.reactivateText
              }
            >
              Reativar
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
    justifyContent: "center",
    alignItems: "center",
  },

  info: {
    marginLeft: 12,
  },

  categoryBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    marginTop: 6,
  },

  categoryBadgeText: {
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

  warningBadge: {
  alignSelf: "flex-start",
  flexDirection: "row",
  alignItems: "center",

  backgroundColor: "#FEF3C7",

  paddingHorizontal: 10,
  paddingVertical: 6,

  borderRadius: 999,
},

  warningBadgeText: {
    marginLeft: 6,
    color: "#D97706",
    fontWeight: "600",
    fontSize: 12,
  },

  expiredBadge: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "#FEE2E2",

    paddingHorizontal: 10,
    paddingVertical: 6,

    borderRadius: 999,
  },

  expiredBadgeText: {
    marginLeft: 6,
    color: "#DC2626",
    fontWeight: "600",
    fontSize: 12,
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

  reactivateButton: {
    flex: 1,
    backgroundColor: "#14B8A6",
    borderRadius: 14,
    paddingVertical: 13,
    alignItems: "center",
  },

  reactivateText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },

});