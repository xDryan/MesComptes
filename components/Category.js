import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import colors from "../utils/colors";
import { useExpenseContext } from "../utils/context/ExpenseContext";
import Expense from "./Expense";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import CategoryDestructor from "./modals/CategoryDestructor";
import CategoryModifier from "./modals/CategoryModifier";

export default function Category({ category }) {
  const [isModifying, setModifying] = useState(false);
  const [isDeleting, setDeleting] = useState(false);
  const { state, dispatch } = useExpenseContext();
  const expenses = state.expenses.filter(
    (expense) => expense.category === category.name && expense.completed
  );
  const total = parseFloat(
    expenses.reduce((previous, current) => previous + current.amount, 0)
  ).toFixed(2);

  const totalWithUpcoming = parseFloat(
    state.expenses.reduce(
      (previous, current) =>
        current.category === category.name
          ? previous + current.amount
          : previous,
      0
    )
  ).toFixed(2);

  return (
    <View style={styles.categoryContainer}>
      <View style={styles.titleBar}>
        <Text style={styles.title}>{category.name}</Text>
        <Text style={styles.titleBarRecap}>
          {total}€ ({totalWithUpcoming}€) / {category.budget}€
        </Text>
        <View style={styles.titleBarButtons}>
          <Pressable onPress={() => setModifying(true)}>
            <MaterialIcons name="edit" size={22} color={"#5A429B"} />
          </Pressable>
          <Pressable onPress={() => setDeleting(true)}>
            <MaterialIcons name="delete" size={22} color={"#5A429B"} />
          </Pressable>
        </View>
      </View>

      <CategoryDestructor
        categoryName={category.name}
        isVisible={isDeleting}
        setVisible={setDeleting}
      />
      <CategoryModifier
        category={category}
        isVisible={isModifying}
        setVisible={setModifying}
      />

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
    backgroundColor: colors.categoryBackground,
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
