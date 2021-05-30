
import {createStore, combineReducers, applyMiddleware, compose} from 'redux'

import thunk from 'redux-thunk'
import expensesReducer from '../reducers/expenses'
import filterReducer from '../reducers/filters'
import authReducer from '../reducers/auth'

// store creation using multiple reducer
 
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = () => {
    return createStore(
        combineReducers({
            expenses:expensesReducer,
            filter:filterReducer,
            auth:authReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
        //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
}

export default configureStore
