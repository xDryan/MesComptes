import { useExpenseContext } from "../../utils/context/ExpenseContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import Modal from "./Modal";
import TextInput from "./TextInput";
import DropDownCategoriesInput from "./DropDownCategoriesInput";

export default function ExpenseModifier({ expense, isVisible, setVisible }) {
  const { state, dispatch } = useExpenseContext();
  const [name, setName] = useState(expense.name);
  const [amount, setAmount] = useState(expense.amount.toString());
  const [category, setCategory] = useState(expense.category);

  const saveData = async (updatedExpense) => {
    try {
      await AsyncStorage.setItem(
        "expensesTests",
        JSON.stringify({
          ...state,
          expenses: state.expenses.map((item) =>
            item.id === updatedExpense.id ? updatedExpense : item
          ),
        })
      );
    } catch (e) {
      console.log(e);
    }
  };

  function onModifyExpense() {
    const updatedExpense = {
      ...expense,
      name: name,
      amount: parseFloat(amount).toFixed(2),
      category: category,
    };
    dispatch({ type: "UPDATE_EXPENSE", payload: updatedExpense });
    saveData(updatedExpense);
    setVisible(false);
  }
  return (
    <Modal
      isVisible={isVisible}
      setVisible={setVisible}
      title={`Modifier la dépense ${expense.name}`}
      onPressValidation={onModifyExpense}
    >
      <TextInput
        label="Nom"
        defaultValue={name}
        value={name}
        setValue={setName}
        keyboardType="text"
      />
      <TextInput
        label="Montant"
        defaultValue={amount}
        value={amount}
        setValue={setAmount}
        keyboardType="text"
      />
      <DropDownCategoriesInput
        label="Catégorie"
        value={category}
        setValue={setCategory}
        defaultValue={category}
      />
    </Modal>
  );
}
