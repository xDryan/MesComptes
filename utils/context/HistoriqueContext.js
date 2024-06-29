import { createContext, useContext, useReducer } from "react";

const HistoriqueContext = createContext();

const initialState = {
  budgets: [],
};

const historiqueReducer = (state, action) => {
  switch (action.type) {
    case "INIT_HISTORIQUE":
      return action.payload;
    case "ADD_BUDGET":
      return {
        budgets: [...state.budgets, action.payload],
      };
    case "RESET_HISTORIQUE":
      return {
        budgets: [],
      };
  }
};

export const historiqueProvider = ({ children }) => {
  const [state, dispatch] = useReducer(historiqueReducer, initialState);

  return (
    <HistoriqueContext.Provider value={{ state, dispatch }}>
      {children}
    </HistoriqueContext.Provider>
  );
};

export const useHistoriqueContext = () => useContext(HistoriqueContext);
