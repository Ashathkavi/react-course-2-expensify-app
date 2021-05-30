import {
    startAddExpense, 
    addExpense, 
    removeExpense, 
    editExpense, 
    setExpenses, 
    startSetExpenses, 
    startRemoveExpenses,
    startEditExpenses
} from '../../actions/expenses'
import expenses from '../fixtures/expenses'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import database from '../../firebase/firebase'

const createMockStore = configureMockStore([thunk])

beforeEach((done)=>{
    const expensesData = {}
    expenses.forEach(({id, description, note, amount, createdAt})=>{
        expensesData[id] = {description, note, amount, createdAt}
    })
    database.ref('expenses').set(expensesData).then(()=>done())
})


test('should setup remove expense action object', ()=>{
    const action = removeExpense({id:'123abc'})
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id:'123abc'
    })
})


test('should remove the expenses from the firebase', (done)=>{
    const store  = createMockStore({})
    //const expenses_set = expenses.map((expense)=> ({id:expect.any(String),...expense }))
    
    store.dispatch(startRemoveExpenses({id:expenses[0].id})).then(()=>{
        const actions = store.getActions()
        expect(actions[0]).toEqual({
            type:'REMOVE_EXPENSE',
            id:expenses[0].id
            //expenses:expenses_set
        })
        return database.ref(`expenses/${expenses[0].id}`).once('value')
    }).then((snapshot)=>{
        //console.log(snapshot.val())
        expect(snapshot.val()).toBeFalsy()
        done()
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

test('should  edit expense to database and store', (done)=>{
    const store  = createMockStore({})
    const update = {
        description:'testing-12345', 
        amount:'200'
    }
    store.dispatch(startEditExpenses(expenses[0].id,update)).then(()=>{
        const action = store.getActions()
        expect(action[0]).toEqual({
            type: 'EDIT_EXPENSE',
            id:expenses[0].id,
            updates:update
        })
        return database.ref(`expenses/${expenses[0].id}`).once('value')

    }).then((snapshot)=>{
        expect(snapshot.val().description).toBe('testing-12345')
        done()
    })
}, 10000) 


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


test('should setup set expense object with data', ()=>{
    const action = setExpenses(expenses)
    expect(action).toEqual({
        type:'SET_EXPENSES',
        expenses
    })
})


test('should fetch the expenses from the firebase', ()=>{
    const store  = createMockStore({})
    //const expenses_set = expenses.map((expense)=> ({id:expect.any(String),...expense }))
    store.dispatch(startSetExpenses(expenses)).then(()=>{
        const action = store.getActions()
        expect(action[0]).toEqual({
            type:'SET_EXPENSES',
            expenses
            //expenses:expenses_set
        })
        return database.ref(`expenses`).once('value')

    }).then((snapshot)=>{
        console.log(snapshot.val())
        expect(snapshot.val()).toEqual(expenses)
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