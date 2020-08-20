import React from "react"
import { MessageContext } from "../App"

function MessageList(props) {
    
    const context = React.useContext(MessageContext)

    let messageList = context.messages && context.messages.length > 0 ? JSON.parse(context.messages) : [{content: 'No messages to display'}]

    messageList = messageList.map((message, i) => {
        return <li className='a-message list-group-item' key={message.content + i} > {message.content}</li>
    })

    return (
        < ul className="list-group-flush" id="message_list" >{messageList}</ul>
    )
}

export default MessageList