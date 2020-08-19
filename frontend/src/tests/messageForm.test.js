import React from "react"
import ReactDOM from 'react-dom'
import MessageApp from '../App'

import Adapter from 'enzyme-adapter-react-16'
import Enzyme, { mount, shallow } from 'enzyme'

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

        expect(component.exists('textarea#message_box')).toBe(true)
    })

    it('has a submit button', () => {
        const component = mount( <MessageApp /> )

        expect(component.exists('button#submit')).toBe(true)
    })

    it('has message list', () => {
        const component = mount( <MessageApp /> )

        expect(component.exists('ul#message_list')).toBe(true)
    })

//     it ('should update state message when text entered', () => {
//         const component = mount(<MessageApp />)
        
//         component.find('textarea#message_box').simulate('change', {
//             target: {value: 'Hello'}
//         })
// console.log(component.state['currentMessage'])
//         expect(component.state.currentMessage).toEqual('Hello')
//     })
    
})