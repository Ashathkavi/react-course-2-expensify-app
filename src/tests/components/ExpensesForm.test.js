import React from 'react'
import {shallow} from 'enzyme'
import ExpenseForm from '../../components/ExpenseForm'
import expenses from '../fixtures/expenses'
import DatePicker from 'react-datepicker'


test('should render ExpenseForm correctly', ()=>{
    const wrapper = shallow(<ExpenseForm />)
    expect(wrapper).toMatchSnapshot()
})


test('should render ExpenseForm with expense data', ()=>{
    const wrapper = shallow(<ExpenseForm expense={expenses[0]}/>)
    expect(wrapper).toMatchSnapshot()
})


test('should render error for invalid form submission', ()=>{
    const wrapper = shallow(<ExpenseForm/>)
    expect(wrapper).toMatchSnapshot()
    wrapper.find('form').simulate('submit',{ preventDefault:()=>{} });
    expect(wrapper.state('error').length).toBeGreaterThan(0)
    expect(wrapper).toMatchSnapshot()

})



test('should set descriptiom on input change', ()=>{
    const wrapper = shallow(<ExpenseForm/>)
    //expect(wrapper).toMatchSnapshot()
    wrapper.find('input').at(0).simulate('change', {
        persist:()=>{},
        target:{value:'New description'}
    })
    expect(wrapper.state('description')).toBe('New description')
    //expect(wrapper).toMatchSnapshot()
    
})


test('should set note on input change', ()=>{
    const wrapper = shallow(<ExpenseForm/>)
    wrapper.find('textarea').at(0).simulate('change', {
        persist:()=>{},
        target:{value:'New note'}
    })
    expect(wrapper.state('note')).toBe('New note')
    
})



test('should set amount if valid input', ()=>{
    const wrapper = shallow(<ExpenseForm/>)
    wrapper.find('input').at(1).simulate('change', {
        target:{value:'10.23'}
    })
    expect(wrapper.state('amount')).toBe('10.23')
    
})


test('should not set amount for invalid input', ()=>{
    const wrapper = shallow(<ExpenseForm/>)
    wrapper.find('input').at(1).simulate('change', {
        target:{value:'10.235'}
    })
    expect(wrapper.state('amount')).toBe('')
    
})


test('should call onSubmit prop for valid submission', ()=>{
    const onSubmitSpy = jest.fn()
    const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy}/>)
    wrapper.find('form').simulate('submit', {
        preventDefault:()=>{}
    })
    expect(wrapper.state('error').length).toBe(0)
    expect(onSubmitSpy).toHaveBeenLastCalledWith({
        description:expenses[0].description,
        amount:expenses[0].amount,
        note:expenses[0].note,
        createdAt:expenses[0].createdAt
    })
    
})


test('should set date on date change', ()=>{
    const wrapper = shallow(<ExpenseForm/>)
    wrapper.find(DatePicker).prop('onChange')(25)
    expect(wrapper.state('createdAt')).toBe(25)
    
})
