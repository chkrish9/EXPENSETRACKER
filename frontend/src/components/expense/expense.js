import React, { useState } from "react";
import { useGlobalContext } from "../../context/globalContext";
import { DataView } from 'primereact/dataview';
import { Button } from 'primereact/button';
import { TransactionForm } from '../transaction/transactionForm';
import { TransactionBlock } from '../transaction/transactionBlock';
import { getCode } from '../../utils/utilites';

function Expense() {
  const { expenses, addExpense, updateExpense, getTransactionsCategories, deleteExpense, totalExpenses } = useGlobalContext();

  const [visible, setVisible] = useState(false);
  const [expense, setExpense] = useState(null);
  const [mode, setMode] = useState('Add');

  const listTemplate = ((items) => {
    if (!items || items.length === 0) return null;

    let list = items.map((expense) => {
      return <TransactionBlock
        transaction={expense}
        deleteTransaction={deleteExpense}
        updateTransaction={onUpdate}
        key={expense._id}
        type={"expense"}
        categories={getTransactionsCategories('expenses', 'category')}
        subCategories={getTransactionsCategories('expenses', 'subCategory', 'category')} />;
    });

    return <div className="grid grid-nogutter">{list}</div>;
  });

  const onUpdate = (expense) => {
    setExpense(expense);
    setMode("Update");
    setVisible(true);
  }

  const onSubmit = (expenseDetails) => {
    expenseDetails = {
      ...expenseDetails,
      category: typeof expenseDetails.category === "string" ?
        getCode(expenseDetails.category) :
        expenseDetails.category.code, date: new Date(expenseDetails.date).toLocaleDateString(),
      subCategory: typeof expenseDetails.subCategory === "string" ?
        getCode(expenseDetails.subCategory) :
        expenseDetails.subCategory.code,
      paidBy: typeof expenseDetails.paidBy === "string" ?
        getCode(expenseDetails.paidBy) :
        expenseDetails.paidBy.code,
    }
    if (expenseDetails._id) {
      updateExpense(expenseDetails._id, expenseDetails);
      setExpense(null);
    } else {
      addExpense(expenseDetails);
    }
    setMode("Add");
    setVisible(false);
  }

  const onCancel = () => {
    setExpense(null);
    setVisible(false);
  }

  return (
    <>
      <h1>Total Expense:{totalExpenses()}</h1>
      <div className="card">
        <DataView value={expenses} listTemplate={listTemplate} />
      </div>
      <TransactionForm
        header={mode === "Add" ? "Add Expense" : "Update Expense"}
        visible={visible}
        onSubmit={onSubmit}
        onCancel={onCancel}
        mode={mode}
        categoryOptions={getTransactionsCategories('expenses', 'category')}
        subCategoryOptions={getTransactionsCategories('expenses', 'subCategory', 'category')}
        paidByOptions={getTransactionsCategories('expenses', 'paidBy')}
        type={"expenses"}
        transaction={expense} />
      <Button
        icon="pi pi-plus"
        className="fixed add-icon"
        rounded
        severity="info"
        aria-label="Add"
        onClick={() =>{
          setMode("Add");
          setVisible(!visible)
        }} />
    </>
  );
}

export default Expense;
