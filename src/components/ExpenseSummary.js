import numeral from 'numeral'
import {connect} from 'react-redux'
import React from 'react'
import selectExpenses from '../selectors/expenses'
import selectExpensesTotal from '../selectors/expenses-total'



export const ExpenseSummary = ({expenseCount, expensesTotal}) => {
    const expenseWord = expenseCount === 1 ? 'expense' : 'expenses'
    const fomattedExpensesTotal = numeral(expensesTotal/100).format('$0,0.00')
    return (
        <div>
            <p>Viewing {expenseCount} {expenseWord} totaling {fomattedExpensesTotal}</p>
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