import React from 'react'
import { bitcoin, book, calender, card, circle, clothing, comment, dollar, food, medical, money, piggy, stocks, takeaway, trash, tv, users } from '../../utils/icons';

function IncomeItem({
    id,
    title,
    amount,
    date,
    category,
    description,
    deleteItem,
    indicatorColor,
    type
}) {

    const categoryIcon = () =>{
        switch(category) {
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

    const expenseCatIcon = () => {
        switch (category) {
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
            case 'other':
                return circle;
            default:
                return ''
        }
    }

    return (
        <h1>Income Item</h1>
    )
}

export default IncomeItem