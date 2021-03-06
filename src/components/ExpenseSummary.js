import numeral from 'numeral'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import React from 'react'
import selectExpenses from '../selectors/expenses'
import selectExpensesTotal from '../selectors/expenses-total'



export const ExpenseSummary = ({expenseCount, expensesTotal}) => {
    const expenseWord = expenseCount === 1 ? 'expense' : 'expenses'
    const fomattedExpensesTotal = numeral(expensesTotal/100).format('$0,0.00')
    return (
        <div className="page-header">
            <div className="content-container">
                <h1 className="page-header__title">Viewing <span>{expenseCount}</span> {expenseWord} totalling <span>{fomattedExpensesTotal}</span></h1>
                <div className="page-header__actions">
                    <Link className="button" to="/create">Add Expense</Link>
                </div>
            </div>
        </div>
    )
}

const mapStatetoProps = (state) => {
    const visibleExpenses = selectExpenses(state.expenses, state.filter)
    return{
        expenseCount:visibleExpenses.length,
        expensesTotal:selectExpensesTotal(visibleExpenses)
    }
}

const connectedExpenseSummary  = connect(mapStatetoProps)(ExpenseSummary)
export default connectedExpenseSummary