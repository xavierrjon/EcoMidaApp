import { useEffect, useRef } from "react";

import {
  View,
  StyleSheet,
  Animated,
} from "react-native";

import { router } from "expo-router";

export default function SplashScreen() {

  const opacity = useRef(
    new Animated.Value(0)
  ).current;

  const scale = useRef(
    new Animated.Value(0.8)
  ).current;

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
      }).start(() => {
        router.replace("/login");
      });

    }, 2200);

    return () => clearTimeout(timer);

  }, []);

  return (
    <View style={styles.container}>

      <Animated.Image
        source={require("../assets/images/logo.png")}
        resizeMode="contain"
        style={[
          styles.logo,
          {
            opacity,
            transform: [{ scale }],
          },
        ]}
      />

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
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