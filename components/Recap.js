import { StyleSheet, Text, View } from "react-native";
import AmountLine from "./AmountLine";
import colors from "../utils/colors";
import { useExpenseContext } from "../utils/context/ExpenseContext";

export default function Recap() {
  const { state, dispatch } = useExpenseContext();
  const totalDepenses = parseFloat(
    state.expenses.reduce(
      (previous, current) => previous + parseFloat(current.amount),
      0
    )
  ).toFixed(2);
  const totalBudget = parseFloat(
    state.categories.reduce((previous, current) => {
      return previous + parseFloat(current.budget);
    }, 0.0)
  ).toFixed(2);
  return (
    <View style={styles.recapContainer}>
      <Text style={styles.title}>Récapitulatif</Text>
      <AmountLine label="Argent du mois" amount={state.startMoney} />
      <AmountLine
        label="Objectif d'économies"
        amount={parseFloat(state.startMoney - totalBudget).toFixed(2)}
      />
      <AmountLine label="Argent dépensé" amount={totalDepenses} />
      <AmountLine
        label="Reste à dépenser"
        amount={parseFloat(totalBudget - totalDepenses).toFixed(2)}
      />
      <AmountLine
        label="Economies possibles"
        amount={parseFloat(state.startMoney - totalDepenses).toFixed(2)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  recapContainer: {
    backgroundColor: colors.categoryBackground,
    width: "90%",
    padding: 10,
    borderRadius: 15,
    margin: 5,
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#5A429B",
  },
});
