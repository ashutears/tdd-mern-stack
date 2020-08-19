import React, {useState} from 'react'
import MessageList from './messageList'

function MessageForm(props) {
    
    const [currentMessage, setCurrentMessage] = useState('')

    return (
        <form id='message_form'>
            
            <textarea 
                id = "message_box" 
                onChange={(e) => setCurrentMessage(e.target.value)}
                value={currentMessage}
            > </textarea>
    
            <button name = "submit"id = "submit" > </button>
        </form>
    )
}

export default MessageForm