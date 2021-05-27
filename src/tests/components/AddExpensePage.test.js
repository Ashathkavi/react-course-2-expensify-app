import React from 'react'
import {shallow} from 'enzyme'
import {AddExpensePage} from '../../components/AddExpensePage'
import expenses from '../fixtures/expenses'
import ExpenseForm from '../../components/ExpenseForm'

let addExpenseSpy, historySpy, wrapper;
beforeEach(()=>{
    addExpenseSpy = jest.fn()
    historySpy = {push:jest.fn()}
    wrapper = shallow(<AddExpensePage history={historySpy} addExpense={addExpenseSpy}/>)
})

test('should render AddExpensePage correctly', ()=>{
    expect(wrapper).toMatchSnapshot()
})


test('should handle onSubmit', ()=>{
    wrapper.find(ExpenseForm).prop('onSubmit')(expenses[0])
    expect(historySpy.push).toHaveBeenLastCalledWith('/')
    expect(addExpenseSpy).toHaveBeenLastCalledWith(expenses[0])
    
})