import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CustomInput from "@/components/ui/CustomInput";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { useAuth } from "@/contexts/AuthContext";

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { signUp } = useAuth();

  const handleRegister = async () => {
    setError("");

    if (!name.trim()) {
      setError("Informe seu nome.");
      return;
    }

    if (!email.trim() || !email.includes("@")) {
      setError("Informe um email válido.");
      return;
    }

    if (!password.trim()) {
      setError("Informe sua senha.");
      return;
    }

    if (password.length < 6) {
      setError("A senha deve possuir pelo menos 6 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    setIsLoading(true);

    try {
      await signUp(name, email, password);
      router.replace("/(tabs)/home");
    } catch (err: any) {
      setError(err.message || "Ocorreu um erro ao cadastrar.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Feather name="arrow-left" size={28} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <View style={styles.card}>
            <View style={styles.content}>
              <Text style={styles.title}>Cadastre-se</Text>

              <CustomInput
                placeholder="Nome completo"
                icon="user"
                value={name}
                onChangeText={setName}
              />

              <CustomInput
                placeholder="Email"
                icon="mail"
                value={email}
                onChangeText={setEmail}
              />

              <CustomInput
                placeholder="Senha"
                icon="lock"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />

              <CustomInput
                placeholder="Confirmar senha"
                icon="lock"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />

              {error ? (
                <View style={styles.errorContainer}>
                  <Text style={styles.errorText}>⚠ {error}</Text>
                </View>
              ) : null}

              <PrimaryButton
                title="Cadastrar"
                onPress={handleRegister}
                disabled={isLoading}
                loading={isLoading}
              />

              <View style={styles.linksContainer}>
                <TouchableOpacity onPress={() => router.push("/login")}>
                  <Text style={styles.login}>
                    Já possui conta?
                    <Text style={styles.loginHighlight}> Entrar</Text>
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#22C55E",
  },

  scrollContent: {
    flexGrow: 1,
  },

  header: {
    paddingHorizontal: 28,
    paddingTop: 40,
    paddingBottom: 70,
  },

  backButton: {
    width: 42,
    height: 42,
    justifyContent: "center",
    alignItems: "flex-start",
  },

  card: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    paddingHorizontal: 28,
    paddingTop: 56,
    minHeight: 650,
  },

  content: {
    flex: 1,
    justifyContent: "flex-start",
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
    textAlign: "center",
    marginBottom: 32,
  },

  linksContainer: {
    marginTop: 20,
    alignItems: "center",
  },

  login: {
    color: "#6B7280",
    fontSize: 15,
    textAlign: "center",
  },

  loginHighlight: {
    color: "#22C55E",
    fontWeight: "700",
  },

  errorContainer: {
    backgroundColor: "#FEE2E2",
    borderColor: "#FECACA",
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginBottom: 16,
  },

  errorText: {
    color: "#DC2626",
    fontSize: 14,
    fontWeight: "500",
  },
});
