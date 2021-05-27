
import {createStore, combineReducers} from 'redux'
import expensesReducer from '../reducers/expenses'
import filterReducer from '../reducers/filters'

// store creation using multiple reducer

const configureStore = () => {
    return createStore(
        combineReducers({
            expenses:expensesReducer,
            filter:filterReducer
        }),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
}

export default configureStore
