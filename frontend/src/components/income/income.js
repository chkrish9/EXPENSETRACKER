import React, { useState } from "react";
import { useGlobalContext } from "../../context/globalContext";
import { DataView } from 'primereact/dataview';
import { Button } from 'primereact/button';
import { TransactionForm } from '../transaction/transactionForm';
import { TransactionBlock } from '../transaction/transactionBlock';

function Income() {
  const { incomes, addIncome, deleteIncome, totalIncome, getIncomeCategories } = useGlobalContext();
  const [visible, setVisible] = useState(false);

  const listTemplate = ((items) => {
    if (!items || items.length === 0) return null;

    let list = items.map((income) => {
      return <TransactionBlock transaction={income} deleteTransaction={deleteIncome} key={income._id} type={"income"} />;
    });

    return <div className="grid grid-nogutter">{list}</div>;
  });

  const onAdd = (incomeDetails) => {
    incomeDetails = { ...incomeDetails, category: typeof incomeDetails.category === "string" ? incomeDetails.category : incomeDetails.category.code, date: new Date(incomeDetails.date).toLocaleDateString() }
    addIncome(incomeDetails);
    setVisible(false);
  }

  const onCacel = () => {
    setVisible(false);
  }
  return (
    <>
      <h1>Total Income:{totalIncome()}</h1>
      <div className="card">
        <DataView value={incomes} listTemplate={listTemplate} />
      </div>
      <TransactionForm header={"Add Income"} visible={visible} onAdd={onAdd} onCacel={onCacel} categoryOptions={getIncomeCategories()} />
      <Button icon="pi pi-plus" className="fixed add-icon" rounded severity="info" aria-label="Add" onClick={() => setVisible(!visible)} />
    </>
  );
}

export default Income;
