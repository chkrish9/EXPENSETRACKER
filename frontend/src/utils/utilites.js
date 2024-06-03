
import {dashboard, expenses, trend} from './icons';

const replaceChar = '#';
const capitalizeFirstLetter = (string) => {
    if(typeof string !== "string") return;
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const getCode = (string) => {
    if(typeof string !== "string") return;
    return string.toLowerCase().replaceAll(' ', replaceChar);
}

export const getName = (string) => {
    if(typeof string !== "string") return;
    return capitalizeFirstLetter(string).replaceAll(replaceChar, ' ');
}

export const getMenuItems = () => {
    return [
        {
            id: 1,
            title: 'Dashboard',
            icon: dashboard,
            link: '/dashboard'
        },
        {
            id: 2,
            title: "Incomes",
            icon: trend,
            link: "/incomes"
        },
        {
            id: 3,
            title: "Expenses",
            icon: expenses,
            link: "/expenses"
        },
    ]
}