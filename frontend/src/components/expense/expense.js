import React, { useState } from "react";
import { useGlobalContext } from "../../context/globalContext";
import { DataView } from 'primereact/dataview';
import { Button } from 'primereact/button';
import { TransactionForm } from '../transaction/transactionForm';
import { TransactionBlock } from '../transaction/transactionBlock';


function Expense() {
  const { expenses, addExpense, getExpenseCategories, deleteExpense, totalExpenses } = useGlobalContext();
  
  const [visible, setVisible] = useState(false);

  const listTemplate = ((items) => {
    if (!items || items.length === 0) return null;

    let list = items.map((expense) => {
      return <TransactionBlock transaction={expense} deleteTransaction={deleteExpense} key={expense._id} type={"expense"}/>;
    });

    return <div className="grid grid-nogutter">{list}</div>;
  });

  const onAdd = (expenseDetails) => {
    expenseDetails = { ...expenseDetails, category: expenseDetails.category.code, date: new Date(expenseDetails.date).toLocaleDateString() }
    addExpense(expenseDetails);
    setVisible(false);
  }

  const onCacel = () => {
    setVisible(false);
  }

  return (
    <>
      <h1>Total Expense:{totalExpenses()}</h1>
      <div className="card">
        <DataView value={expenses} listTemplate={listTemplate} />
      </div>
      <TransactionForm header={"Add Expense"} visible={visible} onAdd={onAdd} onCacel={onCacel} categoryOptions={getExpenseCategories()} />
      <Button icon="pi pi-plus" className="fixed add-icon" rounded severity="info" aria-label="Add" onClick={() => setVisible(!visible)} />
    </>
  );
}

export default Expense;
