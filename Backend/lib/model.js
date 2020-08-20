
function newID(items) {
    if (items.length > 0) {
        return items[items.length-1].id + 1
    }

    return 1;
}

const fs = require('fs');

class MessageApp {

    constructor(srcFile=null) {
        this.sourceFile = srcFile
        this.messages = this.sourceFile ? this.readFromJson() : []
    }

    readFromJson() {
        return JSON.parse(fs.readFileSync(this.sourceFile, 'utf-8', (err, file) => {
            if (err) throw err
        }))
    }

    writeToJson() {
        if (this.sourceFile) {
            fs.writeFileSync(this.sourceFile, JSON.stringify(this.messages), (err, data) => {
                if (err) throw err
            })
        }
    }

    post (content) {
        if (content === undefined || content.length === 0) return 'Empty string cannot be a message'
        let item = {
            id: newID(this.messages),
            content: content,
            date: new Date()
        }

        this.messages.push(item)

        this.writeToJson()

        return this.messages
    }

    get (id) {

        return this.messages.filter(msg => msg.id === id)[0]

    }

    getAll() {
        return this.messages
    }

    update(id, content) {
        
        if (content === undefined || content.length === 0) return []

        this.messages = this.messages.map((msg) => {
            if (msg.id == id) {
                msg.content = content
            }

            return msg
        })

        this.writeToJson()

        return this.messages
    }

    delete(id) {

        if (this.messages.filter(msg => msg.id == id).length === 0) {
            return 'Message not found in database'
        }

        this.messages = this.messages.filter(message => message.id !== id)

        this.writeToJson()
    }

}

module.exports = {
    MessageApp
}