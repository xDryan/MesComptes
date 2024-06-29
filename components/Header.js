import { StyleSheet, View, Text } from "react-native";
import colors from "../utils/colors";

export default function Header({ budgetTitle }) {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.title}>{budgetTitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    display: "flex",
    backgroundColor: colors.headerBackground,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
    flex: 1 / 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#5A429B",
  },
});
