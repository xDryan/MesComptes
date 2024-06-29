import { StyleSheet, Text, View } from "react-native";
import DropDownCategories from "./DropDownCategories";

export default function DropDownCategoriesInput({
  label,
  defaultValue,
  setValue,
}) {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label} : </Text>
      <DropDownCategories
        setExpenseCategory={setValue}
        defaultCategory={defaultValue}
      />
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
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    flex: 2 / 3,
  },
});
