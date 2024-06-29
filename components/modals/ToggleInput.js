import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, Text, View, StyleSheet } from "react-native";

export default function ToggleInput({ label, isActive, setActive }) {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label} : </Text>
      <Pressable onPress={() => setActive(!isActive)}>
        <MaterialIcons
          name={isActive ? "toggle-on" : "toggle-off"}
          size={40}
          color={isActive ? "#5A429B" : "#E8DEF8"}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputLabel: {
    flex: 1 / 3,
  },
});
