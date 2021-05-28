import React from 'react'
import {shallow} from 'enzyme'
import selectExpenseTotal from '../../selectors/expenses-total'
import expenses from '../fixtures/expenses'


test('should return 0 if no expenses', ()=>{
    const emptyExpenses = []
    const result = selectExpenseTotal(emptyExpenses)
    expect(result).toBe(0)
})


test('should correctly add up a single expenses', ()=>{
    //const singleExpenses = expenses[0]
    const result = selectExpenseTotal([expenses[0]])
    expect(result).toBe(195)
})



test('should correctly add up multiple expenses', ()=>{
    //const singleExpenses = expenses[0]
    const result = selectExpenseTotal(expenses)
    expect(result).toBe(114195)
})


