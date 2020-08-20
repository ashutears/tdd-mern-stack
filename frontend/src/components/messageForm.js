import React, {useState} from 'react'
import { MessageContext } from "../App";

function MessageForm(props) {
    
    const [currentMessage, setCurrentMessage] = useState('')

    // const addMessage = (e) => {
    //     e.preventDefault()

    //     props.addMessageAction(e, {content: currentMessage})

    //     setCurrentMessage('') // clear the message field
    // }

    const context = React.useContext(MessageContext)

    return (
        <form onSubmit={(e) => context.addMessageAction(e, currentMessage)} id="message_form" className="form-inline">
            <div className="form-group col-9">
                <input 
                    className="form-control-plaintext"
                    id="message_box" 
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    value={currentMessage}
                />
            </div>
            <button name = "submit" className="btn btn-primary mb-2" id = "submit">Add Message</button>    
        </form>
        
    )
}

export default MessageForm