import { Tabs } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

export default function TabsLayout() {
  return (
    <>
      <StatusBar style="dark" />

      <Tabs
        screenOptions={{
          headerShown: false,

          tabBarActiveTintColor: "#15803D",
          tabBarInactiveTintColor: "#6B7280",

          tabBarStyle: {
            height: 80,
            borderTopWidth: 0,
            elevation: 12,
            paddingBottom: 12,
            paddingTop: 12,
            marginHorizontal: 14,
            marginBottom: 12,
            borderRadius: 24,
            position: "absolute",
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Início",
            tabBarIcon: ({ color, size }) => (
              <Feather
                name="home"
                size={size}
                color={color}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="tips"
          options={{
            title: "Dicas",
            tabBarIcon: ({ color, size }) => (
              <Feather
                name="lightbulb"
                size={size}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
}