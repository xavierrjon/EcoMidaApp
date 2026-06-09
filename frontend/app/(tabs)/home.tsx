import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import {
  Feather,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import {
  useState,
  useEffect,
} from "react";

import ProductCard from "@/components/home/ProductCard";

import AddProductModal from "@/components/home/AddProductModal";

import {
  Product,
  CreateProductDTO,
} from "@/types/product";

import {
  productsService,
} from "@/services/productsService";

export default function HomeScreen() {
  const [activeTab, setActiveTab] =
    useState("ativos");

  const [products, setProducts] =
    useState<Product[]>([]);

  const [modalVisible, setModalVisible] =
    useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const data =
      await productsService.getAll();

    setProducts(data);
  };

  const handleAddProduct = async (
    product: CreateProductDTO
  ) => {
    await productsService.create(
      product
    );

    loadProducts();
  };

  const handleConsumeProduct = async (
    id: string
  ) => {
    await productsService.updateStatus(
      id,
      "consumido"
    );

    loadProducts();
  };

  const handleDiscardProduct = async (
    id: string
  ) => {
    await productsService.updateStatus(
      id,
      "descartado"
    );

    loadProducts();
  };

  const handleReactivateProduct = async (
    id: string
  ) => {
    await productsService.updateStatus(
      id,
      "ativo"
    );

    loadProducts();
  };

  const activeCount = products.filter(
    (product) =>
      product.status === "ativo"
  ).length;

  const consumedCount = products.filter(
    (product) =>
      product.status === "consumido"
  ).length;

  const discardedCount = products.filter(
    (product) =>
      product.status === "descartado"
  ).length;

  const filteredProducts = products.filter(
    (product) => {
      if (activeTab === "ativos") {
        return product.status === "ativo";
      }

      if (
        activeTab === "consumidos"
      ) {
        return (
          product.status ===
          "consumido"
        );
      }

      return (
        product.status ===
        "descartado"
      );
    }
  );

  return (
    <SafeAreaView
      style={styles.container}
    >
      <View style={styles.header}>
        <Image
          source={require("../../assets/images/icon.png")}
          style={styles.icon}
          resizeMode="contain"
        />

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.iconButton}
          >
            <MaterialCommunityIcons
              name="bell-outline"
              size={24}
              color="#22C55E"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconButton}
          >
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
              activeTab ===
                "ativos" &&
                styles.activeTabText,
            ]}
          >
            Ativos ({activeCount})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tab,
            activeTab ===
              "consumidos" &&
              styles.activeTab,
          ]}
          onPress={() =>
            setActiveTab(
              "consumidos"
            )
          }
        >
          <Text
            style={[
              styles.tabText,
              activeTab ===
                "consumidos" &&
                styles.activeTabText,
            ]}
          >
            Consumidos (
            {consumedCount})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tab,
            activeTab ===
              "descartados" &&
              styles.activeTab,
          ]}
          onPress={() =>
            setActiveTab(
              "descartados"
            )
          }
        >
          <Text
            style={[
              styles.tabText,
              activeTab ===
                "descartados" &&
                styles.activeTabText,
            ]}
          >
            Descartados (
            {discardedCount})
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={
          styles.productsContainer
        }
        contentContainerStyle={
          styles.productsContent
        }
        showsVerticalScrollIndicator={
          false
        }
      >
        {filteredProducts.map(
          (product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              category={product.category}
              quantity={product.quantity}
              expirationDate={product.expirationDate}
              status={product.status}
              onConsume={() =>
                handleConsumeProduct(product.id)
              }
              onDiscard={() =>
                handleDiscardProduct(product.id)
              }
              onReactivate={() =>
                handleReactivateProduct(product.id)
              }
            />
          )
        )}
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        onPress={() =>
          setModalVisible(true)
        }
      >
        <Feather
          name="plus"
          size={30}
          color="#FFF"
        />
      </TouchableOpacity>

      <AddProductModal
        visible={modalVisible}
        onClose={() =>
          setModalVisible(false)
        }
        onSave={handleAddProduct}
      />
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
    justifyContent:
      "space-between",
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
    flex: 1,
    marginTop: 20,
  },

  productsContent: {
    paddingHorizontal: 24,
    paddingBottom: 140,
  },

  fab: {
    position: "absolute",
    bottom: 110,
    right: 24,

    width: 64,
    height: 64,

    borderRadius: 32,

    backgroundColor:
      "#22C55E",

    justifyContent: "center",
    alignItems: "center",

    elevation: 8,
  },
});