import React from 'react'
import {shallow} from 'enzyme'
import {EditExpensePage} from '../../components/EditExpensePage'
import expenses from '../fixtures/expenses'
import ExpenseForm from '../../components/ExpenseForm'

let removeExpenseSpy, editExpenseSpy, historySpy, wrapper, match;
beforeEach(()=>{
    match={params:{id:expenses[0].id}}
    editExpenseSpy = jest.fn()
    removeExpenseSpy = jest.fn()
    historySpy = {push:jest.fn()}
    wrapper = shallow(
        <EditExpensePage 
            history={historySpy} 
            removeExpense={removeExpenseSpy}
            editExpense={editExpenseSpy}            
            match={match}
            expense={expenses[0]}
        />
    )
})

test('should render EditExpensePage correctly', ()=>{
    expect(wrapper).toMatchSnapshot()
})



test('should handle onSubmit', ()=>{ 
    wrapper.find(ExpenseForm).prop('onSubmit')(expenses[0])
    expect(historySpy.push).toHaveBeenLastCalledWith('/')
    expect(editExpenseSpy).toHaveBeenLastCalledWith(expenses[0].id,expenses[0])    
})



test('should handle onClick', ()=>{
    wrapper.find('button').simulate('click') ;
    expect(historySpy.push).toHaveBeenLastCalledWith('/')
    expect(removeExpenseSpy).toHaveBeenLastCalledWith({id:expenses[0].id})    
})