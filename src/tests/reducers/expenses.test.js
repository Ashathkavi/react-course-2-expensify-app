import expensesReducer from '../../reducers/expenses'
import expenses from '../fixtures/expenses'



test('should set default state', ()=>{
    const state = expensesReducer(undefined, {type:'@@INIT'})
    expect(state).toEqual([])
})


test('should remove expence by id',  () => {
    const action = {
        type:'REMOVE_EXPENSE',
        id:expenses[1].id
    }
    const state = expensesReducer(expenses, action)
    expect(state).toEqual([expenses[0], expenses[2]])
})


test('should not  remove expence by id if not found',  () => {
    const action = {
        type:'REMOVE_EXPENSE',
        id:'-1'
    }
    const state = expensesReducer(expenses, action)
    expect(state).toEqual(expenses)
})



test('should edit expence by id',  () => {
    const action = {
        type:'EDIT_EXPENSE',
        id:expenses[1].id,
        updates:{
            description:'changed description',
            note:'changed note',
        }
    }
    const state = expensesReducer(expenses, action)
    expect(state[1]).toEqual({...expenses[1],description:'changed description',note:'changed note'})
})

test('should not edit expence by id if id is not found',  () => {
    const action = {
        type:'EDIT_EXPENSE',
        id:'-1',
        updates:{
            description:'changed description',
            note:'changed note',
        }
    }
    const state = expensesReducer(expenses, action)
    expect(state).toEqual(expenses)
})



test('should add expence',  () => {
    const expense = {
        id:'4',
        description:'changed description',
        note:'changed note',
        amount:4500,
        createdAt:12
    }
    const action = {
        type:'ADD_EXPENSE',
        expense
    }
    const state = expensesReducer(expenses, action)
    expect(state).toEqual(expenses.concat(expense))
})



test('should set expenses',  () => {
    const expenses_set = [{
        id:'4',
        description:'changed description',
        note:'changed note',
        amount:4500,
        createdAt:12
    },{
        id:'5',
        description:'changed description 2',
        note:'changed note 2',
        amount:5220,
        createdAt:13
    }]
    const action = {
        type:'SET_EXPENSES',
        expenses:expenses_set
    }
    const state = expensesReducer(expenses, action)
    expect(state).toEqual(expenses_set)
})