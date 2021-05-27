import { shallow } from 'enzyme'
import React from 'react'
import ReactShallowRenderer from 'react-test-renderer/shallow'
import Header from '../../components/Header'


test('should render Header correctly', ()=>{

    const wrapper = shallow(<Header/>)
    expect(wrapper).toMatchSnapshot()
})