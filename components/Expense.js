import { StyleSheet, View, Text, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useExpenseContext } from "../utils/context/ExpenseContext";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import ExpenseModifier from "./modals/ExpenseModifier";

export default function Expense({ expense }) {
  const { state, dispatch } = useExpenseContext();
  const [isModifierVisible, setModifierVisible] = useState(false);
  const [isCompleted, setCompleted] = useState(expense.completed);

  const storeData = async (data) => {
    try {
      await AsyncStorage.setItem("expensesTests", JSON.stringify(data));
    } catch (e) {
      console.log(e);
    }
  };
  function onPressRemove() {
    storeData({
      ...state,
      expenses: state.expenses.filter((item) => item.id !== expense.id),
    });
    dispatch({ type: "REMOVE_EXPENSE", payload: expense.id });
  }
  function onPressComplete() {
    setCompleted(!isCompleted);
    storeData({
      ...state,
      expenses: state.expenses.map((item) =>
        item.id === expense.id
          ? { ...expense, completed: !expense.completed }
          : item
      ),
    });
    dispatch({ type: "TOGGLE_EXPENSE", payload: expense.id });
  }

  return (
    <View style={styles.expenseContainer}>
      {isModifierVisible ? (
        <ExpenseModifier
          expense={expense}
          isVisible={isModifierVisible}
          setVisible={setModifierVisible}
        />
      ) : null}
      <Pressable onPress={onPressComplete}>
        <MaterialIcons
          name="check-circle"
          size={20}
          color={isCompleted ? "#5A429B" : "#CFBCFF"}
        />
      </Pressable>
      <Pressable onPress={() => setModifierVisible(true)}>
        <MaterialIcons name="edit" size={20} color={"#5A429B"} />
      </Pressable>
      <View style={styles.expenseTitleContainer}>
        <Text style={styles.expenseTitle}>{expense.name} : </Text>
      </View>
      <View style={styles.expenseDetails}>
        <Text style={styles.expenseAmount}>{expense.amount}€</Text>
      </View>
      <Pressable onPress={onPressRemove} style={styles.completeButton}>
        <MaterialIcons name="delete" size={20} color={"#5A429B"} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  completeButton: {
    flex: 1 / 3,
    alignItems: "center",
  },
  expenseContainer: {
    margin: 5,
    padding: 5,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E8DEF8",
  },
  expenseTitleContainer: {
    alignItems: "center",
    flex: 1 / 2,
  },
  expenseTitle: {
    margin: 1,
    fontSize: 13,
    fontStyle: "italic",
  },
  expenseDetails: {
    flexDirection: "row",
    justifyContent: "center",
    flex: 1 / 3,
    alignItems: "center",
  },
  expenseAmount: {
    fontWeight: "bold",
    fontSize: 12,
  },
});
