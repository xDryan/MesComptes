import { useState } from "react";
import { useExpenseContext } from "../../utils/context/ExpenseContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Modal from "./Modal";
import TextInput from "./TextInput";

export default function BudgetCreator({ isVisible, setVisible }) {
  const [name, setName] = useState("");
  const [startMoney, setStartMoney] = useState("");

  const { state, dispatch } = useExpenseContext();

  const storeData = async (data) => {
    try {
      await AsyncStorage.setItem("expensesTests", JSON.stringify(data));
    } catch (e) {
      console.log(e);
    }
  };

  function onPressValidation() {
    const newState = {
      name: name,
      startMoney: parseFloat(startMoney).toFixed(2),
      max_id: state.max_id,
      categories: state.categories,
      expenses: state.expenses
        .filter(
          (expense) =>
            !expense.completed ||
            state.categories.find(
              (category) => category.name === expense.category
            ).recurrent
        )
        .map((expense) => ({ ...expense, completed: false })),
      history: [
        ...state.history,
        {
          name: state.name,
          startMoney: state.startMoney,
          categories: state.categories,
          expenses: state.expenses.filter((expense) => expense.completed),
        },
      ],
    };
    dispatch({ type: "NEW_BUDGET", payload: newState });
    storeData(newState);
    setVisible(false);
  }
  return (
    <Modal
      isVisible={isVisible}
      setVisible={setVisible}
      title="Passe à un nouveau budget"
      onPressValidation={onPressValidation}
    >
      <TextInput
        label="Nom"
        defaultValue=""
        value={name}
        setValue={setName}
        keyboardType="text"
      />
      <TextInput
        label="Argent de départ"
        defaultValue=""
        value={startMoney}
        setValue={setStartMoney}
        keyboardType="numeric"
      />
    </Modal>
  );
}
