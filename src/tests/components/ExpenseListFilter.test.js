import React from 'react'
import {shallow} from 'enzyme';
import {ExpenseListFilters} from '../../components/ExpenseListFilters'
import {filters, altfilters} from '../fixtures/filters'
import { sortByDate } from '../../actions/filters';
import DatePicker from 'react-datepicker'

let setTextFilterSpy, sortByAmountSpy, sortByDateSpy, setStartDateSpy, setEndDateSpy, wrapper;

beforeEach(()=>{
    setTextFilterSpy = jest.fn()
    sortByAmountSpy = jest.fn()
    sortByDateSpy = jest.fn()
    setStartDateSpy = jest.fn()
    setEndDateSpy = jest.fn()
    wrapper = shallow(
        <ExpenseListFilters
            filters={filters}
            setTextFilter = {setTextFilterSpy}
            sortByAmount = {sortByAmountSpy}
            sortByDate = {sortByDateSpy}
            setStartDate = {setStartDateSpy}
            setEndDate = {setEndDateSpy}

        />
    )
})

test('should render ExpenseListFilters correctly',()=>{
    expect(wrapper).toMatchSnapshot()
})


test('should render ExpenseListFilters with alt data correctly',()=>{
    wrapper.setProps({
        filters:altfilters
    })
    expect(wrapper).toMatchSnapshot()
})

test('should handle text change', ()=>{
    wrapper.find('input').at(0).simulate('change', {
        target:{value:'test text'}
    })
    expect(setTextFilterSpy).toHaveBeenLastCalledWith('test text')    
})


test('should sort by date', ()=>{
    wrapper.find('select').at(0).simulate('change', {
        target:{value:'date'}
    })
    expect(sortByDateSpy).toHaveBeenCalled()    
})


test('should sort by amount', ()=>{
    wrapper.find('select').at(0).simulate('change', {
        target:{value:'amount'}
    })
    expect(sortByAmountSpy).toHaveBeenCalled()    
})


test('should handle date change', ()=>{
    wrapper.find(DatePicker).simulate('change', [0,55555555])
    expect(setStartDateSpy).toHaveBeenLastCalledWith(0) 
    expect(setEndDateSpy).toHaveBeenLastCalledWith(55555555)     
})



/*
test('should set date on date change', ()=>{
    const wrapper = shallow(<ExpenseForm/>)
    wrapper.find(DatePicker).prop('onChange')(25)
    expect(wrapper.state('createdAt')).toBe(25)
    
})


test('should handle onClick', ()=>{
    wrapper.find('button').simulate('click') ;
    expect(historySpy.push).toHaveBeenLastCalledWith('/')
    expect(removeExpenseSpy).toHaveBeenLastCalledWith({id:expenses[0].id})    
})*/