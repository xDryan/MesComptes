import { useState } from "react";
import { useExpenseContext } from "../../utils/context/ExpenseContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Modal from "./Modal";
import TextInput from "./TextInput";
import ToggleInput from "./ToggleInput";

export default function CategoryCreator({ isVisible, setVisible }) {
  const [categoryName, setCategoryName] = useState("");
  const [categoryBudget, setCategoryBudget] = useState("");
  const [isRecurrent, setRecurrent] = useState(false);

  const { state, dispatch } = useExpenseContext();

  const storeData = async (data) => {
    try {
      await AsyncStorage.setItem("expensesTests", JSON.stringify(data));
    } catch (e) {
      console.log(e);
    }
  };

  function onPressValidation() {
    const newCategory = {
      name: categoryName,
      budget: parseFloat(categoryBudget).toFixed(2),
      recurrent: isRecurrent,
    };
    dispatch({ type: "ADD_CATEGORY", payload: newCategory });
    storeData({
      ...state,
      categories: [...state.categories, newCategory],
    });
    setVisible(false);
  }

  return (
    <Modal
      isVisible={isVisible}
      setVisible={setVisible}
      title="Ajouter une catégorie"
      onPressValidation={onPressValidation}
    >
      <TextInput
        label="Nom"
        defaultValue=""
        value={categoryName}
        setValue={setCategoryName}
        keyboardType="text"
      />
      <TextInput
        label="Budget"
        defaultValue=""
        value={categoryBudget}
        setValue={setCategoryBudget}
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
