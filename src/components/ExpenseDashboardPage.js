import React from 'react'
import ExpenseList from './ExpenseList'
import ExpenseListFilters from './ExpenseListFilters'
import ExpencesSummary from './ExpenseSummary'

const ExpenseDashboardPage = () => (
    <div>
        <ExpencesSummary/>
        <ExpenseListFilters/>
        <ExpenseList/>
    </div>
)

export default ExpenseDashboardPage