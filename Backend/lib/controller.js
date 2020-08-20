import { MessageApp } from "./model";

let messageApp;
if (process.env.npm_lifecycle_event === 'test') {
    messageApp = new MessageApp(`${__dirname}/json/testMessages.json`)
} else {
    messageApp = new MessageApp(`${__dirname}/json/messages.json`)
}

function getAll() {

    return new Promise((resolve, reject) => {
        var result = messageApp.getAll()
        
        if(result !== []) {
            resolve(result)
        } else {
            reject(result)
        }
    })
}

function post(data) {

    return new Promise((resolve, reject) => {
        
        var result = messageApp.post(data)

        if (result !== []) {
            resolve(result)
        } else {
            reject(result)
        }
    })
}

function update(id, content) {
    return new Promise((resolve, reject) => {
        var result = messageApp.update(id, content)

        if (result !== []) {
            resolve(result)
        } else {
            reject(result)
        }
    })
}

function deleteMessage(id) {
    return new Promise((resolve, reject) => {
        var result = messageApp.delete(id)

        if (result === '') {
            resolve(result)
        } else {
            reject(result)
        }
    })
}

module.exports = {
    getAll,
    post,
    update,
    deleteMessage
}