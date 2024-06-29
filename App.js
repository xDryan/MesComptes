import { ExpenseProvider } from "./utils/context/ExpenseContext";

import Home from "./pages/Home";

export default function App() {
  return (
    <ExpenseProvider>
      <Home />
    </ExpenseProvider>
  );
}
