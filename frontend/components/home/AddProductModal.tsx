import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from "react-native";

import { useState } from "react";

import DateTimePicker from "@react-native-community/datetimepicker";

import CustomInput from "@/components/ui/CustomInput";
import SelectInput from "@/components/ui/SelectInput";

import CategoryModal from "./CategoryModal";

import {
  categories,
  units,
} from "@/data/productOptions";

import {
  CreateProductDTO,
} from "@/types/product";

interface AddProductModalProps {
  visible: boolean;
  onClose: () => void;

  onSave: (
    product: CreateProductDTO
  ) => void;
}

export default function AddProductModal({
  visible,
  onClose,
  onSave,
}: AddProductModalProps) {
  const [name, setName] = useState("");

  const [category, setCategory] =
    useState("");

  const [quantity, setQuantity] =
    useState("");

  const [unit, setUnit] =
    useState("");

  const [expirationDate, setExpirationDate] =
    useState("");

  const [date, setDate] =
    useState(new Date());

  const [showDatePicker, setShowDatePicker] =
    useState(false);

  const [
    showCategoryModal,
    setShowCategoryModal,
  ] = useState(false);

  const [
    showUnitModal,
    setShowUnitModal,
  ] = useState(false);

  const formatDate = (
    selectedDate: Date
  ) => {
    return selectedDate.toLocaleDateString(
      "pt-BR"
    );
  };

  const handleSave = () => {
    if (
      !name ||
      !category ||
      !quantity ||
      !unit ||
      !expirationDate
    ) {
      return;
    }

    onSave({
      name,
      category,
      quantity: Number(quantity),
      unit,
      expirationDate,
    });

    setName("");
    setCategory("");
    setQuantity("");
    setUnit("");
    setExpirationDate("");

    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
    >
      <View style={styles.overlay}>

        <View style={styles.container}>

          <Text style={styles.title}>
            Cadastrar Produto
          </Text>

          <Text style={styles.subtitle}>
            Adicione um novo item à sua lista
          </Text>

          <ScrollView
            style={styles.content}
            showsVerticalScrollIndicator={false}
          >

            <View style={styles.form}>

              <Text style={styles.label}>
                Nome do Alimento
              </Text>

              <CustomInput
                placeholder="Ex: Arroz, Leite..."
                placeholderColor="#9CA3AF"
                value={name}
                onChangeText={setName}
              />

              <Text style={styles.label}>
                Categoria
              </Text>

              <SelectInput
                placeholder="Selecione uma categoria"
                value={category}
                onPress={() =>
                  setShowCategoryModal(true)
                }
              />

              <Text style={styles.label}>
                Data de Validade
              </Text>

              <Pressable
                style={[
                  styles.dateInput,
                  expirationDate &&
                    styles.dateInputSelected,
                ]}
                onPress={() =>
                  setShowDatePicker(true)
                }
              >
                <Text
                  style={
                    expirationDate
                      ? styles.dateText
                      : styles.placeholderText
                  }
                >
                  {expirationDate ||
                    "Selecionar data"}
                </Text>
              </Pressable>

              <Text style={styles.label}>
                Quantidade
              </Text>

              <CustomInput
                placeholder="Ex: 2"
                placeholderColor="#9CA3AF"
                keyboardType="numeric"
                value={quantity}
                onChangeText={setQuantity}
              />

              <Text style={styles.label}>
                Unidade de Medida
              </Text>

              <SelectInput
                placeholder="Selecione uma unidade"
                value={unit}
                onPress={() =>
                  setShowUnitModal(true)
                }
              />

            </View>

          </ScrollView>

          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={(
                _event,
                selectedDate
              ) => {
                setShowDatePicker(false);

                if (selectedDate) {
                  setDate(selectedDate);

                  setExpirationDate(
                    formatDate(selectedDate)
                  );
                }
              }}
            />
          )}

          <CategoryModal
            visible={showCategoryModal}
            options={categories}
            onClose={() =>
              setShowCategoryModal(false)
            }
            onSelect={setCategory}
          />

          <CategoryModal
            visible={showUnitModal}
            options={units}
            onClose={() =>
              setShowUnitModal(false)
            }
            onSelect={setUnit}
          />

          <View style={styles.footer}>

            <TouchableOpacity
              onPress={onClose}
            >
              <Text style={styles.cancel}>
                Cancelar
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSave}
            >
              <Text style={styles.saveText}>
                Salvar
              </Text>
            </TouchableOpacity>

          </View>

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
    backgroundColor: "#FFFFFF",
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

    backgroundColor: "#FFFFFF",

    borderWidth: 1.5,
    borderColor: "#22C55E",

    justifyContent: "center",
    paddingHorizontal: 18,

    marginBottom: 16,
  },

  dateInputSelected: {
    borderColor: "#22C55E",
    backgroundColor: "#FFFFFF",
  },

  dateText: {
    fontSize: 16,
    color: "#111827",
  },

  placeholderText: {
    fontSize: 16,
    color: "#9CA3AF",
  },

  footer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 18,
    marginTop: 12,
  },

  cancel: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },

  saveButton: {
    backgroundColor: "#22C55E",
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 16,
  },

  saveText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },

});