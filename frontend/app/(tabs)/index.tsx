import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useAuth } from "@/contexts/AuthContext";
import { router } from "expo-router";

export default function HomeScreen() {
  const { user, signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
      router.replace("/login");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível sair.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Bem-vindo, {user?.name || "Usuário"}!</Text>
      <Text style={styles.email}>{user?.email}</Text>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#F9FAFB",
  },
  welcome: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 8,
  },
  email: {
    fontSize: 16,
    color: "#6B7280",
    marginBottom: 32,
  },
  button: {
    backgroundColor: "#22C55E",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 40,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});