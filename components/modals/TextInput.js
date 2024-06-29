import {
  StyleSheet,
  View,
  Text,
  TextInput as ReactTextInput,
} from "react-native";

export default function TextInput({
  label,
  defaultValue,
  value,
  setValue,
  keyboardType,
}) {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label} : </Text>
      <ReactTextInput
        defaultValue={defaultValue}
        value={value}
        onChangeText={(newValue) => setValue(newValue)}
        style={styles.input}
        keyboardType={keyboardType}
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
