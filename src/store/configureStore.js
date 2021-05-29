
import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import expensesReducer from '../reducers/expenses'
import filterReducer from '../reducers/filters'
import thunk from 'redux-thunk'

// store creation using multiple reducer

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__COMPOSE__ || compose;

const configureStore = () => {
    return createStore(
        combineReducers({
            expenses:expensesReducer,
            filter:filterReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
        //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
}

export default configureStore
