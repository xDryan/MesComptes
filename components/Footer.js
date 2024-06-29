import { Pressable, View, Text, StyleSheet } from "react-native";
import colors from "../utils/colors";
import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";

export default function Footer({
  setExpenseModalVisible,
  setCategoryModalVisible,
  setBudgetModalVisible,
}) {
  return (
    <View style={styles.footerContainer}>
      <Pressable
        style={styles.button}
        onPress={() => setBudgetModalVisible(true)}
      >
        <MaterialIcons name="calendar-month" size={50} color={"#CFBCFF"} />
      </Pressable>
      <Pressable
        style={[styles.button, { backgroundColor: "transparent" }]}
        onPress={() => setExpenseModalVisible(true)}
      >
        <MaterialIcons name="add-circle" size={50} color={"#5A429B"} />
        {/* <Text style={styles.label}>Nouvelle dépense</Text> */}
      </Pressable>

      <Pressable
        style={styles.button}
        onPress={() => setCategoryModalVisible(true)}
      >
        <MaterialIcons name="calendar-view-day" size={50} color={"#CFBCFF"} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  footerContainer: {
    backgroundColor: "transparent",
    width: "100%",
    flexDirection: "row",
    flex: 1 / 10,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#5A429B",
    flex: 1,
    margin: 1,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  label: {},
});
