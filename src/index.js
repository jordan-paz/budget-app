import React from 'react';
import ReactDOM from 'react-dom';
import Spend from "./components/Spend";
import ExpenseSection from "./components/ExpenseSection";
import TopSection from "./components/TopSection";
import 'bootstrap/dist/css/bootstrap.css';
import './index.css'; 

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            income: 0,
            categories: [
                {name: "Rent/Mortgage", spent: 0, icon: "🏠"},
                {name: "Utilities", spent: 0, icon: "💡"},
                {name: "Groceries", spent: 0, icon: "🛒"},
                {name: "Phone", spent: 0, icon: "📞"},
                {name: "Eating Out", spent: 0, icon: "🍔"},
                {name: "Gas", spent: 0, icon: "⛽"},
                {name: "Entertainment", spent: 0, icon: "🍿"}
            ],
            transactions: [],
            spent: 0,
            spendButtonClicked: false,
        };
        
        this.addCategory = this.addCategory.bind(this)
        this.filterTransactions = this.filterTransactions.bind(this);
        this.spend = this.spend.bind(this);
        this.getTotalSpent = this.getTotalSpent.bind(this);
        this.handleSpendClick = this.handleSpendClick.bind(this);
        this.updateCategorySpent = this.updateCategorySpent.bind(this);
        this.updateTransactions = this.updateTransactions.bind(this);
        this.updateIncome = this.updateIncome.bind(this);
    }

    //UPDATE CATEGORY, TRANSACTIONS ARRAY AND TOTAL SPENT VARIABLE .
    spend(transaction) {
        this.updateCategorySpent(transaction);
        this.updateTransactions(transaction);
    }

    //ADD THE NEW TRANSACTION OBJECT TO THE TRANSACTIONS ARRAY IN STATE
    updateTransactions(transaction) {
        const transactions = [...this.state.transactions];
        transactions.push(transaction);
        this.setState({transactions: transactions});
    }

    //UPDATE THE TOTAL SPENT AMOUNT FOR THE CATEGORY FROM WHICH THE TRANSACTION BELONGS TO 
    updateCategorySpent(transaction) {
        let categories = [...this.state.categories];
        const categoryIndex = categories.findIndex(category => category.name === transaction.category);
        categories[categoryIndex].spent += Number(transaction.amount);
        this.setState({categories: categories});
    }
    
    //REPLACE THE CURRENT INCOME WITH A NEW INCOME AMOUNT
    updateIncome(newIncome) {
        this.setState({income: Number(newIncome)});
    }

    //RETURN ALL TRANSACTIONS BELONGING TO A CERTAIN CATEGORY
    filterTransactions(category) {
        return this.state.transactions.filter(transaction => transaction.category === category);
    }

    //RETRN THE TOTAL AMOUNT SPENT FROM A CERTAIN CATEGORY
    getCategoryTotalSpent(category) {
        if(this.filterTransactions(category).length >= 1) {
            this.getTotalSpent(this.filterTransactions(category))
        } else {
            return 0;
        }
    }

    //PUSH A NEW CATEGORY INTO THE CATEGORIES ARRAY IN STATE
    addCategory(category) {
        let categories = [...this.state.categories]
        categories.push(category);
        this.setState({categories: categories});
    }

    //RETURN THE SUM OF ALL SELECTED TRANSACTIONS
    getTotalSpent(transactions) {
        let totalSpent = 0;
        transactions.forEach(transaction => {
            totalSpent += Number(transaction.amount)
        });
        return totalSpent;
    }

    handleSpendClick() {
        this.setState({spendButtonClicked: !this.state.spendButtonClicked});
    }

    render() {
        
        return (
            <div>

                <TopSection 
                income={this.state.income}
                remainingPercent={(this.state.income - this.getTotalSpent(this.state.transactions)) / this.state.income * 100} 
                spent={this.getTotalSpent(this.state.transactions)}
                updateIncome={this.updateIncome}
                handleEditIncomeClick={this.handleEditIncomeClick}
                getTotalSpent={this.getTotalSpent}
                transactions={this.state.transactions}
                />


                {this.state.spendButtonClicked ? 
                    
                    <Spend 
                    categories={this.state.categories} 
                    spend={this.spend} 
                    handleSpendClick={this.handleSpendClick}/>

                    :
                    <div>
                        <ExpenseSection 
                        addCategory={this.addCategory}
                        categories={this.state.categories}
                        filterTransactions={this.filterTransactions}/> 
                        
                        <button 
                        onClick={this.handleSpendClick}
                        type="button" 
                        className="btn btn-danger" 
                        id="spend-button">
                        Spend
                        </button>
                    </div>
                }

            </div>
        )
    };  
}

ReactDOM.render(
<App />,
document.getElementById('root')
);