import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useState } from "react";

import CustomInput from "@/components/ui/CustomInput";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { signIn, forgotPassword } = useAuth();

  const handleLogin = async () => {
    setError("");

    if (!email.trim() || !email.includes("@")) {
      setError("Informe um email válido.");
      return;
    }

    if (!password.trim()) {
      setError("Informe sua senha.");
      return;
    }

    setIsLoading(true);

    try {
      await signIn(email, password);
      router.replace("/(tabs)/home");
    } catch (err: any) {
      setError(err.message || "Ocorreu um erro ao entrar.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email.trim()) {
      Alert.alert(
        "Preencha o e-mail",
        "Digite seu e-mail no campo acima."
      );
      return;
    }

    try {
      await forgotPassword(email);

      Alert.alert(
        "Sucesso",
        "Link de recuperação enviado para seu e-mail."
      );
    } catch (err: any) {
      Alert.alert(
        "Erro",
        err.message || "Não foi possível enviar."
      );
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.hello}>Olá!</Text>
          <Text style={styles.welcome}>
            Bem-vindo ao EcoMida
          </Text>
        </View>

        <View style={styles.card}>
          <View style={styles.content}>
            <Text style={styles.title}>Entrar</Text>

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

            {error ? (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>
                  ⚠ {error}
                </Text>
              </View>
            ) : null}

            <PrimaryButton
              title="Entrar"
              onPress={handleLogin}
              disabled={isLoading}
              loading={isLoading}
            />

            <View style={styles.linksContainer}>
              <TouchableOpacity onPress={handleForgotPassword}>
                <Text style={styles.forgot}>
                  Esqueceu sua senha?
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => router.push("/register")}
              >
                <Text style={styles.register}>
                  Não possui conta?
                  <Text style={styles.registerHighlight}>
                    {" "}
                    Cadastre-se
                  </Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
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
    paddingTop: 70,
    paddingBottom: 60,
  },

  hello: {
    color: "#FFFFFF",
    fontSize: 40,
    fontWeight: "700",
    marginBottom: 8,
  },

  welcome: {
    color: "#FFFFFF",
    fontSize: 18,
    opacity: 0.95,
  },

  card: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    paddingHorizontal: 28,
    paddingTop: 56,
    minHeight: 600,
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
    gap: 10,
  },

  forgot: {
    color: "#6B7280",
    fontSize: 15,
    fontWeight: "500",
  },

  register: {
    color: "#6B7280",
    fontSize: 15,
    textAlign: "center",
  },

  registerHighlight: {
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