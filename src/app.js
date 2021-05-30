
import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import './styles/styles.scss'
import 'normalize.css/normalize.css'
import "react-datepicker/dist/react-datepicker.css";
import {firebase} from "./firebase/firebase"
//import './playground/promises'

import AppRouter, {history} from './routers/AppRouter'
import configureStore from './store/configureStore'
import getVisibleExpenses from './selectors/expenses'
import {addExpense, startSetExpenses} from './actions/expenses'
import {login, logout} from './actions/auth'
import {startSetText} from './actions/expenses'


// if (process.env.NODE_ENV !== 'production') {
//     console.log('Looks like we are in development mode!');
//   }

const store = configureStore()
//console.log('testing')
// const expenseOne = store.dispatch(addExpense({description:'water Bill',  amount:4500 }))
// const expenseTwo = store.dispatch(addExpense({description :'Gas Bill', createdAt:1000}))
// const expenseThree = store.dispatch(addExpense({description :'Rent',  amount:109500}))



// const state = store.getState()
// const visibleExpenses = getVisibleExpenses(state.expenses, state.filter)
// console.log(visibleExpenses)


const jsx = (
    <Provider store= {store}>
        <AppRouter/>
    </Provider>
);

 
let hasRendered = false
const renderApp = () => {
    if(!hasRendered){
        ReactDOM.render( jsx, document.getElementById('app'))
        hasRendered = true
    }
}

ReactDOM.render( <p>Loading......</p>, document.getElementById('app'))



firebase.auth().onAuthStateChanged((user)=>{
    if (user){     
        store.dispatch(login(user.uid))  
        console.log('uid', user.uid)
        store.dispatch(startSetExpenses()).then(()=>{
            renderApp()
            if(history.location.pathname === '/'){
                history.push('/dashboard')
            }
        })
    }else{
        store.dispatch(logout())  
        renderApp()
        history.push('/')
    }
})
