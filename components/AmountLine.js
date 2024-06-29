import { View, Text, StyleSheet } from "react-native";

export default function AmountLine({ label, amount }) {
  return (
    <View style={styles.amountLineContainer}>
      <Text style={styles.label}>{label} : </Text>
      <Text>{amount}€</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  amountLineContainer: {
    flexDirection: "row",
  },
  label: {
    fontSize: 15,
  },
});
