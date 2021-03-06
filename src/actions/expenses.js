import uuid from 'uuid'
import database from '../firebase/firebase'


//ADD_EXPENSE
export const addExpense = (expense) => ({
    type:'ADD_EXPENSE',
    expense
})

export const startAddExpense = (expenseData ={}) => {
    return (dispatch, getState)=>{
        const uid = getState().auth.uid
        const { description = '', note= '', amount=0, createdAt=0 } = expenseData
        const expense = {description , note, amount, createdAt}
        return database.ref(`users/${uid}/expenses`).push(expense)
            .then((ref)=>{
                dispatch(addExpense({
                    id:ref.key,
                    ...expense
                }))
            })
    }
}
 

//REMOVE_EXPENSES
export const removeExpense = ({id} = {}) => ({
    type:'REMOVE_EXPENSE',
    id
})


//ASYNC REMOVE_EXPENSES

export const startRemoveExpenses = ({id}={}) => {
    return (dispatch, getState)=>{
        const uid = getState().auth.uid
        //const { description = '', note= '', amount=0, createdAt=0 } = expenseData
        //const expense = {description , note, amount, createdAt}
        return database.ref(`users/${uid}/expenses/${id}`).remove()
            .then(()=>{
                dispatch(removeExpense({id}))
            }).catch((error)=>{
                console.log("Remove failed: " + error.message)
            })                     
    }
}



//EDIT_EXPENSES
export const editExpense = (id, updates) => ({
    type:'EDIT_EXPENSE',
    id,
    updates
})

export const startEditExpenses = (id, updates) => {
    return (dispatch, getState)=>{
        const uid = getState().auth.uid
        return database.ref(`users/${uid}/expenses/${id}`).update({
            ...updates
        }).then(()=>{
                dispatch(editExpense(id, updates))
        }).catch((error)=>{
            console.log("Edit failed: " + error.message)
        })                     
    }
}



//SET_EXPENSES
export const setExpenses = (expenses) => ({
    type:'SET_EXPENSES',
    expenses
})


//ASYNC SET_EXPENSES

export const startSetExpenses = () => {
    return (dispatch, getState)=>{
        const uid = getState().auth.uid
        //const { description = '', note= '', amount=0, createdAt=0 } = expenseData
        //const expense = {description , note, amount, createdAt}
        return database.ref(`users/${uid}/expenses`)
            .once('value').then((snapshot)=>{
                const expenses = []
                snapshot.forEach((childSnapshot)=>{
                    expenses.push({
                        id:childSnapshot.key,
                        ...childSnapshot.val()
                    })
                })
                dispatch(setExpenses(expenses))
            }, (e)=>{
                console.log('Error with data fetching: ', e)
            })            
    }
}