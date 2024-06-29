import { FlatList, StyleSheet, Text, View } from "react-native";
import colors from "../utils/colors";
import { useExpenseContext } from "../utils/context/ExpenseContext";
import Expense from "./Expense";

export default function UpcomingExpenses() {
  const { state, dispatch } = useExpenseContext();
  const expenses = state.expenses.filter((expense) => !expense.completed);
  const total = parseFloat(
    expenses.reduce((previous, current) => previous + current.amount, 0)
  ).toFixed(2);

  return (
    <View style={styles.categoryContainer}>
      <View style={styles.titleBar}>
        <Text style={styles.title}>Dépenses à venir</Text>
        <Text style={styles.titleBarRecap}>{total}€</Text>
      </View>

      <View style={styles.expensesContainer}>
        <FlatList
          data={expenses}
          keyExtractor={(expense) => expense.id.toString()}
          renderItem={({ item }) => <Expense expense={item} />}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  categoryContainer: {
    backgroundColor: colors.categoryBackground2,
    margin: 5,
    borderRadius: 10,
    padding: 5,
    borderColor: "black",
    borderWidth: 1,
  },
  titleBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleBarRecap: {
    fontSize: 15,
    fontWeight: "bold",
    flex: 1,
    color: "#5A429B",
  },
  titleBarButtons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    flex: 1,
  },
  expensesContainer: {},
  title: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
    color: "#5A429B",
  },
});
