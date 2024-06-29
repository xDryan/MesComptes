import { useState } from "react";
import { useExpenseContext } from "../../utils/context/ExpenseContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TextInput from "./TextInput";
import Modal from "./Modal";
import DropDownCategoriesInput from "./DropDownCategoriesInput";

export default function ExpenseCreator({ isVisible, setVisible }) {
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseCategory, setExpenseCategory] = useState(null);

  const { state, dispatch } = useExpenseContext();

  const storeData = async (data) => {
    try {
      await AsyncStorage.setItem("expensesTests", JSON.stringify(data));
    } catch (e) {
      console.log(e);
    }
  };

  function onPressValidation() {
    if (expenseCategory === null) {
      alert("Tu dois choisir une catégorie");
    } else {
      const newExpense = {
        id: parseInt(state.max_id + 1),
        name: expenseName,
        amount: parseFloat(expenseAmount),
        category: expenseCategory,
        completed: false,
      };
      dispatch({ type: "ADD_EXPENSE", payload: newExpense });
      storeData({
        ...state,
        max_id: state.max_id + 1,
        expenses: [...state.expenses, newExpense],
      });
      setVisible(false);
    }
  }

  return (
    <Modal
      isVisible={isVisible}
      setVisible={setVisible}
      title="Ajouter une dépense"
      onPressValidation={onPressValidation}
    >
      <TextInput
        defaultValue=""
        label="Nom"
        value={expenseName}
        setValue={setExpenseName}
        keyboardType="text"
      />
      <TextInput
        defaultValue=""
        label="Montant"
        value={expenseAmount}
        setValue={setExpenseAmount}
        keyboardType="numeric"
      />
      <DropDownCategoriesInput
        label="Catégorie"
        defaultValue={expenseCategory}
        setValue={setExpenseCategory}
      />
    </Modal>
  );
}
