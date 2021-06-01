import React from 'react'
import ExpenseForm from './ExpenseForm'
import {connect} from 'react-redux'
import {editExpense, startEditExpenses} from '../actions/expenses'
import {startRemoveExpenses} from '../actions/expenses'

export class EditExpensePage extends React.Component{
    

    onSubmit = (expense) => {
        this.props.editExpense(this.props.match.params.id,expense)
        this.props.history.push('/')
    }

    onRemove = () => {
        this.props.removeExpense({id:this.props.expense.id});
        this.props.history.push('/')
    }

    render(){
        return(
            
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">Edit Expense</h1>
                        
                        
                    </div>                    
                </div>  
                <div className="content-container">
                    <ExpenseForm onSubmit={this.onSubmit} expense ={this.props.expense}/>
                    <button className="button button-secondary" onClick={this.onRemove}>Remove Expense</button>
                </div>  
                          
            </div>
        )
    }
}


const mapStateToProps = (state, props) => {
    return{
        expense:state.expenses.find((expense)=>{
            //console.log(expense)
            return expense.id === props.match.params.id
        })
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    editExpense:(id,expense) =>dispatch(startEditExpenses(id,expense)),
    removeExpense:(date) => dispatch(startRemoveExpenses(date))
})

export default connect(mapStateToProps,mapDispatchToProps)(EditExpensePage) 