import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import EditProfileModal from "@/components/profile/EditProfileModal";
import ChangePasswordModal from "@/components/profile/ChangePasswordModal";
import NotificationSettingsModal from "@/components/profile/NotificationSettingsModal";
import { useAuth } from "@/contexts/AuthContext";
import * as ImagePicker from "expo-image-picker";

export default function ProfileScreen() {
  const {
    user,
    signOut,
    updateUser,
    changePassword,
    updateUserPhoto,
    removeProfilePhoto,
  } = useAuth();

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

  const handleSaveNotificationSettings = (
    data: typeof notificationSettings,
  ) => {
    setNotificationSettings(data);
    Alert.alert("Sucesso", "Preferências de alertas atualizadas!");
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

  const handleChangePhoto = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.status === "denied") {
        const retryResult =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (retryResult.status === "denied") {
          Alert.alert(
            "Permissão necessária",
            "Para alterar sua foto, precisamos acessar sua galeria. Você pode permitir nas configurações do dispositivo.",
            [
              { text: "Cancelar", style: "cancel" },
              {
                text: "Abrir Configurações",
                onPress: () => Linking.openSettings(),
              },
            ],
          );
          return;
        }
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        try {
          await updateUserPhoto(result.assets[0].uri);
          Alert.alert("Sucesso", "Foto de perfil atualizada!");
        } catch (error: any) {
          Alert.alert(
            "Erro",
            error.message || "Não foi possível atualizar a foto.",
          );
        }
      }
    } catch (error: any) {
      console.error("Erro ao selecionar imagem:", error);
      Alert.alert("Erro", "Não foi possível selecionar a imagem.");
    }
  };

  const handleRemovePhoto = async () => {
    Alert.alert(
      "Remover foto",
      "Tem certeza que deseja remover sua foto de perfil?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Remover",
          style: "destructive",
          onPress: async () => {
            try {
              await removeProfilePhoto();
              Alert.alert("Sucesso", "Foto removida com sucesso!");
            } catch (error: any) {
              Alert.alert(
                "Erro",
                error.message || "Não foi possível remover a foto.",
              );
            }
          },
        },
      ],
    );
  };

  const handleLogout = () => {
    Alert.alert("Sair da Conta", "Tem certeza que deseja sair?", [
      { text: "Cancelar", style: "cancel" },
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

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileSection}>
          <TouchableOpacity onPress={handleChangePhoto}>
            <View style={styles.avatar}>
              {user?.photo ? (
                <Image
                  source={{ uri: user.photo }}
                  style={styles.avatarImage}
                />
              ) : (
                <MaterialCommunityIcons
                  name="account"
                  size={90}
                  color="#FFFFFF"
                />
              )}
            </View>
          </TouchableOpacity>

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
      </ScrollView>

      <EditProfileModal
        visible={isEditProfileModalVisible}
        onClose={() => setIsEditProfileModalVisible(false)}
        user={userData}
        onSave={handleUpdateProfile}
      />

      <ChangePasswordModal
        visible={isChangePasswordModalVisible}
        onClose={() => setIsChangePasswordModalVisible(false)}
        onSave={handleChangePassword}
      />

      <NotificationSettingsModal
        visible={isNotificationSettingsModalVisible}
        onClose={() => setIsNotificationSettingsModalVisible(false)}
        settings={notificationSettings}
        onSave={handleSaveNotificationSettings}
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
    paddingHorizontal: 24,
  },
  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "#22C55E",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  changePhotoText: {
    marginTop: 8,
    color: "#22C55E",
    fontWeight: "600",
    fontSize: 14,
    textAlign: "center",
  },
  removePhotoText: {
    marginTop: 4,
    fontSize: 14,
    color: "#EF4444",
    fontWeight: "600",
    textAlign: "center",
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
    marginTop: 40,
    paddingHorizontal: 24,
    gap: 14,
    paddingBottom: 40,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 18,
    paddingVertical: 18,
    borderRadius: 18,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
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
