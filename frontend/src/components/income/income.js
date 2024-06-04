import React, { useState } from "react";
import { useGlobalContext } from "../../context/globalContext";
import { DataView } from "primereact/dataview";
import { Button } from "primereact/button";
import { TransactionForm } from "../transaction/transactionForm";
import { TransactionBlock } from "../transaction/transactionBlock";
import { getCode } from "../../utils/utilites";

function Income() {
  const {
    incomes,
    addIncome,
    deleteIncome,
    updateIncome,
    totalIncome,
    getTransactionsCategories,
  } = useGlobalContext();
  const [visible, setVisible] = useState(false);
  const [income, setIncome] = useState(null);
  const [mode, setMode] = useState("Add");

  const listTemplate = (items) => {
    if (!items || items.length === 0) return null;

    let list = items.map((income) => {
      return (
        <TransactionBlock
          transaction={income}
          deleteTransaction={deleteIncome}
          updateTransaction={onUpdate}
          key={income._id}
          type={"income"}
          categories={getTransactionsCategories("incomes", "category")}
          subCategories={getTransactionsCategories(
            "incomes",
            "subCategory",
            "category"
          )}
          accounts={getTransactionsCategories("incomes", "account")}
        />
      );
    });

    return <div className="grid grid-nogutter">{list}</div>;
  };

  const onUpdate = (income) => {
    setIncome(income);
    setMode("Update");
    setVisible(true);
  };

  const onSubmit = (incomeDetails) => {
    incomeDetails = {
      ...incomeDetails,
      category:
        typeof incomeDetails.category === "string"
          ? getCode(incomeDetails.category)
          : incomeDetails.category.code,
      date: new Date(incomeDetails.date).toLocaleDateString(),
      subCategory:
        typeof incomeDetails.subCategory === "string"
          ? getCode(incomeDetails.subCategory)
          : incomeDetails.subCategory.code,
      account:
        typeof incomeDetails.account === "string"
          ? getCode(incomeDetails.account)
          : incomeDetails.account.code,
    };
    if (incomeDetails._id) {
      updateIncome(incomeDetails._id, incomeDetails);
      setIncome(null);
    } else {
      addIncome(incomeDetails);
    }
    setMode("Add");
    setVisible(false);
  };

  const onCancel = () => {
    setIncome(null);
    setVisible(false);
  };
  return (
    <>
      <h1>Total Income:{totalIncome()}</h1>
      <div className="card">
        <DataView value={incomes} listTemplate={listTemplate} />
      </div>
      <TransactionForm
        header={mode === "Add" ? "Add Income" : "Update Income"}
        visible={visible}
        onSubmit={onSubmit}
        onCancel={onCancel}
        mode={mode}
        categoryOptions={getTransactionsCategories("incomes", "category")}
        subCategoryOptions={getTransactionsCategories(
          "incomes",
          "subCategory",
          "category"
        )}
        accountOptions={getTransactionsCategories("incomes", "account")}
        type={"incomes"}
        transaction={income}
      />
      <Button
        icon="pi pi-plus"
        className="fixed add-icon"
        rounded
        severity="info"
        aria-label="Add"
        onClick={() => {
          setMode("Add");
          setVisible(!visible);
        }}
      />
    </>
  );
}

export default Income;
