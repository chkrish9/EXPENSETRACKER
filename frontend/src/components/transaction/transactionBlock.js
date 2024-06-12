import React from "react";
import {
  bitcoin,
  bank,
  entertainment,
  internet,
  sendmoney,
  car,
  rent,
  retirement,
  previousmoney,
  groceries,
  book,
  card,
  circle,
  food,
  money,
  piggy,
  stocks,
  takeaway,
  tv,
  gas,
  trip,
  health,
  laundry,
  mobile,
  expensedefault,
} from "../../utils/icons";
import { numberFormat } from "../../utils/utilites";
import { Button } from "primereact/button";
import moment from "moment";

export const TransactionBlock = ({
  transaction,
  deleteTransaction,
  updateTransaction,
  type,
  categories,
  subCategories,
  accounts,
}) => {
  const categoryIcon = (category) => {
    if (category === "other" && type === "income") {
      category = "piggy";
    } else if (category === "other" && type === "expense") {
      category = "expensedefault";
    }
    switch (category) {
      case "salary":
        return money;
      case "previous#month#money":
        return previousmoney;
      case "bank":
      case "savings":
        return bank;
      case "401k":
      case "hsa":
        return retirement;
      case "stocks":
        return stocks;
      case "crypto":
        return bitcoin;
      case "cash#back":
      case "credit#card#bill#payment":
      case "bofa-8653":
      case "chase-0789":
        return card;
      case "piggy":
        return piggy;
      case "education":
        return book;
      case "internet":
        return internet;
      case "mobile":
        return mobile;
      case "send#money":
        return sendmoney;
      case "car":
        return car;
      case "food":
        return food;
      case "rent":
        return rent;
      case "groceries":
        return groceries;
      case "subscriptions":
        return tv;
      case "take#aways":
        return takeaway;
      case "entertainment":
        return entertainment;
      case "gas":
        return gas;
      case "trip":
        return trip;
      case "circle":
        return circle;
      case "health":
        return health;
      case "laundry":
        return laundry;
      default:
        if (type === "income") {
          return piggy;
        } else if (type === "expense") {
          return expensedefault;
        }
    }
  };

  return (
    <div className="col-6 sm:col-4 lg:col-3 xl:col-2 p-2">
      <div className="p-2 border-1 surface-border surface-card border-round">
        <div className="flex flex-wrap align-items-center justify-content-center gap-2">
          <div className="flex align-items-center gap-2">
            {categories &&
            transaction.category &&
            subCategories &&
            transaction.subCategory ? (
              <>
                <span className="text-2xl font-semibold">
                  {categoryIcon(transaction.subCategory)}
                </span>
                <span className="hidden lg:flex xl:flex flex-column align-items-center">
                  <span className="">
                    {
                      categories.find(
                        (category) => category.code === transaction.category
                      )?.name
                    }
                  </span>
                  <span className="">
                    (
                    {
                      subCategories.find(
                        (category) => category.code === transaction.subCategory
                      )?.name
                    }
                    )
                  </span>
                  <span className="">
                    (
                    {
                      accounts.find(
                        (account) => account.code === transaction.account
                      )?.name
                    }
                    )
                  </span>
                </span>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="flex flex-column align-items-center gap-3 py-5">
          <span className="text-3xl">${numberFormat(transaction.amount)}</span>
          <div className="font-bold">{transaction.title}</div>
          <div className="font-bold">
            <span className="pi pi-calendar"></span>
            {moment(transaction.date).format("MM/DD/yyyy")}
          </div>
        </div>
        <div className="flex justify-content-center">
          <Button
            icon="pi pi-pencil"
            className="p-button-rounded mr-1"
            severity="info"
            onClick={() =>
              updateTransaction(JSON.parse(JSON.stringify(transaction)))
            }
          ></Button>
          <Button
            icon="pi pi-trash"
            className="p-button-rounded"
            severity="danger"
            onClick={() => deleteTransaction(transaction._id)}
          ></Button>
        </div>
      </div>
    </div>
  );
};
