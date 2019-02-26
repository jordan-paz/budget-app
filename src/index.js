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
    return <p>Remaining Money: ${props.amount}</p>;
}

function ExpenseItem (props) {
    return (
        <div>
            <form>
                <label>
                    Item:
                    <input type="text" defaultValue={props.name} />
                </label>
                <br/>
                <label>
                    Amount:
                    <input 
                        type="text"
                        onChange={props.handleExpenseChange}
                        name={props.name} 
                        defaultValue={props.amount}/>
                </label>
            </form>
            <br/>
        </div>
    );
}

class Budget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            income: '2000',
            expenses: [
                {name: "Rent", amount: "300"},
                {name: "Food", amount: "200"},
                {name: "Gas", amount: "150"}
            ],
            remainingMoney: '1350'
        };
        
        this.handleIncomeChange = this.handleIncomeChange.bind(this);
        this.handleExpenseChange = this.handleExpenseChange.bind(this);
    }

    handleIncomeChange(e) {
        const newIncome = e.target.value
        this.setState({income: newIncome});
    }

    handleExpenseChange(e) {
        const target = e.target;
        const newExpenseAmount = target.value;
        const index = this.state.expenses.findIndex(expense => expense.name === target.name)
        const newExpenses = [...this.state.expenses]

        newExpenses[index] = {
            name: target.name,
            amount: newExpenseAmount
        }

        this.setState({
            expenses: newExpenses
        });
    }

    render() {
        return (
            <div>
                <section id="income"> 
                    <MonthlyIncome amount={this.state.income} handleChange={this.handleIncomeChange}/>
                </section>

                <section id="remaining-money"> 
                    <RemainingMoney amount={this.state.remainingMoney}/>
                </section>
    
                <section id="expenses">
                    <h1>Expenses</h1>
                    {this.state.expenses.map((expense) => {
                        return <ExpenseItem  
                            key={expense.name} 
                            name={expense.name} 
                            handleExpenseChange={this.handleExpenseChange}
                            amount={expense.amount} />
                    })}
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
  