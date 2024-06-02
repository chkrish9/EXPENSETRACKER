import React, { useState } from "react";
import { useGlobalContext } from "../../context/globalContext";
import { DataView } from 'primereact/dataview';
import { Button } from 'primereact/button';
import { TransactionForm } from '../transaction/transactionForm';
import { TransactionBlock } from '../transaction/transactionBlock';
import { getCode } from '../../utils/utilites';

function Income() {
  const { incomes, addIncome, deleteIncome, totalIncome, getTransactionsCategories } = useGlobalContext();
  const [visible, setVisible] = useState(false);

  const listTemplate = ((items) => {
    if (!items || items.length === 0) return null;

    let list = items.map((income) => {
      return <TransactionBlock
        transaction={income}
        deleteTransaction={deleteIncome}
        key={income._id}
        type={"income"}
        categories={getTransactionsCategories('incomes', 'category')}
        subCategories={getTransactionsCategories('incomes', 'subCategory', 'category')} />;
    });

    return <div className="grid grid-nogutter">{list}</div>;
  });

  const onAdd = (incomeDetails) => {
    incomeDetails = {
      ...incomeDetails,
      category: typeof incomeDetails.category === "string" ?
        getCode(incomeDetails.category) :
        incomeDetails.category.code, date: new Date(incomeDetails.date).toLocaleDateString(),
      subCategory: typeof incomeDetails.subCategory === "string" ?
        getCode(incomeDetails.subCategory) :
        incomeDetails.subCategory.code,
    }
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
      <TransactionForm
        header={"Add Income"}
        visible={visible}
        onAdd={onAdd}
        onCacel={onCacel}
        categoryOptions={getTransactionsCategories('incomes', 'category')}
        subCategoryOptions={getTransactionsCategories('incomes', 'subCategory', 'category')}
        type={"incomes"} />
      <Button
        icon="pi pi-plus"
        className="fixed add-icon"
        rounded
        severity="info"
        aria-label="Add"
        onClick={() => setVisible(!visible)} />
    </>
  );
}

export default Income;
