import React from 'react';
import ReactDOM from 'react-dom';
import AddExpenseCategory from "./components/AddExpenseCategory";
import Spend from "./components/Spend";
import ExpenseCategory from "./components/ExpenseCategory";
import 'bootstrap/dist/css/bootstrap.css';
import './index.css'; 
import { Line } from 'rc-progress';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            income: 2000,
            totalSpent: 0,
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
            addCategoryButtonClicked: false
        };
        
        this.addCategory = this.addCategory.bind(this)
        this.filterTransactions = this.filterTransactions.bind(this);
        this.spend = this.spend.bind(this);
        this.getTotalSpent = this.getTotalSpent.bind(this);
        this.handleAddCategoryClick = this.handleAddCategoryClick.bind(this);
        this.handleSpendClick = this.handleSpendClick.bind(this);
        this.updateCategory = this.updateCategory.bind(this);
        this.updateTransactions = this.updateTransactions.bind(this);
        this.updateTotalSpent = this.updateTotalSpent.bind(this);
    }

    //Create a transaction and push it to the transactions array.
    spend(transaction) {
        this.updateCategory(transaction);
        this.updateTransactions(transaction);
        this.updateTotalSpent(transaction);
    }

    updateTotalSpent(transaction) {
        const totalSpent = this.state.totalSpent;
        const amount = Number(transaction.amount);
        this.setState({totalSpent: totalSpent + amount })
    }

    updateTransactions(transaction) {
        const transactions = [...this.state.transactions];
        transactions.push(transaction);
        this.setState({transactions: transactions});
    }

    updateCategory(transaction) {
        let categories = [...this.state.categories];
        const categoryIndex = categories.findIndex(category => category.name === transaction.category);
        categories[categoryIndex].spent += Number(transaction.amount);
        console.log(categories[categoryIndex].spent)
        this.setState({categories: categories});
    }
    

    filterTransactions(category) {
        return this.state.transactions.filter(transaction => transaction.category === category);
    }

    getCategoryTotalSpent(category) {
        if(this.filterTransactions(category).length >= 1) {
            this.getTotalSpent(this.filterTransactions(category))
        } else {
            return 0;
        }
    }

    addCategory(category) {
        let categories = [...this.state.categories]
        categories.push(category);
        this.setState({categories: categories});
    }

    getTotalSpent(transactions) {
        let totalSpent = 0;
        transactions.forEach(transaction => {
            totalSpent += Number(transaction.amount)
        });
        return totalSpent;
    }

    handleAddCategoryClick() {
        this.setState({addCategoryButtonClicked: !this.state.addCategoryButtonClicked});
    }

    handleSpendClick() {
        this.setState({spendButtonClicked: !this.state.spendButtonClicked});
    }

    render() {
        let progressPercent = (this.state.income - this.state.totalSpent) / this.state.income * 100;
        
        return (
            <div className="container">

                
                <div className="container" id="top-area">
                    <h4>March</h4>
                    <div className="container">
                        <h2>Remaining in Budget</h2> 
                        <h3 className="green-text">${this.state.income - this.state.totalSpent}/${this.state.income}</h3>

                        <div >
                            <Line trailWidth="4" percent={progressPercent} strokeWidth="4" strokeColor="rgb(20, 180, 20)" />
                        </div>
                        


                    </div>
                </div>
                {this.state.spendButtonClicked ? 
                    <section id="spend">
                        <Spend spend={this.spend} handleSpendClick={this.handleSpendClick}/>
                    </section>
                    :
                    <div className="container" id="expenses">
                    
                    <section id="expenses-header">
                        <h3>Expenses</h3>
                        
                    </section>

                    {this.state.addCategoryButtonClicked ? 
                        <AddExpenseCategory addCategory={this.addCategory}/> 
                        :
                        <div>
                            <p>
                                <button onClick={this.handleAddCategoryClick}id="add-category-button">
                                    + Add Category
                                </button>
                            </p> 
                        </div> 
                    
                    }
                    
                    {this.state.categories.map((category) => {
                        return <ExpenseCategory  
                            key={category.name}
                            icon={category.icon} 
                            category={category.name}
                            spent={category.spent}
                            transactions={this.filterTransactions(category.name)}/>
                    })}
                    
                </div>
                }

                {!this.state.spendButtonClicked ? 
                    <button 
                    onClick={this.handleSpendClick}
                    type="button" 
                    className="btn btn-danger" 
                    id="spend-button">
                        Spend
                    </button>
                    :
                    ""
                }

                <div id="bottom"></div>
            </div>
        )
    };  
}

ReactDOM.render(
<App />,
document.getElementById('root')
);