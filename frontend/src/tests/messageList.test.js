import React from "react";
import MessageList from "../components/messageList";
import Adapter from 'enzyme-adapter-react-16'
import Enzyme, {mount} from 'enzyme'
import { MessageContext } from "../App";

Enzyme.configure({adapter: new Adapter})

describe('Message List', () => {

    it ('renders message list component', () => {

        const component = mount(<MessageList />)

        expect(component.exists('ul#message_list')).toBe(true)
    })

    it ('renders individual message row components', () => {
        
        const component = mount(
        <MessageContext.Provider value={ { messages: JSON.stringify([{content: 'test message'}]) }}>
            <MessageList />
        </MessageContext.Provider>
        )

        expect(component.exists('li.a-message')).toBe(true)
        expect(component.find('li.a-message').length).toEqual(1)
        
        expect(component.find('li.a-message').first().props().children).toContain('test message')

    })

    it ('renders multiple messages in a list', () => {

        const messages = JSON.stringify([
            {message: 'New Test Message'},
            {message: 'Another test message'},
        ])

        const component = mount(
        <MessageContext.Provider value={ { messages: messages }}>
            <MessageList />
        </MessageContext.Provider>
        )

        expect(component.find('li.a-message').length).toEqual(2)
    })

    it ('shows "No messages to display" text if no messages found', () => {

        const component = mount(
        <MessageContext.Provider value={ { messages: [] }}>
            <MessageList />
        </MessageContext.Provider>
        )
        
        expect(component.find('li.a-message').length).toEqual(1)
        expect(component.find('li.a-message').first().props().children).toContain('No messages to display')

    })

})