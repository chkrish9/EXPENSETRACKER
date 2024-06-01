import React, { useState } from 'react'
import { useGlobalContext } from '../../context/globalContext';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';


export const IncomeForm = ({ visible, onAdd, onCacel }) => {
    const footerContent = (
        <div>
            <Button
                label="Cancel"
                icon="pi pi-times"
                onClick={() => {
                    onCacel();
                    resetInputState();
                }}
                className="p-button-text" />
            <Button
                label="Add"
                icon="pi pi-check"
                onClick={() => {
                    onAdd(inputState);
                    resetInputState();
                }} autoFocus />
        </div>
    );
    const { getIncomeCategories } = useGlobalContext()
    const [inputState, setInputState] = useState({
        title: '',
        amount: '',
        date: '',
        category: '',
        description: '',
    })

    const { title, amount, date, category, description } = inputState;

    const handleInput = name => e => {
        setInputState({ ...inputState, [name]: e.target.value })
    }

    const resetInputState = e => {
        setInputState({
            title: '',
            amount: '',
            date: '',
            category: '',
            description: '',
        })
    }

    return (
        <div className="card flex justify-content-center">
            <Dialog header="Add Income" visible={visible} onHide={() => { if (!visible) return; onCacel(false); }} footer={footerContent}>
                <div className='w-full'>
                    <InputText
                        value={title}
                        name={'title'}
                        placeholder="Income"
                        className='w-full my-2'
                        onChange={handleInput('title')} />
                </div>
                <div className='w-full'>
                    <InputNumber
                        value={amount}
                        type="text"
                        name={'amount'}
                        placeholder={'Amount'}
                        className='w-full my-2'
                        onValueChange={handleInput('amount')}
                        minFractionDigits={2} />
                </div>
                <div className='w-full'>
                    <Calendar
                        placeholder='Date'
                        dateFormat="dd/mm/yy"
                        className='w-full my-2'
                        onChange={(e) => {
                            setInputState({ ...inputState, date: e.value })
                        }}
                        value={date}
                        showIcon />
                </div>
                <div className='w-full'>
                    <Dropdown
                        value={category}
                        name="category"
                        id="category"
                        onChange={(e) => {
                            setInputState({ ...inputState, category: e.value })
                        }}
                        options={getIncomeCategories()}
                        optionLabel="name"
                        placeholder="Select Category"
                        className="w-full my-2" />
                </div>
                <div className='w-full'>
                    <InputTextarea
                        name="description"
                        value={description}
                        placeholder='Description'
                        id="description"
                        cols="30"
                        rows="4"
                        className='w-full my-2'
                        onChange={handleInput('description')} />
                </div>
            </Dialog>
        </div>
    )
}