import React from 'react';
import TransactionList from "./TransactionList";
import Emoji from "./Emoji";

class ExpenseCategory extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="container expense">
                <p>
                    <Emoji symbol={this.props.icon}/>
                    <span className="category-name">{this.props.category}</span> <span className="category-amount red-text">${this.props.spent}</span>
                </p>
                {/* {<TransactionList transactions={this.props.transactions}/>} */}
            </div>
        )
    }; 
}

export default ExpenseCategory;