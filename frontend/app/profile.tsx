import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import EditProfileModal from "@/components/profile/EditProfileModal";
import ChangePasswordModal from "@/components/profile/ChangePasswordModal";
import NotificationSettingsModal from "@/components/profile/NotificationSettingsModal";
import { useAuth } from "@/contexts/AuthContext";

export default function ProfileScreen() {
  const { user, signOut, updateUser, changePassword } = useAuth();

  const [isEditProfileModalVisible, setIsEditProfileModalVisible] =
    useState(false);
  const [isChangePasswordModalVisible, setIsChangePasswordModalVisible] =
    useState(false);
  const [
    isNotificationSettingsModalVisible,
    setIsNotificationSettingsModalVisible,
  ] = useState(false);

  const [notificationSettings, setNotificationSettings] = useState({
    alertsEnabled: true,
    daysBefore: 3,
    silentMode: false,
  });

  const handleSaveNotificationSettings = (data: {
    alertsEnabled: boolean;
    daysBefore: number;
    silentMode: boolean;
  }) => {
    setNotificationSettings(data);
  };

  const handleUpdateProfile = async (data: { name: string; email: string }) => {
    try {
      await updateUser(data);
      Alert.alert("Sucesso", "Perfil atualizado!");
    } catch (error: any) {
      Alert.alert(
        "Erro",
        error.message || "Não foi possível atualizar o perfil.",
      );
    }
  };

  const handleChangePassword = async (
    currentPassword: string,
    newPassword: string,
  ) => {
    try {
      await changePassword(currentPassword, newPassword);
      Alert.alert("Sucesso", "Senha alterada com sucesso!");
    } catch (error: any) {
      Alert.alert("Erro", error.message || "Não foi possível alterar a senha.");
    }
  };

  const handleLogout = () => {
    Alert.alert("Sair da Conta", "Tem certeza que deseja sair?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Sair",
        style: "destructive",
        onPress: async () => {
          await signOut();
          router.replace("/login");
        },
      },
    ]);
  };

  // Fallback para usuário vazio
  const userData = user || {
    name: "Usuário",
    email: "usuario@email.com",
    photo: null,
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialCommunityIcons name="arrow-left" size={28} color="#111827" />
        </TouchableOpacity>
      </View>

      <View style={styles.profileSection}>
        <View style={styles.avatar}>
          {userData.photo ? (
            <Image
              source={{ uri: userData.photo }}
              style={styles.avatarImage}
            />
          ) : (
            <MaterialCommunityIcons name="account" size={90} color="#FFFFFF" />
          )}
        </View>
        <Text style={styles.name}>{userData.name}</Text>
        <Text style={styles.email}>{userData.email}</Text>
      </View>

      <View style={styles.menu}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => setIsEditProfileModalVisible(true)}
        >
          <MaterialCommunityIcons
            name="account-edit-outline"
            size={24}
            color="#166534"
          />
          <Text style={styles.menuText}>Editar Perfil</Text>
          <MaterialCommunityIcons
            name="chevron-right"
            size={24}
            color="#9CA3AF"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => setIsNotificationSettingsModalVisible(true)}
        >
          <MaterialCommunityIcons
            name="bell-cog-outline"
            size={24}
            color="#166534"
          />
          <Text style={styles.menuText}>Preferências de Alertas</Text>
          <MaterialCommunityIcons
            name="chevron-right"
            size={24}
            color="#9CA3AF"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => setIsChangePasswordModalVisible(true)}
        >
          <MaterialCommunityIcons
            name="lock-outline"
            size={24}
            color="#166534"
          />
          <Text style={styles.menuText}>Alterar Senha</Text>
          <MaterialCommunityIcons
            name="chevron-right"
            size={24}
            color="#9CA3AF"
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutItem} onPress={handleLogout}>
          <MaterialCommunityIcons name="logout" size={24} color="#DC2626" />
          <Text style={styles.logoutText}>Sair da Conta</Text>
        </TouchableOpacity>
      </View>

      <EditProfileModal
        visible={isEditProfileModalVisible}
        onClose={() => setIsEditProfileModalVisible(false)}
        user={userData}
        onSave={handleUpdateProfile}
      />

      <NotificationSettingsModal
        visible={isNotificationSettingsModalVisible}
        onClose={() => setIsNotificationSettingsModalVisible(false)}
        settings={notificationSettings}
        onSave={handleSaveNotificationSettings}
      />

      <ChangePasswordModal
        visible={isChangePasswordModalVisible}
        onClose={() => setIsChangePasswordModalVisible(false)}
        onSave={handleChangePassword}
      />
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

  avatarImage: {
    width: "100%",
    height: "100%",
    borderRadius: 70,
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
