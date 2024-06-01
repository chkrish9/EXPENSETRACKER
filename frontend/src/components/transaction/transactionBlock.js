import React from 'react'
import { bitcoin, book, card, circle, clothing, food, medical, money, piggy, stocks, takeaway, tv, users } from '../../utils/icons';
import { Button } from 'primereact/button';

export const TransactionBlock = ({
    transaction, deleteTransaction, type
}) => {

    const categoryIcon = (category) => {
        if(category === "other" && type==="income"){
            category = "piggy";
        }else if(category === "other" && type==="expense"){
            category = "circle"
        }
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
            case 'piggy':
                return piggy;
            case 'education':
                return book;
            case 'groceries':
                return food;
            case 'health':
                return medical;
            case 'subscriptions':
                return tv;
            case 'takeaways':
                return takeaway;
            case 'entertainment':
                return clothing;
            case 'circle':
                return circle;
            default:
                return ''
        }
    }

    return (
        <div className="col-6 sm:col-4 lg:col-3 xl:col-2 p-2">
            <div className="p-4 border-1 surface-border surface-card border-round">
                <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                    <div className="flex align-items-center gap-2">
                        {transaction.category}
                    </div>
                </div>
                <div className="flex flex-column align-items-center gap-3 py-5">
                    {categoryIcon(transaction.category)}
                    <div className="text-2xl font-bold">{transaction.title}</div>
                </div>
                <div className="flex align-items-center justify-content-between">
                    <span className="text-2xl font-semibold">${transaction.amount}</span>
                    <Button icon="pi pi-trash" className="p-button-rounded" onClick={() => deleteTransaction(transaction._id)}></Button>
                </div>
            </div>
        </div>
    )
}