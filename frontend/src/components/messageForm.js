import React from 'react'

class MessageForm extends React.Component {

    constructor() {
        super()

        this.state = {
            currentMessage: ''
        }
    }

    changeMessageValue(change) {
        this.setState({
            currentMessage: change
        })
    }

    render() {
        return (
            <form id='message_form'>
                
                <textarea 
                    id = "message_box" 
                    onChange={(e) => this.changeMessageValue(e.target.value)}
                    value={this.state.currentMessage}
                > </textarea>

                <button name = "submit"id = "submit" > </button>
            </form>
        )
    }
}

export default MessageForm