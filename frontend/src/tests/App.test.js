import React from "react"
import ReactDOM from 'react-dom'
import MessageApp from '../App'

import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { mount } from 'enzyme'
import MessageList from "../components/messageList"
import mockAxios from '../__mocks__/axios.js'

Enzyme.configure({ adapter: new Adapter()})

describe('App', () => {

    beforeEach(() => {
        mockAxios.post.mockImplementation(() => Promise.resolve({ data: {} }))
    })

    afterEach(() => {
        mockAxios.post.mockClear()
    })

    it ('posts data and clears message box on submit success', () => {
        // const component = mount (<MessageApp />)

        // component.find('textarea#message_box')
        //     .simulate('change', {
        //         target: { value: 'Hello'}
        //     })
        
        // component.find('form').simulate('submit')

        // expect(mockAxios.post).toHaveBeenCalledWith('http://localhost:3001/message', {
        //     "content": "Hello"
        // })

        // expect(component.instance().refs.messageFormRef.state.currentMessage).toEqual('')
    })
})