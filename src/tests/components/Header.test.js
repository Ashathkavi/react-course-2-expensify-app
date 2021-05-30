import { shallow } from 'enzyme'
import React from 'react'
//import ReactShallowRenderer from 'react-test-renderer/shallow'
import {Header} from '../../components/Header'


test('should render Header correctly', ()=>{

    const wrapper = shallow(<Header startLogout={()=>{}}/>)
    expect(wrapper).toMatchSnapshot()
})


test('should call startLogout on button onSubmit', ()=>{
    const startLogoutSpy = jest.fn()
    const wrapper = shallow(<Header startLogout={startLogoutSpy}/>)
    wrapper.find('button').simulate('click')
    expect(startLogoutSpy).toHaveBeenCalled()
    
})