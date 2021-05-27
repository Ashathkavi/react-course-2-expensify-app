import React from 'react'
import ExpenseForm from './ExpenseForm'
import {connect} from 'react-redux'
import {addExpense} from '../actions/expenses'

export class AddExpensePage extends React.Component{
    onSubmit=(expense) => {
        //props.dispatch(addExpense(expense))
        this.props.addExpense(expense)
        this.props.history.push('/')
    }
    render(){
        return(
            <div>
                This is from AddExpensePage component
                <ExpenseForm onSubmit={this.onSubmit}  />
            </div>
        )
    }
}


// this function makes the AddExpensePage component testable
const mapDispatchToProps = (dispatch) => ({
    addExpense:(expense) =>dispatch(addExpense(expense))
})

export default connect(undefined,mapDispatchToProps)(AddExpensePage)