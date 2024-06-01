import React, { useEffect } from "react";
import { useGlobalContext } from "../../context/globalContext";


function Expense() {
  const { expenses, getExpenses, deleteExpense, totalExpenses } = useGlobalContext();
  
  useEffect(() => {
    getExpenses();
  }, []);

  return (
    <h1>Expenses</h1>
  );
}

export default Expense;
