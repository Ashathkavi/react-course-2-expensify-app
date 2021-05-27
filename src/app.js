
import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import './styles/styles.scss'
import 'normalize.css/normalize.css'
import "react-datepicker/dist/react-datepicker.css";

import AppRouter from './routers/AppRouter'
import configureStore from './store/configureStore'
import getVisibleExpenses from './selectors/expenses'
import {addExpense} from './actions/expenses'
import {setTextFilter} from './actions/filters'


const store = configureStore()

const expenseOne = store.dispatch(addExpense({description:'water Bill',  amount:4500 }))
const expenseTwo = store.dispatch(addExpense({description :'Gas Bill', createdAt:1000}))
const expenseThree = store.dispatch(addExpense({description :'Rent',  amount:109500}))



const state = store.getState()
const visibleExpenses = getVisibleExpenses(state.expenses, state.filter)
console.log(visibleExpenses)


const jsx = (
    <Provider store= {store}>
        <AppRouter/>
    </Provider>
);


ReactDOM.render( jsx, document.getElementById('app'))
