import CustomInput from "@/components/ui/CustomInput";
import { useAuth } from "@/contexts/AuthContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Linking,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface EditProfileModalProps {
  visible: boolean;
  onClose: () => void;
  user: {
    name: string;
    email: string;
    photo?: string | null;
  };
  onSave: (data: { name: string; email: string }) => void;
}

export default function EditProfileModal({
  visible,
  onClose,
  user,
  onSave,
}: EditProfileModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);
  const { updateUserPhoto, removeProfilePhoto } = useAuth();

  useEffect(() => {
    setName(user?.name ?? "");
    setEmail(user?.email ?? "");
    setPhoto(user?.photo ?? null);
  }, [user]);

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
            "Para alterar sua foto, precisamos acessar sua galeria.",
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
        await updateUserPhoto(result.assets[0].uri);
        Alert.alert("Sucesso", "Foto atualizada!");
      }
    } catch (error: any) {
      Alert.alert(
        "Erro",
        error.message || "Não foi possível selecionar a imagem.",
      );
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
              setPhoto(null);
              Alert.alert("Sucesso", "Foto removida!");
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

  const handleSave = () => {
    if (!name.trim()) {
      alert("Informe seu nome");
      return;
    }
    if (!email.trim()) {
      alert("Informe seu email");
      return;
    }
    onSave({ name, email });
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Editar Perfil</Text>
          <Text style={styles.subtitle}>Atualize suas informações</Text>

          <ScrollView
            style={styles.content}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.avatarContainer}>
              <TouchableOpacity onPress={handleChangePhoto}>
                <View style={styles.avatar}>
                  {photo ? (
                    <Image source={{ uri: photo }} style={styles.avatarImage} />
                  ) : (
                    <MaterialCommunityIcons
                      name="account"
                      size={70}
                      color="#FFFFFF"
                    />
                  )}
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleChangePhoto}>
                <Text style={styles.changePhotoText}>Alterar foto</Text>
              </TouchableOpacity>
              {photo && (
                <TouchableOpacity onPress={handleRemovePhoto}>
                  <Text style={styles.removePhotoText}>Remover foto</Text>
                </TouchableOpacity>
              )}
            </View>

            <Text style={styles.label}>Nome</Text>
            <CustomInput
              placeholder="Seu nome"
              value={name}
              onChangeText={setName}
            />

            <Text style={styles.label}>Email</Text>
            <CustomInput
              placeholder="Seu email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.cancel}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  container: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
    height: "85%",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#111827",
  },
  subtitle: {
    marginTop: 6,
    fontSize: 16,
    color: "#22C55E",
  },
  content: {
    flex: 1,
    marginTop: 24,
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
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
    marginTop: 12,
    fontSize: 15,
    fontWeight: "600",
    color: "#22C55E",
  },
  removePhotoText: {
    marginTop: 4,
    fontSize: 14,
    color: "#EF4444",
    fontWeight: "500",
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 18,
    marginTop: 12,
  },
  cancel: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },
  saveButton: {
    backgroundColor: "#22C55E",
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 16,
  },
  saveText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});
