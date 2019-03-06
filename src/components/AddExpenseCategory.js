import React from 'react';

class AddExpenseCategory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
    };
    handleSubmit(e) {
        e.preventDefault();
        const category = {
            name: this.state.name,
            spent: 0
        }
        this.props.addCategory(category)
        this.setState({
            name: ""
        })
    }
    handleNameChange(e) {
        const name = e.target.value;
        this.setState({name: name});
    }
    render() {
        return (
            <div id="add-category-form">
                
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Add Expense Category</label>
                        <input type="text" className="form-control" value={this.state.name} onChange={this.handleNameChange}/> 
                    </div>
                    <div className="form-group">
                        <button className="btn btn-sm btn-primary" type="submit">Submit</button>
                    </div>
                </form>
                <br/>
            </div>
        )
    }
}

export default AddExpenseCategory;