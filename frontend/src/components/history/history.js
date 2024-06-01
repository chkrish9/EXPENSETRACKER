import React from 'react'
import { useGlobalContext } from '../../context/globalContext'


function History() {
    const {transactionHistory} = useGlobalContext()

    const [...history] = transactionHistory()

    return (
       <h1>History</h1>
    )
}

export default History