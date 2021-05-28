import React from 'react'
import {shallow} from 'enzyme'
import {ExpenseSummary} from '../../components/ExpenseSummary'


test('should render SummaryComponent with one expenses', ()=>{
    const wrapper = shallow(<ExpenseSummary expenseCount = {1} expensesTotal={235}/>)
    expect(wrapper).toMatchSnapshot()
})


test('should render SummaryComponent with multiple expenses', ()=>{
    const wrapper = shallow(<ExpenseSummary expenseCount = {23} expensesTotal={123214645}/>)
    expect(wrapper).toMatchSnapshot()
})

