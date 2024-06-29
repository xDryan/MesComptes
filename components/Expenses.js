import { FlatList, StyleSheet, Text, View } from "react-native";
import Category from "./Category";
import { useExpenseContext } from "../utils/context/ExpenseContext";
import UpcomingExpenses from "./UpcomingExpenses";

export default function Expenses() {
  const { state, dispatch } = useExpenseContext();
  return (
    <View style={styles.expensesContainer}>
      <FlatList
        data={state.categories}
        keyExtractor={(category) => category.name}
        renderItem={({ item }) => <Category category={item} />}
        ListHeaderComponent={<UpcomingExpenses />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  expensesContainer: {
    flexDirection: "column",
    flex: 1,
    width: "100%",
  },
});
