import React from 'react';
import ExpenseCategory from "./ExpenseCategory"

const ExpenseCategoriesList = (props) => (  
    <div>
        {props.categories.map((category) => {
            return <ExpenseCategory  
                key={category.name}
                icon={category.icon} 
                category={category.name}
                spent={category.spent}
                transactions={props.filterTransactions(category.name)}/>
        })}
    </div>
)

export default ExpenseCategoriesList