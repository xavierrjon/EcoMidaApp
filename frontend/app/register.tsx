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

import { Feather } from "@expo/vector-icons";

import CustomInput from "@/components/ui/CustomInput";
import PrimaryButton from "@/components/ui/PrimaryButton";

import { useState } from "react";

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = () => {
    setError("");

    if (!name.trim()) {
      setError("Informe seu nome.");
      return;
    }

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

    if (password.length < 6) {
      setError("A senha deve possuir pelo menos 6 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    router.replace("/(tabs)/home");
  };

  return (
    <SafeAreaView style={styles.container}>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >

          <ScrollView
            contentContainerStyle={styles.scroll}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >

            <View style={styles.header}>

              <TouchableOpacity
                onPress={() => router.back()}
                style={styles.backButton}
              >
                <Feather
                  name="arrow-left"
                  size={28}
                  color="#FFFFFF"
                />
              </TouchableOpacity>

            </View>

            <View style={styles.card}>

              <Text style={styles.title}>
                Cadastre-se
              </Text>

              <View style={styles.form}>

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
                    <Text style={styles.errorText}>
                      ⚠ {error}
                    </Text>
                  </View>
                ) : null}

                <PrimaryButton
                  title="Cadastrar"
                  onPress={handleRegister}
                />

                <TouchableOpacity
                  onPress={() =>
                    router.push("/login")
                  }
                >
                  <Text style={styles.login}>
                    Já possui conta?
                    <Text style={styles.loginHighlight}>
                      {" "}Entrar
                    </Text>
                  </Text>
                </TouchableOpacity>

              </View>

            </View>

          </ScrollView>
        </KeyboardAvoidingView>
        
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
    paddingHorizontal: 24,
    paddingTop: 18,
    paddingBottom: 30,
  },

  backButton: {
    width: 42,
    height: 42,
    justifyContent: "center",
  },

  card: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    paddingHorizontal: 28,
    paddingTop: 42,
    paddingBottom: 36,
    minHeight: "75%",
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
    textAlign: "center",
    marginBottom: 36,
  },

  form: {
    width: "100%",
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

  login: {
    textAlign: "center",
    marginTop: 20,
    color: "#6B7280",
    fontSize: 15,
  },

  loginHighlight: {
    color: "#22C55E",
    fontWeight: "700",
  },

});