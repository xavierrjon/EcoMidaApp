import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";

interface DaysBeforeModalProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (days: number) => void;
  currentValue?: number;
}

const options = [1, 3, 5, 7, 10, 15];

export default function DaysBeforeModal({
  visible,
  onClose,
  onSelect,
  currentValue,
}: DaysBeforeModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
    >
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <TouchableOpacity activeOpacity={1} style={styles.container}>
          
          <Text style={styles.title}>
            Dias de Antecedência
          </Text>

          <Text style={styles.subtitle}>
            Selecione o período de aviso
          </Text>

          <FlatList
            data={options}
            keyExtractor={(item) => item.toString()}
            style={styles.content}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              const isSelected = item === currentValue;
              return (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => {
                    onSelect(item);
                    onClose();
                  }}
                >
                  <Text style={[
                    styles.optionText,
                    isSelected && styles.selectedOptionText
                  ]}>
                    {item} {item === 1 ? "dia" : "dias"}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />

        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "85%",
    maxHeight: "60%",
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
  },
  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: "#22C55E",
    marginBottom: 16,
  },
  content: {
    marginTop: 4,
  },
  option: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  optionText: {
    fontSize: 16,
    color: "#111827",
    fontWeight: "500",
  },
  selectedOptionText: {
    color: "#087829",
    fontWeight: "700",
  },
});