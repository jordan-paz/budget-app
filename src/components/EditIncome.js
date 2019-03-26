import React from 'react';

class EditIncome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            incomeAmount : "",
            payFrequency : ""
        }
    
        this.handleFrequencyChange = this.handleFrequencyChange.bind(this);
        this.handleIncomeAmountChange = this.handleIncomeAmountChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    getMonthlyIncome() {
        const payFrequency = this.state.payFrequency;
        const incomeAmount = this.state.incomeAmount
        switch(payFrequency) {
            
            case "Biweekly": 
                return incomeAmount * 2;
            case "Weekly":
                return incomeAmount * 4;
            default:
                return incomeAmount;
            
        }
    }

    handleIncomeAmountChange(e) {
        const incomeAmount = e.target.value;
        this.setState({incomeAmount: incomeAmount});
    }

    handleFrequencyChange(e) {
        const payFrequency = e.target.value;
        this.setState({payFrequency: payFrequency});
    }

    handleSubmit(e) {
        e.preventDefault()
        const newIncome = this.getMonthlyIncome();
        this.props.updateIncome(newIncome);
        this.props.handleEditIncomeClick();
    }

    render() {
        return(
            <div className="container" id="spend-form">
                <h3>Set Income</h3>
                <form onSubmit={this.handleSubmit}>
    
                    <div className="form-group">
                        <input 
                            className="form-control"
                            type="text"
                            placeholder="Income Amount" 
                            value={this.state.incomeAmount} 
                            onChange={this.handleIncomeAmountChange}
                        />
                    </div>
    
                    <div className="form-group">
                        <select 
                        className="form-control" 
                        id="chooseFrequency"
                        type="select"
                        placeholder="Pay Frequency"
                        onChange={this.handleFrequencyChange}>
                            <option>Monthly</option>
                            <option>Biweekly</option>
                            <option>Weekly</option>
                        </select>
                    </div>
    
                    <button 
                    onClick={this.props.handleEditIncomeClick} 
                    id="cancel-edit-income-button" 
                    type="button" 
                    className="btn btn-dark">
                        Cancel
                    </button>
    
                    <button 
                    id="submit-edit-income-button" 
                    type="submit"  
                    className="btn btn-primary">
                        Submit
                    </button>
    
                </form>
            </div>
        )
    }
    
}

export default EditIncome;