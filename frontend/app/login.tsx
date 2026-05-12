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

export default function LoginScreen() {
  return (
    <SafeAreaView style={styles.container}>

      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
      >

        <KeyboardAvoidingView
          style={styles.container}
          behavior={
            Platform.OS === "ios"
              ? "padding"
              : "height"
          }
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
                />

                <CustomInput
                  placeholder="Senha"
                  icon="lock"
                  secureTextEntry
                />

                <TouchableOpacity>
                  <Text style={styles.forgot}>
                    Esqueceu a senha?
                  </Text>
                </TouchableOpacity>

                <PrimaryButton
                  title="Entrar"
                  onPress={() => {}}
                />

                <TouchableOpacity
                  onPress={() =>
                    router.push("/register")
                  }
                >
                  <Text style={styles.register}>
                    Não possui conta? Cadastre-se
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
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    paddingHorizontal: 28,
    paddingTop: 42,
    paddingBottom: 36,
    minHeight: "72%",
  },

  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#111827",
    textAlign: "center",
    marginBottom: 36,
  },

  form: {
    width: "100%",
  },

  forgot: {
    alignSelf: "flex-end",
    color: "#166534",
    fontWeight: "600",
    marginBottom: 28,
    marginTop: -4,
  },

  register: {
    textAlign: "center",
    marginTop: 28,
    color: "#166534",
    fontWeight: "700",
    fontSize: 15,
  },

});