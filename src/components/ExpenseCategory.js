import React from 'react';
import TransactionList from "./TransactionList";
import Emoji from "./Emoji";

class ExpenseCategory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expandClicked: false
        }

        this.handleExpandClick = this.handleExpandClick.bind(this);
    }

    handleExpandClick() {
        this.setState({expandClicked: !this.state.expandClicked});
    }
    render() {
        return (
            <div className="container expense">
                <p>
                    <Emoji symbol={this.props.icon}/>
                    <span className="category-name">{this.props.category}</span> 
                    <span className="category-amount red-text">${this.props.spent}</span>
                    <button 
                    className="category-expand-button"
                    onClick={this.handleExpandClick}
                        ><i className="fas fa-plus-circle"></i>
                    </button>
                </p>
                {this.state.expandClicked && this.props.transactions.length > 0 ?
                    <TransactionList transactions={this.props.transactions}/>
                   :
                   null 
                }
            </div>
        )
    }; 
}

export default ExpenseCategory;