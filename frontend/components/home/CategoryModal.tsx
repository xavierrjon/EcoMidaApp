import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

interface CategoryModalProps {
  visible: boolean;
  options: string[];
  onSelect: (value: string) => void;
  onClose: () => void;
}

export default function CategoryModal({
  visible,
  options,
  onSelect,
  onClose,
}: CategoryModalProps) {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
    >
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <View style={styles.container}>

          {options.map((option) => (
            <TouchableOpacity
              key={option}
              style={styles.option}
              onPress={() => {
                onSelect(option);
                onClose();
              }}
            >
              <Text style={styles.optionText}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}

        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({

  overlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
    padding: 24,
  },

  container: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    paddingVertical: 12,
  },

  option: {
    paddingVertical: 16,
    paddingHorizontal: 20,
  },

  optionText: {
    fontSize: 16,
    color: "#111827",
  },

});