import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function MonthlyIncome (props) {
    return (
        <form>
            <label>
                Monthly Income:
                <input type="text" value={props.amount} onChange={props.handleChange}/>
            </label>
        </form>
    );
}

function RemainingMoney (props) { 
    return <p>Remaining Money: ${props.remainingMoney}</p>
}  


function ExpenseItem (props) {
    return (
        <div>
            <form>
                <label>
                    Item:
                    <input type="text" value={props.name} />
                </label>
                <br/>
                <label>
                    Amount:
                    <input 
                        type="text"
                        onChange={props.handleExpenseAmountChange}
                        name={props.name} 
                        value={props.amount}/>
                </label>
            </form>
            <h4>Amount Remaining in budget: {props.amountRemaining}</h4>
            <br/>
        </div>
    );
}

class Spend extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            amountSpent: ""
        }
        this.handleAmountSpentChange = this.handleAmountSpentChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    handleNameChange(e) {
        const name = e.target.value;
        this.setState({name: name});
    }
    handleAmountSpentChange(e) {
        const amountSpent = e.target.value;
        this.setState({amountSpent: amountSpent});
    }
    handleSubmit(e) {
        e.preventDefault();
        const transaction = {
            name: this.state.name,
            amountSpent: this.state.amountSpent
        }
        this.props.spend(transaction)
        this.setState({
            name: "",
            amountSpent: ""
        })
    }

    render() {
        return (
            <div>
                <h1>Spend</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>Item Name:</label>
                    <input type="text" value={this.state.name} onChange={this.handleNameChange}/>
                    <br/>
                    <label>Amount Spent:</label>
                    <input type="text" value={this.state.amountSpent} onChange={this.handleAmountSpentChange}/>
                    <br/>
                    <button type="submit">Submit</button>
                </form>
                <br/>
            </div>
        )
    }
}

class AddExpense extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            amount: "",
            amountRemaining: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleAmountChange = this.handleAmountChange.bind(this);
    };

    handleNameChange(e) {
        const name = e.target.value;
        this.setState({name: name});
    }
    handleAmountChange(e) {
        const amount = e.target.value;
        this.setState({amount: amount});
    }
    handleSubmit(e) {
        e.preventDefault();
        const expense = {
            name: this.state.name,
            amount: Number(this.state.amount),
            amountRemaining: Number(this.state.amount)
        }
        this.props.addExpense(expense)
        this.setState({
            name: "",
            amount: "",
            amountRemaining: ""
        })
    }

    render() {
        return (
            <div>
                <h1>Add Expense</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>Item Name:</label>
                    <input type="text" value={this.state.name} onChange={this.handleNameChange}/>
                    <br/>
                    <label>Amount:</label>
                    <input type="text" value={this.state.amount} onChange={this.handleAmountChange}/>
                    <br/>
                    <button type="submit">Submit</button>
                </form>
                <br/>
            </div>
        )
    }
}

class Budget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            income: "",
            expenses: [],
            remainingMoney: ""
        };
        
        this.addExpense = this.addExpense.bind(this)
        this.handleIncomeChange = this.handleIncomeChange.bind(this);
        this.handleExpenseAmountChange = this.handleExpenseAmountChange.bind(this);
        this.handleExpenseNameChange = this.handleExpenseNameChange.bind(this);
        this.spend = this.spend.bind(this);
    }

    componentDidUpdate() {
        console.log(this.state.expenses)
    }

    spend(transaction) {
        const expenses = [...this.state.expenses];
        const index = expenses.findIndex(expense => expense.name === transaction.name);
        if (expenses[index]) {
            expenses[index].amountRemaining -= Number(transaction.amountSpent);
            this.setState({expenses: expenses});
        }
    } 

    addExpense(expense) {
        let expenses = [...this.state.expenses]
        expenses.push(expense);
        this.setState({
            expenses: expenses,
            remainingMoney: this.state.remainingMoney - expense.amount
        });
    }

    getTotalExpenses(expenses) {
        let totalExpenses = 0;
        expenses.forEach(expense => {
            totalExpenses += Number(expense.amount)
        });
        return totalExpenses;
    }

    handleIncomeChange(e) {
        const newIncome = e.target.value
        this.setState({
            income: newIncome,
            remainingMoney: newIncome - this.getTotalExpenses(this.state.expenses)
        });
    }

    handleExpenseNameChange(e) {
        const name = e.target.value;
        const expenses = [...this.state.expenses]
        const index = expenses.findIndex(expense => expense.name === e.target.name)

        expenses[index] = {
            name: name,
            amount: expenses[index].amount,
        }
    }

    handleExpenseAmountChange(e) {
        const target = e.target;
        const amount = target.value;
        const index = this.state.expenses.findIndex(expense => expense.name === target.name)
        const expenses = [...this.state.expenses]

        expenses[index] = {
            name: target.name,
            amount: amount
        }

        this.setState({
            expenses: expenses,
            remainingMoney: this.state.income - this.getTotalExpenses(expenses)
        });
    }

    render() {
        return (
            <div>
                <section id="income"> 
                    <MonthlyIncome amount={this.state.income} handleChange={this.handleIncomeChange}/>
                </section>

                <section id="remaining-money"> 
                    <RemainingMoney remainingMoney={this.state.remainingMoney}/>
                </section>
    
                <section id="expenses">
                    <AddExpense addExpense={this.addExpense}/>
                    <h1>Expenses</h1> 
                    {this.state.expenses.map((expense) => {
                        return <ExpenseItem  
                            key={expense.name} 
                            name={expense.name} 
                            handleExpenseAmountChange={this.handleExpenseAmountChange}
                            handleExpenseNameChange={this.handleExpenseNameChange}
                            amount={expense.amount} 
                            amountRemaining={expense.amountRemaining}/>
                    })}
                </section>

                <section id="spend">
                    <Spend spend={this.spend}/>
                </section>
            </div>
        )
    };  
}

let App = () => { return < Budget /> }

  
ReactDOM.render(
<App />,
document.getElementById('root')
);
  