import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import colors from "../../utils/colors";
import { useExpenseContext } from "../../utils/context/ExpenseContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CategoryDestructor({
  categoryName,
  isVisible,
  setVisible,
}) {
  const { state, dispatch } = useExpenseContext();

  const saveData = async () => {
    try {
      await AsyncStorage.setItem(
        "expensesTests",
        JSON.stringify({
          ...state,
          expenses: state.expenses.filter(
            (expense) => expense.category !== categoryName
          ),
          categories: state.categories.filter(
            (category) => category.name !== categoryName
          ),
        })
      );
    } catch (e) {
      console.log(e);
    }
  };

  function onDeleteCategory() {
    dispatch({ type: "REMOVE_CATEGORY", payload: categoryName });
    saveData();
    setVisible(false);
  }
  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>
          Supprimer la catégorie {categoryName} ?
        </Text>
        <View style={styles.modalChoices}>
          <Pressable onPress={onDeleteCategory}>
            <Text style={styles.modalChoice}>Oui</Text>
          </Pressable>
          <Pressable onPress={() => setVisible(false)}>
            <Text style={styles.modalChoice}>Non</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    padding: 10,
    width: "90%",
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: "#5A429B",
    borderRadius: 18,
    position: "absolute",
    bottom: "50%",
    left: "5%",
  },
  modalTitle: {
    fontSize: 15,
    fontWeight: "bold",
    alignItems: "center",
    textAlign: "center",
    color: "#5A429B",

    margin: 10,
  },
  modalChoices: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  modalChoice: {
    backgroundColor: "#5A429B",
    padding: 5,
    borderRadius: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: "#E8DEF8",
  },
});
