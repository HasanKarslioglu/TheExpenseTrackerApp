import { useContext, useEffect, useState } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { fetchExpense } from "../util/htpp";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import ErrorOverlay from "../components/ui/ErrorOverlay";

function RecentExpenses() {
  const [isFatching, setIsFatching] = useState(true);
  const [error, setError] = useState();
  const expenseCtx = useContext(ExpensesContext);

  useEffect(() => {
    async function getExpense() {
      setIsFatching(true);
      try {
        const expenses = await fetchExpense();
      } catch (error) {
        setError("Could not fetch expenses!");
      }
      setIsFatching(false);
      expenseCtx.setExpenses(expenses);
    }

    getExpense();
  }, []);

  function errorHandler() {
    setError(null);
  }

  if (error && !isFatching) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }

  if (isFatching) {
    return <LoadingOverlay />;
  }

  const recentExpenses = expenseCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date > date7DaysAgo && expense.date <= today;
  });

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 Days"
      fallbackText="No expenses registered last 7 days."
    />
  );
}

export default RecentExpenses;
