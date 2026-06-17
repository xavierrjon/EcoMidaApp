import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { useEffect, useState } from "react";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import CustomInput from "@/components/ui/CustomInput";

interface EditProfileModalProps {
  visible: boolean;
  onClose: () => void;

  user: {
    name: string;
    email: string;
  };

  onSave: (data: {
    name: string;
    email: string;
  }) => void;
}

export default function EditProfileModal({
  visible,
  onClose,
  user,
  onSave,
}: EditProfileModalProps) {
  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  useEffect(() => {
    setName(user?.name ?? "");
    setEmail(user?.email ?? "");
  }, [user]);

  const handleSave = () => {
    if (!name.trim()) {
      alert("Informe seu nome");
      return;
    }

    if (!email.trim()) {
      alert("Informe seu email");
      return;
    }

    onSave({
      name,
      email,
    });

    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
    >
      <View style={styles.overlay}>
        <View style={styles.container}>

          <Text style={styles.title}>
            Editar Perfil
          </Text>

          <Text style={styles.subtitle}>
            Atualize suas informações
          </Text>

          <ScrollView
            style={styles.content}
            showsVerticalScrollIndicator={false}
          >

            <View style={styles.avatarContainer}>

              <View style={styles.avatar}>
                <MaterialCommunityIcons
                  name="account"
                  size={70}
                  color="#FFFFFF"
                />
              </View>

              <TouchableOpacity>
                <Text style={styles.changePhoto}>
                  Alterar foto
                </Text>
              </TouchableOpacity>

            </View>

            <Text style={styles.label}>
              Nome
            </Text>

            <CustomInput
              placeholder="Seu nome"
              value={name}
              onChangeText={setName}
            />

            <Text style={styles.label}>
              Email
            </Text>

            <CustomInput
              placeholder="Seu email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />

          </ScrollView>

          <View style={styles.footer}>

            <TouchableOpacity
              onPress={onClose}
            >
              <Text style={styles.cancel}>
                Cancelar
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSave}
            >
              <Text style={styles.saveText}>
                Salvar
              </Text>
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
    backgroundColor:
      "rgba(0,0,0,0.4)",
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
  },

  changePhoto: {
    marginTop: 12,
    fontSize: 15,
    fontWeight: "600",
    color: "#22C55E",
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