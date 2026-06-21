import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useState, useEffect } from "react";

import ProductCard from "@/components/home/ProductCard";
import AddProductModal from "@/components/home/AddProductModal";
import { Product, CreateProductDTO } from "@/types/product";
import { productsService } from "@/services/productsService";
import EditProductModal from "@/components/home/EditProductModal";
import { notificationsService } from "@/services/notificationsService";
import { useAuth } from "@/contexts/AuthContext";

export default function HomeScreen() {
  const { user: authUser } = useAuth();

  const [activeTab, setActiveTab] = useState("ativos");
  const [products, setProducts] = useState<Product[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const data = await productsService.getAll();
    setProducts(data);
    const notifications = notificationsService.generate(data);
    setNotificationCount(notifications.length);
  };

  const handleAddProduct = async (product: CreateProductDTO) => {
    await productsService.create(product);
    loadProducts();
  };

  const handleConsumeProduct = async (id: string) => {
    await productsService.updateStatus(id, "consumido");
    loadProducts();
  };

  const handleDiscardProduct = async (id: string) => {
    await productsService.updateStatus(id, "descartado");
    loadProducts();
  };

  const handleReactivateProduct = async (id: string) => {
    await productsService.updateStatus(id, "ativo");
    loadProducts();
  };

  const handleDeleteProduct = async (id: string) => {
    await productsService.delete(id);
    loadProducts();
    setSelectedProduct(null);
  };

  const handleUpdateProduct = async (id: string, data: Partial<Product>) => {
    await productsService.update(id, data);
    loadProducts();
    setSelectedProduct(null);
  };

  const activeCount = products.filter((p) => p.status === "ativo").length;
  const consumedCount = products.filter((p) => p.status === "consumido").length;
  const discardedCount = products.filter((p) => p.status === "descartado").length;

  const convertDate = (dateString: string) => {
    const [day, month, year] = dateString.split("/");
    return new Date(Number(year), Number(month) - 1, Number(day));
  };

  const filteredProducts = products
    .filter((product) => {
      const matchesTab =
        activeTab === "ativos"
          ? product.status === "ativo"
          : activeTab === "consumidos"
          ? product.status === "consumido"
          : product.status === "descartado";
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());
      return matchesTab && matchesSearch;
    })
    .sort((a, b) => {
      const dateA = convertDate(a.expirationDate);
      const dateB = convertDate(b.expirationDate);
      return dateA.getTime() - dateB.getTime();
    });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../../assets/images/icon.png")}
          style={styles.icon}
          resizeMode="contain"
        />

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => router.push("/notifications")}
          >
            <MaterialCommunityIcons
              name="bell-outline"
              size={26}
              color="#22C55E"
            />
            {notificationCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  {notificationCount > 9 ? "9+" : notificationCount}
                </Text>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => router.push("/profile")}
          >
            {authUser?.photo ? (
              <Image
                source={{ uri: authUser.photo }}
                style={styles.headerAvatar}
              />
            ) : (
              <View style={styles.headerAvatarPlaceholder}>
                <MaterialCommunityIcons name="account" size={16} color="#FFFFFF" />
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.title}>Meus Produtos</Text>

      <View style={styles.searchContainer}>
        <Feather name="search" size={20} color="#6B7280" />
        <TextInput
          placeholder="Buscar alimento..."
          placeholderTextColor="#9CA3AF"
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
      </View>

      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "ativos" && styles.activeTab]}
          onPress={() => setActiveTab("ativos")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "ativos" && styles.activeTabText,
            ]}
          >
            Ativos ({activeCount})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === "consumidos" && styles.activeTab]}
          onPress={() => setActiveTab("consumidos")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "consumidos" && styles.activeTabText,
            ]}
          >
            Consumidos ({consumedCount})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === "descartados" && styles.activeTab]}
          onPress={() => setActiveTab("descartados")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "descartados" && styles.activeTabText,
            ]}
          >
            Descartados ({discardedCount})
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.productsContainer}
        contentContainerStyle={styles.productsContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              category={product.category}
              quantity={product.quantity}
              expirationDate={product.expirationDate}
              status={product.status}
              onPress={() => setSelectedProduct(product)}
              onConsume={() => handleConsumeProduct(product.id)}
              onDiscard={() => handleDiscardProduct(product.id)}
              onReactivate={() => handleReactivateProduct(product.id)}
            />
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconWrapper}>
              <MaterialCommunityIcons
                name={
                  activeTab === "ativos"
                    ? "fridge-outline"
                    : activeTab === "consumidos"
                    ? "silverware-fork-knife"
                    : "trash-can-outline"
                }
                size={42}
                color={
                  activeTab === "ativos"
                    ? "#22C55E"
                    : activeTab === "consumidos"
                    ? "#14B8A6"
                    : "#EF4444"
                }
              />
            </View>
            <Text style={styles.emptyTitle}>
              {activeTab === "ativos"
                ? "Nenhum produto ativo"
                : activeTab === "consumidos"
                ? "Nenhum produto consumido"
                : "Nenhum produto descartado"}
            </Text>
            <Text style={styles.emptyDescription}>
              {activeTab === "ativos"
                ? "Clique em + para adicionar seu primeiro alimento."
                : activeTab === "consumidos"
                ? "Os alimentos consumidos aparecerão aqui."
                : "Os alimentos descartados aparecerão aqui."}
            </Text>
          </View>
        )}
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => setModalVisible(true)}
      >
        <Feather name="plus" size={30} color="#FFF" />
      </TouchableOpacity>

      <AddProductModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleAddProduct}
      />

      <EditProductModal
        visible={selectedProduct !== null}
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onSave={handleUpdateProduct}
        onDelete={handleDeleteProduct}
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
    backgroundColor: "#22C55E",
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 24,
    marginTop: 18,
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 54,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    color: "#111827",
  },
  emptyIconWrapper: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 80,
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },
  emptyDescription: {
    marginTop: 8,
    fontSize: 15,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 22,
  },
  badge: {
    position: "absolute",
    top: -4,
    right: -6,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#EF4444",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "700",
  },
  headerAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
  },
  headerAvatarPlaceholder: {
    width: 28,
    height: 28,
    borderRadius: 19,
    backgroundColor: "#22C55E",
    justifyContent: "center",
    alignItems: "center",
  },
});