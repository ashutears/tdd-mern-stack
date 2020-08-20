import React from "react"
import MessageApp from '../App'

import Adapter from 'enzyme-adapter-react-16'
import Enzyme, { mount } from 'enzyme'

Enzyme.configure({
    adapter: new Adapter()
})

describe('Form', () => {

    it('renders without crashing', () => {
        const component = mount( <MessageApp /> )

        expect(component).toMatchSnapshot()
    })

    it('has textbox', () => { 
        const component = mount( <MessageApp /> )

        expect(component.exists('input#message_box')).toBe(true)
    })

    it('has a submit button', () => {
        const component = mount( <MessageApp /> )

        expect(component.exists('button#submit')).toBe(true)
    })

    it('submit button says "Add Message"', () => {
        const component = mount( <MessageApp /> )

        expect(component.find('button#submit').props().children).toContain('Add Message')
    })

    it('has message list', () => {
        const component = mount( <MessageApp /> )

        expect(component.exists('ul#message_list')).toBe(true)
    })

    it ('should update state message when text entered', () => {
        const component = mount(<MessageApp />)
        
        component.find('input#message_box').simulate('change', {
            target: {value: 'Hello'}
        })
        
        // expect(component.state.currentMessage).toEqual('Hello')
    })
    
})