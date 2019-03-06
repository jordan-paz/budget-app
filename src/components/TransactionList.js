import React from 'react';
import Transaction from "./Transaction"

const TransactionList = (props) => {
    return(
        <div>
            <ul>
                {props.transactions.map((transaction) => 
                    <li key={
                        transaction.date.toString()
                        + transaction.category.toString()
                        + transaction.amount.toString()
                    }>
                        <Transaction transaction={transaction}/>
                    </li>
                )}
            </ul>  
        </div>
    )
}

export default TransactionList;
