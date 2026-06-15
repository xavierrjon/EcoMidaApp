import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import {
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import { router } from "expo-router";

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
        >
          <MaterialCommunityIcons
            name="arrow-left"
            size={28}
            color="#111827"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.profileSection}>
        <View style={styles.avatar}>
          <MaterialCommunityIcons
            name="account"
            size={90}
            color="#FFFFFF"
          />
        </View>

        <Text style={styles.name}>
          Usuário
        </Text>

        <Text style={styles.email}>
          usuario@email.com
        </Text>
      </View>

      <View style={styles.menu}>

        <TouchableOpacity
          style={styles.menuItem}
        >
          <MaterialCommunityIcons
            name="account-edit-outline"
            size={24}
            color="#166534"
          />

          <Text style={styles.menuText}>
            Editar Perfil
          </Text>

          <MaterialCommunityIcons
            name="chevron-right"
            size={24}
            color="#9CA3AF"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
        >
          <MaterialCommunityIcons
            name="bell-cog-outline"
            size={24}
            color="#166534"
          />

          <Text style={styles.menuText}>
            Preferências de Alertas
          </Text>

          <MaterialCommunityIcons
            name="chevron-right"
            size={24}
            color="#9CA3AF"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
        >
          <MaterialCommunityIcons
            name="lock-outline"
            size={24}
            color="#166534"
          />

          <Text style={styles.menuText}>
            Alterar Senha
          </Text>

          <MaterialCommunityIcons
            name="chevron-right"
            size={24}
            color="#9CA3AF"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.logoutItem}
        >
          <MaterialCommunityIcons
            name="logout"
            size={24}
            color="#DC2626"
          />

          <Text style={styles.logoutText}>
            Sair da Conta
          </Text>
        </TouchableOpacity>

      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },

  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
  },

  profileSection: {
    alignItems: "center",
    marginTop: 20,
  },

  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,

    backgroundColor: "#22C55E",

    justifyContent: "center",
    alignItems: "center",
  },

  name: {
    marginTop: 18,

    fontSize: 30,
    fontWeight: "700",

    color: "#111827",
  },

  email: {
    marginTop: 6,

    fontSize: 15,

    color: "#6B7280",
  },

  menu: {
    marginTop: 50,
    paddingHorizontal: 24,
    gap: 14,
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "#FFFFFF",

    paddingHorizontal: 18,
    paddingVertical: 18,

    borderRadius: 18,

    elevation: 2,
  },

  menuText: {
    flex: 1,

    marginLeft: 14,

    fontSize: 16,
    fontWeight: "600",

    color: "#111827",
  },

  logoutItem: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "#FEF2F2",

    paddingHorizontal: 18,
    paddingVertical: 18,

    borderRadius: 18,

    marginTop: 12,
  },

  logoutText: {
    marginLeft: 14,

    fontSize: 16,
    fontWeight: "700",

    color: "#DC2626",
  },
});