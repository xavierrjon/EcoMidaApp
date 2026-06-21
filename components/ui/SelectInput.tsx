import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

interface SelectInputProps {
  placeholder: string;
  value: string;
  onPress: () => void;
}

export default function SelectInput({
  placeholder,
  value,
  onPress,
}: SelectInputProps) {
  return (
    <TouchableOpacity
      style={[
      styles.container,
      value && styles.selected,
  ]}
  onPress={onPress}
    >
      <Text
        style={[
          styles.text,
          !value && styles.placeholder,
        ]}
      >
        {value || placeholder}
      </Text>

      <MaterialCommunityIcons
        name="chevron-down"
        size={24}
        color={
          value
            ? "#22C55E"
            : "#9CA3AF"
        }
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({

  container: {
    backgroundColor: "#F3F4F6",
    borderRadius: 28,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingVertical: 18,
    borderWidth: 1.5,
    borderColor: "transparent",
    marginBottom: 16,
  },

  selected: {
    borderColor: "#22C55E",
    backgroundColor: "#FFFFFF",
  },

  text: {
    fontSize: 16,
    color: "#111827",
  },

  placeholder: {
    color: "#9CA3AF",
  },

});