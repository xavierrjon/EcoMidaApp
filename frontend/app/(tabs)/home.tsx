import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useState } from "react";

import { products } from "@/data/products";

import ProductCard from "@/components/home/ProductCard";

export default function HomeScreen() {
  const [activeTab, setActiveTab] =
    useState("ativos");

  const activeCount = products.filter(
    product => product.status === "ativo"
  ).length;

  const consumedCount = products.filter(
    product => product.status === "consumido"
  ).length;

  const discardedCount = products.filter(
    product => product.status === "descartado"
  ).length;

  const filteredProducts = products.filter(
    (product) => {
      if (activeTab === "ativos") {
        return product.status === "ativo";
      }

      if (activeTab === "consumidos") {
        return product.status === "consumido";
      }

      return product.status === "descartado";
    }
  );

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.header}>

        <Image
          source={require("../../assets/images/icon.png")}
          style={styles.icon}
          resizeMode="contain"
        />

        <View style={styles.actions}>

          <TouchableOpacity style={styles.iconButton}>
            <MaterialCommunityIcons
              name="bell-outline"
              size={24}
              color="#22C55E"
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconButton}>
            <MaterialCommunityIcons
              name="account-circle"
              size={26}
              color="#22C55E"
            />
          </TouchableOpacity>

        </View>

      </View>

      <Text style={styles.title}>
        Meus Produtos
      </Text>

      <View style={styles.tabsContainer}>

        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === "ativos" &&
            styles.activeTab,
          ]}
          onPress={() =>
            setActiveTab("ativos")
          }
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "ativos" &&
              styles.activeTabText,
            ]}
          >
            Ativos ({activeCount})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === "consumidos" &&
            styles.activeTab,
          ]}
          onPress={() =>
            setActiveTab("consumidos")
          }
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "consumidos" &&
              styles.activeTabText,
            ]}
          >
            Consumidos ({consumedCount})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === "descartados" &&
            styles.activeTab,
          ]}
          onPress={() =>
            setActiveTab("descartados")
          }
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "descartados" &&
              styles.activeTabText,
            ]}
          >
            Descartados ({discardedCount})
          </Text>
        </TouchableOpacity>

      </View>

      <View style={styles.productsContainer}>

        {filteredProducts.map(
          (product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              category={product.category}
              quantity={product.quantity}
              expirationDate={
                product.expirationDate
              }
              status={product.status}
            />
          )
        )}

      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 20,
  },

  icon: {
    width: 125,
    height: 45,
  },

  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },

  iconButton: {
    padding: 4,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#111827",
    paddingHorizontal: 24,
    marginTop: 20,
  },

  tabsContainer: {
    flexDirection: "row",
    marginTop: 24,
    marginHorizontal: 24,
    gap: 8,
  },

  tab: {
    flex: 1,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
  },

  activeTab: {
    backgroundColor: "#22C55E",
  },

  tabText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#111827",
  },

  activeTabText: {
    color: "#FFFFFF",
  },

  productsContainer: {
    paddingHorizontal: 24,
    marginTop: 20,
  },

});