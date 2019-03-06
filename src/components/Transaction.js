import React from 'react';

const Transaction = (props) => {
    return (
        <div>
            <h4>{props.transaction.category}</h4>
            <ul>
                <li>{props.transaction.date}</li>
                <li>{props.transaction.amount}</li>
                <li>{props.transaction.note}</li>
            </ul>
        </div>
    )
}

export default Transaction;