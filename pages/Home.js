import ExpenseCreator from "../components/modals/ExpenseCreator";
import Expenses from "../components/Expenses";
import CategoryCreator from "../components/modals/CategoryCreator";
import Header from "../components/Header";
import Recap from "../components/Recap";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text } from "react-native";
import colors from "../utils/colors";
import { useExpenseContext } from "../utils/context/ExpenseContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BudgetCreator from "../components/modals/BudgetCreator";

export default function Home() {
  const [isExpenseModalVisible, setExpenseModalVisible] = useState(false);
  const [isCategoryModalVisible, setCategoryModalVisible] = useState(false);
  const [isBudgetModalVisible, setBudgetModalVisible] = useState(false);
  const [isLoading, setLoading] = useState(true);

  const { state, dispatch } = useExpenseContext();
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("expensesTests");
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    if (state !== null) {
      setLoading(false);
      getData().then((data) => {
        if (data !== null) {
          dispatch({ type: "INIT_EXPENSES", payload: data });
        }
      });
    }
  }, [state]);
  if (isLoading) {
    return (
      <View>
        <Text>Chargement en cours</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Header budgetTitle={state.name} />
      <Recap />
      <BudgetCreator
        isVisible={isBudgetModalVisible}
        setVisible={setBudgetModalVisible}
      />
      <ExpenseCreator
        isVisible={isExpenseModalVisible}
        setVisible={setExpenseModalVisible}
      />
      <CategoryCreator
        isVisible={isCategoryModalVisible}
        setVisible={setCategoryModalVisible}
      />
      <Expenses />
      {!isCategoryModalVisible && !isExpenseModalVisible ? (
        <Footer
          setExpenseModalVisible={setExpenseModalVisible}
          setCategoryModalVisible={setCategoryModalVisible}
          setBudgetModalVisible={setBudgetModalVisible}
        />
      ) : null}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
  },
});
