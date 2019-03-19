import React from 'react';

class Spend extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            category: "",
            amount: "",
            date: "",
            note: ""
        }
        this.handleAmountChange = this.handleAmountChange.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleNoteChange = this.handleNoteChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    getCategoryNames(categories) {
        let namesArray = [];
        categories.forEach(category => namesArray.push(category.name));
        return namesArray;
    }

    handleCategoryChange(e) {
        const category = e.target.value;
        this.setState({category: category});
    }
    handleAmountChange(e) {
        const amount = e.target.value;
        this.setState({amount: amount});
    }
    handleDateChange(e) {
        const date = e.target.value;
        this.setState({date: date});
    }
    handleNoteChange(e) {
        const note = e.target.value;
        this.setState({note: note});
    }
    handleSubmit(e) {
        e.preventDefault();
        if (this.state.amount > 0) {
            const transaction = {
                category: this.state.category,
                amount: this.state.amount,
                date: this.state.date,
                note: this.state.note
            }
            this.props.spend(transaction);
            this.setState({
                category: "",
                amount: "",
                date: "",
                note: ""
            })
            this.props.handleSpendClick();
        } else {
            this.props.handleSpendClick();
        }
        
        
    }

    render() {
        return (
            <div className="container" id="spend-page">
                <h3>Spend</h3>
                <form onSubmit={this.handleSubmit}>
    
                    <div className="form-group">
                        <select 
                        className="form-control" 
                        id="chooseCategory"
                        type="select"
                        placeholder="Category" 
                        value={this.state.category} 
                        onChange={this.handleCategoryChange}>
                            <option>Choose Category</option>
                            {this.getCategoryNames(this.props.categories).map((category) => {
                                return <option key={category}>{category}</option>
                            })}
                        </select>
                    </div>

                    <div className="form-group">
                        <input type="text" 
                            placeholder="Amount" 
                            className="form-control" 
                            value={this.state.amount} 
                            onChange={this.handleAmountChange}/>
                    </div>
                    
                    <div className="form-group">
                        <input type="text" placeholder="Date" className="form-control" value={this.state.date} onChange={this.handleDateChange}/>
                    </div>
                    
                    <div className="form-group">
                        <textarea placeholder="Note" className="form-control" value={this.state.note} onChange={this.handleNoteChange}/>
                    </div>

                    <button 
                    onClick={this.props.handleSpendClick} 
                    id="spend-cancel-button" 
                    type="button" 
                    className="btn btn-dark">
                        Cancel
                    </button>

                    <button 
                    id="spend-submit-button" 
                    type="submit"  
                    className="btn btn-primary">
                        Submit
                    </button>

                </form>
            </div>
        )
    }
}

export default Spend;