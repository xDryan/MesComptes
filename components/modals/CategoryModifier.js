import { useExpenseContext } from "../../utils/context/ExpenseContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import Modal from "./Modal";
import TextInput from "./TextInput";
import ToggleInput from "./ToggleInput";

export default function CategoryModifier({ category, isVisible, setVisible }) {
  const { state, dispatch } = useExpenseContext();
  const [budget, setBudget] = useState(category.budget.toString());
  const [isRecurrent, setRecurrent] = useState(category.recurrent);

  const saveData = async (updatedCategory) => {
    try {
      await AsyncStorage.setItem(
        "expensesTests",
        JSON.stringify({
          ...state,
          categories: state.categories.map((item) =>
            item.name === updatedCategory.name ? updatedCategory : item
          ),
        })
      );
    } catch (e) {
      console.log(e);
    }
  };

  function onModifyCategory() {
    const updatedCategory = {
      ...category,
      budget: parseFloat(budget).toFixed(2),
      recurrent: isRecurrent,
    };
    dispatch({ type: "UPDATE_CATEGORY", payload: updatedCategory });
    saveData(updatedCategory);
    setVisible(false);
  }
  return (
    <Modal
      isVisible={isVisible}
      setVisible={setVisible}
      title={`Modifier la catégorie ${category.name}`}
      onPressValidation={onModifyCategory}
    >
      <TextInput
        label="Budget"
        defaultValue={budget}
        value={budget}
        setValue={setBudget}
        keyboardType="numeric"
      />
      <ToggleInput
        label="Récurrent"
        isActive={isRecurrent}
        setActive={setRecurrent}
      />
    </Modal>
  );
}
