import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";

export const TransactionForm = ({
  visible,
  onSubmit,
  onCancel,
  categoryOptions,
  subCategoryOptions,
  accountOptions,
  header,
  type,
  mode,
  transaction,
}) => {
  const footerContent = (
    <div>
      <Button
        label="Cancel"
        icon="pi pi-times"
        onClick={() => {
          onCancel();
          resetInputState();
        }}
        className="p-button-text"
      />
      <Button
        label={mode === "Add" ? "Add" : "Update"}
        icon="pi pi-check"
        onClick={() => {
          onSubmit(inputState);
          resetInputState();
        }}
        autoFocus
      />
    </div>
  );
  const [inputState, setInputState] = useState({
    title: "",
    amount: "",
    date: "",
    category: "",
    subCategory: "",
    account: "",
    description: "",
  });

  const [subCategories, setSubCategories] = useState([]);

  const { title, amount, date, category, description, subCategory, account } =
    inputState;

  const handleInput = (name) => (e) => {
    setInputState({ ...inputState, [name]: e.target.value });
  };

  const resetInputState = (e) => {
    setInputState({
      title: "",
      amount: "",
      date: "",
      category: "",
      subCategory: "",
      account: "",
      description: "",
    });
  };

  useEffect(() => {
    if (transaction) {
      setSubCategories(
        subCategoryOptions.filter((sub) => sub.parent === transaction.category)
      );
      transaction.category = categoryOptions.find(
        (cat) => cat.code === transaction.category
      );
      transaction.subCategory = subCategoryOptions.find(
        (cat) => cat.code === transaction.subCategory
      );
      transaction.account = accountOptions.find(
        (account) => account.code === transaction.account
      );
      transaction.date = new Date(transaction.date);
      setInputState(transaction);
    }
  }, [transaction]);

  return (
    <div className="card flex justify-content-center">
      <Dialog
        header={header}
        visible={visible}
        onHide={() => {
          if (!visible) return;
          onCancel(false);
          resetInputState();
        }}
        footer={footerContent}
      >
        <div className="w-full">
          <InputText
            value={title}
            name={"title"}
            placeholder="Title"
            className="w-full my-2"
            onChange={handleInput("title")}
          />
        </div>
        <div className="w-full">
          <InputNumber
            value={amount}
            type="text"
            name={"amount"}
            placeholder={"Amount"}
            className="w-full my-2"
            onValueChange={handleInput("amount")}
            minFractionDigits={2}
          />
        </div>
        <div className="w-full">
          <Calendar
            placeholder="Date"
            dateFormat="mm/dd/yy"
            className="w-full my-2"
            onChange={(e) => {
              setInputState({ ...inputState, date: e.value });
            }}
            value={date}
            showIcon
          />
        </div>
        <div className="w-full">
          <Dropdown
            value={category}
            name="category"
            id="category"
            editable
            onChange={(e) => {
              setSubCategories(
                subCategoryOptions.filter((sub) => sub.parent === e.value.code)
              );
              setInputState({
                ...inputState,
                category: e.value,
                subCategory: "",
              });
            }}
            options={categoryOptions}
            optionLabel="name"
            placeholder="Category"
            className="w-full my-2"
          />
        </div>
        <div className="w-full">
          <Dropdown
            value={subCategory}
            name="subCategory"
            id="subCategory"
            editable
            onChange={(e) => {
              setInputState({ ...inputState, subCategory: e.value });
            }}
            options={subCategories}
            optionLabel="name"
            placeholder="Sub Category"
            className="w-full my-2"
          />
        </div>
        <div className="w-full">
          <Dropdown
            value={account}
            name="account"
            id="account"
            editable
            onChange={(e) => {
              setInputState({ ...inputState, account: e.value });
            }}
            options={accountOptions}
            optionLabel="name"
            placeholder={type === "expenses" ? "Paid By" : "Account"}
            className="w-full my-2"
          />
        </div>
        <div className="w-full">
          <InputTextarea
            name="description"
            value={description}
            placeholder="Description"
            id="description"
            cols="30"
            rows="4"
            className="w-full my-2"
            onChange={handleInput("description")}
          />
        </div>
      </Dialog>
    </div>
  );
};
