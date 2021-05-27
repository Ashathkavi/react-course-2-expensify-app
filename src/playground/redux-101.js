
import {createStore} from 'redux';

const add = ({a,b}) => {
    return a + b;
}
console.log(add({a:1, b:12}))

const incrementCount = ({incrementBy=1}={}) => ({
    type:'INCREMENT',
    incrementBy
})

const decrementCount = ({decrementBy=1}={}) => ({
    type:'DECREMENT',
    decrementBy
})

const resetCount = () => ({
    type:'RESET',
    count:0
})

const setCount = ({count=0}={}) => ({
    type:'SET',
    count
})

//Reducer
const countReducer = (state = {count:0}, action) => {
    switch(action.type){
        case'INCREMENT':
            return{
                count:state.count+action.incrementBy
            }
        case'DECREMENT':

            return{
                count:state.count-decrementBy
            }
        case'RESET':
            return{
                count:0
            }
        case'SET':
            const count = typeof action.count === 'number' ? action.count : state.count
            return{
                count:count
            }
        default:
            return state;
    }
}


const store = createStore(countReducer) 

const unsubscribe = store.subscribe(()=>{
    console.log(store.getState())
})

store.dispatch(incrementCount({incrementBy:5}))

store.dispatch(incrementCount())

store.dispatch(decrementCount({decrementBy:5}))

store.dispatch(resetCount())

store.dispatch(setCount({count:5}))

unsubscribe()