import { useEffect, useRef, useState } from "react";
import { Stack, Redirect } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View, Animated, StyleSheet } from "react-native";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";

function SplashAnimation({ onFinish }: { onFinish: () => void }) {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }).start(() => onFinish());
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.splashContainer}>
      <Animated.Image
        source={require("@/assets/images/logo.png")}
        resizeMode="contain"
        style={[styles.logo, { opacity, transform: [{ scale }] }]}
      />
    </View>
  );
}

function RootLayoutNav() {
  const { user, isLoading } = useAuth();
  const [showSplash, setShowSplash] = useState(true);

  if (isLoading || showSplash) {
    return <SplashAnimation onFinish={() => setShowSplash(false)} />;
  }

  if (!user) {
    return (
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
      </Stack>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <StatusBar style="light" />
      <RootLayoutNav />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: "#22C55E",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 260,
    height: 260,
  },
});
