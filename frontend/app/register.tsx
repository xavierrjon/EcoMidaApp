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

export default function RegisterScreen() {
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
          keyboardVerticalOffset={20}
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
                  placeholder="Nome"
                  icon="user"
                />

                <CustomInput
                  placeholder="Email"
                  icon="mail"
                />

                <CustomInput
                  placeholder="Senha"
                  icon="lock"
                  secureTextEntry
                />

                <CustomInput
                  placeholder="Confirmar senha"
                  icon="lock"
                  secureTextEntry
                />

                <PrimaryButton
                  title="Cadastrar"
                  onPress={() => {}}
                />

                <TouchableOpacity
                  onPress={() =>
                    router.push("/login")
                  }
                >
                  <Text style={styles.login}>
                    Já possui conta? Entrar
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
    minHeight: "82%",
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

  login: {
    textAlign: "center",
    marginTop: 28,
    color: "#166534",
    fontWeight: "700",
    fontSize: 15,
  },

});