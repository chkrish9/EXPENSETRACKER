import React, { useState } from "react";
import { useGlobalContext } from "../../context/globalContext";
import { DataView } from 'primereact/dataview';
import { bitcoin, card, money, piggy, stocks, users } from '../../utils/icons';
import { classNames } from 'primereact/utils';
import { Button } from 'primereact/button';
import { IncomeForm } from './incomeForm';

function Income() {
  const { incomes, addIncome, deleteIncome, totalIncome } = useGlobalContext();
  const [visible, setVisible] = useState(false);

  const categoryIcon = (category) => {
    switch (category) {
      case 'salary':
        return money;
      case 'investments':
        return stocks;
      case 'stocks':
        return users;
      case 'crypto':
        return bitcoin;
      case 'cashback':
        return card;
      case 'other':
        return piggy;
      default:
        return ''
    }
  }
  const itemTemplate = (income, index) => {
    return (
      <div className="col-12" key={income._id}>
        <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
          <div className="w-9 sm:w-16rem xl:w-10rem mx-auto flex justify-content-center">
            {categoryIcon(income.category)}
          </div>
          <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
            <div className="flex flex-column align-items-center sm:align-items-start gap-3">
              <div className="text-2xl font-bold text-900">{income.title}</div>
              <div>{income.description}</div>
              <div className="flex align-items-center gap-3">
                <span className="flex align-items-center gap-2">
                  <span className="font-semibold">{income.date}</span>
                </span>

              </div>
            </div>
            <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
              <span className="text-2xl font-semibold">${income.amount}</span>
              <Button icon="pi pi-trash" className="p-button-rounded" onClick={() => deleteIncome(income._id)}></Button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const listTemplate = ((items) => {
    if (!items || items.length === 0) return null;

    let list = items.map((income, index) => {
      return itemTemplate(income, index);
    });

    return <div className="grid grid-nogutter">{list}</div>;
  });

  const onAdd = (incomeDetails) => {
    incomeDetails = {...incomeDetails, category:incomeDetails.category.code, date: new Date(incomeDetails.date).toLocaleDateString()}
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
      <IncomeForm visible={visible} onAdd={onAdd} onCacel={onCacel}/>
      <Button icon="pi pi-plus" className="fixed add-icon" rounded severity="info" aria-label="Add" onClick={() => setVisible(!visible)}/>
    </>
  );
}

export default Income;
