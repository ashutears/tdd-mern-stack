import React, {useEffect, useState} from 'react'
import './App.css'

import MessageForm from './components/messageForm'
import MessageList from './components/messageList'

import socketIOClient from "socket.io-client";

export const MessageContext = React.createContext({
  messages: [],
  addMessageAction: (e, message) => {},
})

function App(props) {

  const getAPI = async () => {
    const response = await fetch('http://localhost:3001')
    const data = await response.json()

    try {
      setMessages(data)

    } catch (error) {
      throw error
    }
  }
  useEffect( () => {
    getAPI()
  }, [])

  const ENDPOINT = "http://127.0.0.1:3001";

  const [messages, setMessages] = useState([])

  const addMessageAction = async (e, message) => {
    e.preventDefault()
    if (! message) return false

    const postRequestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(message)
    }
    
    await fetch('http://localhost:3001/message', postRequestOptions)

    const socket = socketIOClient(ENDPOINT);
    socket.emit('message-sent', message)


    try {

      getAPI()

    } catch (error) {

      throw error
    }
  }

  return (
    <div className="App">

        <MessageContext.Provider value={{
            messages: JSON.stringify(messages),
            addMessageAction: addMessageAction
        }}>
            <MessageList/>

            <MessageForm/>

        </MessageContext.Provider>
        
    </div>
  );
}

export default App
