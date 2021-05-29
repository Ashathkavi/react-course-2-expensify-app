import {startAddExpense, addExpense, removeExpense, editExpense} from '../../actions/expenses'
import expenses from '../fixtures/expenses'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import database from '../../firebase/firebase'

const createMockStore = configureMockStore([thunk])

test('should setup remove expense action object', ()=>{
    const action = removeExpense({id:'123abc'})
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id:'123abc'
    })
})


test('should setup edit expense action object', ()=>{
    const action = editExpense('abc123',{description:'testing', amount:'200'})
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id:'abc123',
        updates:{
            description:'testing', 
            amount:'200'
        }

    })
})


test('should setup add expense action object', ()=>{
    const action = addExpense(expenses[0])
    expect(action).toEqual({
        type:'ADD_EXPENSE',
        expense:expenses[0]
    })
})


test('should  add expense to database and store', (done)=>{
    const store  = createMockStore({})
    const expenseData = {
        description:'Mouse',
        amount:555,
        note:'This one is better',
        createdAt:1000
    }
    store.dispatch(startAddExpense(expenseData)).then(()=>{
        const action = store.getActions()
        expect(action[0]).toEqual({
            type:'ADD_EXPENSE',
            expense:{
                id:expect.any(String),
                ...expenseData
            }
        })
        return database.ref(`expenses/${action[0].expense.id}`).once('value')

    }).then((snapshot)=>{
        expect(snapshot.val()).toEqual(expenseData)
        done()
    })
}, 10000) 


test('should  add expense with default to database and store', (done)=>{
    const store  = createMockStore({})
    store.dispatch(startAddExpense()).then(()=>{
        const action = store.getActions()
        expect(action[0]).toEqual({
            type:'ADD_EXPENSE',
            expense:{
                id:expect.any(String),
                description : '',
                note: '',
                amount:0,
                createdAt:0
            }
        })
        return database.ref(`expenses/${action[0].expense.id}`).once('value')

    }).then((snapshot)=>{
        expect(snapshot.val()).toEqual({
            description : '',
            note: '',
            amount:0,
            createdAt:0
        })
        done()
    })
}, 10000) 



/*
test('should setup add expense action object with default values', ()=>{
    const action = addExpense()
    expect(action).toEqual({
        type:'ADD_EXPENSE',
        expense:{
            id:expect.any(String),
            description:'',
            note:'',
            amount:0,
            createdAt:0
        }

    })
})
*/