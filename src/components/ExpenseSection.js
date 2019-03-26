import React from 'react'
import ExpenseCategoriesList from "./ExpenseCategoriesList";
import AddExpenseCategory from "./AddExpenseCategory";

class ExpenseSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addCategoryButtonClicked: false
        }

        this.handleAddCategoryClick = this.handleAddCategoryClick.bind(this);
    }

    handleAddCategoryClick() {
        this.setState({addCategoryButtonClicked: !this.state.addCategoryButtonClicked});
    }

    render() {  
        return ( 
            <div className="container" id="expenses">
                <h3 id="expenses-header">Expenses</h3> 
            
                {this.state.addCategoryButtonClicked ? 
                    <AddExpenseCategory addCategory={this.props.addCategory}/> 
                    :
                    <div>
                        <p>
                            <button onClick={this.handleAddCategoryClick}id="add-category-button">
                                <i className="fas fa-plus-circle"></i> Add Category
                            </button>
                        </p> 
                    </div> 
                }
                <ExpenseCategoriesList 
                categories={this.props.categories}
                filterTransactions={this.props.filterTransactions} />  
            </div>
        )
    }
}

export default ExpenseSection;