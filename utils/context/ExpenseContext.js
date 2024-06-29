import { createContext, useContext, useReducer } from "react";

const ExpenseContext = createContext();

const initialState = {
  name: "Demo budget",
  startMoney: 2700.0,
  max_id: 0,
  expenses: [
    {
      id: 0,
      name: "Demo expense",
      amount: "50.0",
      category: "Demo category",
      completed: false,
    },
  ],
  categories: [
    {
      name: "Demo category",
      budget: 200.0,
      recurrent: false,
    },
  ],
  history: [],
};

const expenseReducer = (state, action) => {
  switch (action.type) {
    case "NEW_BUDGET":
      return action.payload;
    case "INIT_EXPENSES":
      return action.payload;
    case "ADD_EXPENSE":
      return {
        ...state,
        max_id: state.max_id + 1,
        expenses: [...state.expenses, action.payload],
      };
    case "UPDATE_EXPENSE":
      return {
        ...state,
        expenses: state.expenses.map((expense) =>
          expense.id === action.payload.id ? action.payload : expense
        ),
      };
    case "TOGGLE_EXPENSE":
      return {
        ...state,
        expenses: state.expenses.map((expense) =>
          expense.id === action.payload
            ? { ...expense, completed: !expense.completed }
            : expense
        ),
      };
    case "REMOVE_EXPENSE":
      return {
        ...state,
        expenses: state.expenses.filter(
          (expense) => expense.id !== action.payload
        ),
      };
    case "ADD_CATEGORY":
      return {
        ...state,
        categories: [...state.categories, action.payload],
      };
    case "UPDATE_CATEGORY":
      return {
        ...state,
        categories: state.categories.map((category) =>
          category.name === action.payload.name ? action.payload : category
        ),
      };
    case "REMOVE_CATEGORY":
      return {
        ...state,
        categories: state.categories.filter(
          (category) => category.name !== action.payload
        ),
        expenses: state.expenses.filter(
          (expense) => expense.category !== action.payload
        ),
      };
  }
};

export const ExpenseProvider = ({ children }) => {
  const [state, dispatch] = useReducer(expenseReducer, initialState);

  return (
    <ExpenseContext.Provider value={{ state, dispatch }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenseContext = () => useContext(ExpenseContext);
