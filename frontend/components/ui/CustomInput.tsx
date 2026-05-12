import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import {
  Feather,
} from "@expo/vector-icons";

import {
  useState,
} from "react";

interface Props {
  placeholder: string;
  icon: keyof typeof Feather.glyphMap;
  secureTextEntry?: boolean;
}

export default function CustomInput({
  placeholder,
  icon,
  secureTextEntry,
}: Props) {

  const [isFocused, setIsFocused] =
    useState(false);

  const [hidePassword, setHidePassword] =
    useState(true);

  return (
    <View
      style={[
        styles.container,
        isFocused && styles.focused,
      ]}
    >

      <Feather
        name={icon}
        size={20}
        color="#166534"
      />

      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#4B5563"
        secureTextEntry={
          secureTextEntry && hidePassword
        }
        style={styles.input}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />

      {secureTextEntry && (
        <TouchableOpacity
          onPress={() =>
            setHidePassword(!hidePassword)
          }
        >
          <Feather
            name={
              hidePassword
                ? "eye"
                : "eye-off"
            }
            size={20}
            color="#166534"
          />
        </TouchableOpacity>
      )}

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    backgroundColor: "#F3F4F6",
    borderRadius: 40,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingVertical: 13,
    marginBottom: 18,
    borderWidth: 1.5,
    borderColor: "transparent",
  },

  focused: {
    borderColor: "#22C55E",
    backgroundColor: "#FFFFFF",
  },

  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: "#111827",
  },

});