import React from 'react';
import RemainingBar from "./RemainingBar";
import EditIncome from "./EditIncome";

class TopSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editIncomeButtonClicked: true
        }
        this.handleEditIncomeClick = this.handleEditIncomeClick.bind(this);
    }

    handleEditIncomeClick() {
        this.setState({editIncomeButtonClicked: !this.state.editIncomeButtonClicked})
    }

    render() {
        return( 
            <div className="container">
                <div className="container" id="top-section">
                    <p>March</p>
                    { this.state.editIncomeButtonClicked === false ? 
                        <div className="container">
                            <span id="income-title">Income: ${this.props.income}</span>
                            <button className="btn btn-primary btn-sm">Edit Income</button>
                            
                            <RemainingBar 
                            remainingPercent={(this.props.income - this.props.getTotalSpent(this.props.transactions)) / this.props.income * 100} 
                            income={this.props.income}
                            spent={this.props.spent}/>
                        
                        </div>
                        :
                        <EditIncome 
                        updateIncome={this.props.updateIncome} 
                        handleEditIncomeClick={this.handleEditIncomeClick} />
                    }   
                </div> 
            </div>
        )
    }
}

export default TopSection;