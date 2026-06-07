import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { router } from "expo-router";

import CustomInput from "@/components/ui/CustomInput";
import PrimaryButton from "@/components/ui/PrimaryButton";

import { useState } from "react";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    setError("");

    if (!email.trim()) {
      setError("Informe seu email.");
      return;
    }

    if (!email.includes("@")) {
      setError("Informe um email válido.");
      return;
   }

    if (!password.trim()) {
      setError("Informe sua senha.");
      return;
    }

    router.replace("/(tabs)/home");
  };

  return (
    <SafeAreaView style={styles.container}>

      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
      >

          <ScrollView
            contentContainerStyle={styles.scroll}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >

            <View style={styles.header}>

              <Text style={styles.hello}>
                Olá!
              </Text>

              <Text style={styles.welcome}>
                Bem-vindo ao EcoMida
              </Text>

            </View>

            <View style={styles.card}>

              <Text style={styles.title}>
                Entrar
              </Text>

              <View style={styles.form}>

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
                />

              </View>

              <View style={styles.footer}>

                <TouchableOpacity>
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
                      {" "}Cadastre-se
                    </Text>
                  </Text>
                </TouchableOpacity>

              </View>

            </View>

          </ScrollView>

      </TouchableWithoutFeedback>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#22C55E",
  },

  scroll: {
    flexGrow: 1,
  },

  header: {
    paddingHorizontal: 28,
    paddingTop: 60,
    paddingBottom: 45,
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
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    paddingHorizontal: 28,
    paddingTop: 42,
    paddingBottom: 48,
    minHeight: "70%",
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
    textAlign: "center",
    marginBottom: 32,
  },

  form: {
    width: "100%",
  },

  footer: {
    marginTop: 60,
    alignItems: "center",
  },

  forgot: {
    color: "#6B7280",
    fontSize: 15,
    fontWeight: "500",
    marginBottom: 10,
  },

  register: {
    color: "#6B7280",
    fontSize: 15,
  },

  registerHighlight: {
    color: "#22C55E",
    fontWeight: "700",
  },

  errorContainer: {
    backgroundColor: "#fee2e2",
    borderColor: "#fecaca",
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