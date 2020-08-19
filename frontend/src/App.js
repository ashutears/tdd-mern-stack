import React from 'react'
import logo from './logo.svg'
import './App.css'

import MessageForm from './components/messageForm'
import MessageList from './components/messageList'

function App() {
  return (
    <div className="App">
        <img src={logo} className="App-logo" alt="logo" />

        <MessageForm />

        <MessageList />
    </div>
  );
}

export default App;