import CustomInput from "@/components/ui/CustomInput";
import SelectInput from "@/components/ui/SelectInput";
import { categories, units } from "@/data/productOptions";
import { Product } from "@/types/product";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useEffect, useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CategoryModal from "./CategoryModal";

interface EditProductModalProps {
  visible: boolean;
  product: Product | null;
  onClose: () => void;
  onSave: (id: string, data: Partial<Product>) => void;
  onDelete: (id: string) => void;
}

export default function EditProductModal({
  visible,
  product,
  onClose,
  onSave,
  onDelete,
}: EditProductModalProps) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showUnitModal, setShowUnitModal] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (!product) return;
    setName(product.name);
    setCategory(product.category);
    setQuantity(String(product.quantity));
    setUnit(product.unit);
    setExpirationDate(product.expirationDate);
  }, [product]);

  const formatDate = (selectedDate: Date) => {
    return selectedDate.toLocaleDateString("pt-BR");
  };

  const validateForm = () => {
    if (!name.trim()) {
      alert("Informe o nome do alimento");
      return false;
    }

    if (!category) {
      alert("Selecione uma categoria");
      return false;
    }

    if (!expirationDate) {
      alert("Selecione a data de validade");
      return false;
    }

    if (!quantity) {
      alert("Informe a quantidade");
      return false;
    }

    if (!unit) {
      alert("Selecione uma unidade");
      return false;
    }

    return true;
  };

  const handleSave = () => {
    if (!product) return;

    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    onSave(product.id, {
      name,
      category,
      quantity: Number(quantity),
      unit,
      expirationDate,
    });
  };

  const handleDelete = () => {
    if (!product) return;
    onDelete(product.id);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Editar Produto</Text>
          <Text style={styles.subtitle}>Atualize as informações</Text>

          <ScrollView
            style={styles.content}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.form}>
              <Text style={styles.label}>Nome do Alimento</Text>
              <CustomInput
                placeholder="Nome"
                value={name}
                onChangeText={setName}
              />

              <Text style={styles.label}>Categoria</Text>
              <SelectInput
                placeholder="Categoria"
                value={category}
                onPress={() => setShowCategoryModal(true)}
              />

              <Text style={styles.label}>Data de Validade</Text>
              <Pressable
                style={styles.dateInput}
                onPress={() => setShowDatePicker(true)}
              >
                <Text style={styles.dateText}>
                  {expirationDate || "Selecione uma data"}
                </Text>
              </Pressable>

              <Text style={styles.label}>Quantidade</Text>
              <CustomInput
                placeholder="Quantidade"
                value={quantity}
                keyboardType="numeric"
                onChangeText={setQuantity}
              />

              <Text style={styles.label}>Unidade de Medida</Text>
              <SelectInput
                placeholder="Unidade"
                value={unit}
                onPress={() => setShowUnitModal(true)}
              />
            </View>
          </ScrollView>

          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={(_event, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) {
                  setDate(selectedDate);
                  setExpirationDate(formatDate(selectedDate));
                }
              }}
            />
          )}

          <CategoryModal
            visible={showCategoryModal}
            options={categories}
            onClose={() => setShowCategoryModal(false)}
            onSelect={setCategory}
          />

          <CategoryModal
            visible={showUnitModal}
            options={units}
            onClose={() => setShowUnitModal(false)}
            onSelect={setUnit}
          />

          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => setShowDeleteConfirm(true)}
            >
              <Text style={styles.deleteText}>Excluir Produto</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveText}>Salvar Alterações</Text>
            </TouchableOpacity>
          </View>

          <Modal visible={showDeleteConfirm} transparent animationType="fade">
            <View style={styles.confirmOverlay}>
              <View style={styles.confirmContainer}>
                <Text style={styles.confirmTitle}>Excluir Produto</Text>

                <Text style={styles.confirmText}>
                  Tem certeza que deseja excluir este produto?
                </Text>

                <View style={styles.confirmActions}>
                  <TouchableOpacity
                    style={styles.confirmCancel}
                    onPress={() => setShowDeleteConfirm(false)}
                  >
                    <Text style={styles.confirmCancelText}>Cancelar</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.confirmDelete}
                    onPress={() => {
                      setShowDeleteConfirm(false);
                      handleDelete();
                    }}
                  >
                    <Text style={styles.confirmDeleteText}>Excluir</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  container: {
    backgroundColor: "#FFF",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
    height: "85%",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#111827",
  },
  subtitle: {
    marginTop: 6,
    color: "#22C55E",
    fontSize: 16,
  },
  content: {
    flex: 1,
    marginTop: 24,
  },
  form: {
    gap: 10,
    paddingBottom: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  dateInput: {
    height: 64,
    borderRadius: 28,
    borderWidth: 1.5,
    borderColor: "#22C55E",
    justifyContent: "center",
    paddingHorizontal: 18,
    marginBottom: 16,
  },
  dateText: {
    fontSize: 16,
    color: "#111827",
  },
  footer: {
    gap: 12,
  },
  deleteButton: {
    backgroundColor: "#FEE2E2",
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
  },
  deleteText: {
    color: "#DC2626",
    fontWeight: "700",
  },
  saveButton: {
    backgroundColor: "#22C55E",
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
  },
  saveText: {
    color: "#FFF",
    fontWeight: "700",
  },

  confirmOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
  },

  confirmContainer: {
    width: "85%",
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 24,
  },

  confirmTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },

  confirmText: {
    marginTop: 10,
    fontSize: 15,
    color: "#6B7280",
    lineHeight: 22,
  },

  confirmActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 24,
    gap: 12,
  },

  confirmCancel: {
    paddingHorizontal: 18,
    paddingVertical: 10,
  },

  confirmCancelText: {
    color: "#6B7280",
    fontWeight: "600",
  },

  confirmDelete: {
    backgroundColor: "#EF4444",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
  },

  confirmDeleteText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
});
