
import { expect } from "chai"
import { MessageApp } from '../lib/model'

const srcFile = __dirname + '/../lib/json/testMessages.json'

describe ("App", () => {

    let testApp

    beforeEach(() => {
        testApp = new MessageApp(srcFile)

        testApp.post('hi world')
    })

    afterEach(() => {
        while (testApp.messages.length > 0) {
            testApp.delete(testApp.messages[0].id)
        }
    })

    it ("app has messages", () => {
        expect(testApp.messages).to.be.an('array')
    })

    it ("app creates message (post)", () => {
        testApp.post('hi world')
        expect(testApp.messages.length).to.equal(2)
    })

    it ("message has content, date, and id", () => {

        expect(testApp.messages[0].content).to.equal('hi world')

        expect(testApp.messages[0].date).not.to.equal(undefined)

        expect(testApp.messages[0].id).to.equal(1)
    })

    it ("app reads (get)", () => {
        
        expect (testApp.get(1).content).to.equal('hi world')

    })

    it ("app updates (update)", () => {

        testApp.update(1, "hello world")

        expect (testApp.get(1).content).to.equal('hello world')
    })

    it ("app deletes (delete)", () => {

        testApp.delete(1)

        expect(testApp.messages.length).to.equal(0)
    })

    it ("id's are always unique", () => {

        testApp.post('1')
        testApp.post('2')
        testApp.delete(1)
        testApp.post('3')

        expect(testApp.messages[2].id).to.equal(4)
    })

    it ("app deletes correctly", () => {
        testApp.post('1')
        testApp.post('2')
        testApp.post('3')
        testApp.delete(1)
        testApp.delete(2)

        expect(testApp.get(1)).to.be.equal(undefined) // deleted id should be undefined
        expect(testApp.messages.length).to.equal(2)
    })

    it ("app updates correctly", () => {
        testApp.update(1, 'Updated')

        expect(testApp.get(1).content).to.equal('Updated')
    })

    it ("app reads from the given file path", () => {
        let testFileApp = new MessageApp(srcFile)

        expect(testApp.messages.length).to.equal(1)
    })

    it ("app validates given file content has list of items containing id, content and date", () => {
        let testFileApp = new MessageApp(srcFile)

        expect(testFileApp.messages).to.be.an('array')

        // expect(testFileApp.messages.length).to.be.equal(1)

        expect(testFileApp.messages[0]).to.haveOwnProperty('id')
        expect(testFileApp.messages[0]).to.haveOwnProperty('content')
        expect(testFileApp.messages[0]).to.haveOwnProperty('date')
    })

    it ("app syncs its contents with the given filt contents", () => {
        let testMsgFileWrite = new MessageApp(srcFile),
            originalMessageCount = testMsgFileWrite.messages.length

        testMsgFileWrite.post('New message')
        expect(testMsgFileWrite.messages.length).to.equal(originalMessageCount + 1) // test new message is added in app

        testMsgFileWrite = new MessageApp(srcFile)
        expect(testMsgFileWrite.messages.length).to.equal(originalMessageCount + 1) // test new message is saved in file

        testMsgFileWrite.delete(1)
        expect(testMsgFileWrite.messages.length).to.equal(originalMessageCount) // test message is deleted from app

        testMsgFileWrite = new MessageApp(srcFile)
        expect(testMsgFileWrite.messages.length).to.equal(originalMessageCount) // test message is deleted from file
    })

    it ("getAll returns all the messages", () => {
        expect(testApp.getAll()).to.be.an('array')
        expect(testApp.getAll().length).to.equal(testApp.messages.length)
    })

    it ("rejects new empty message", () => {
        let testApp = new MessageApp()

        expect(testApp.post('')).to.deep.equal('Empty string cannot be a message')
    })

    it ("rejects empty updates", () => {
        expect(testApp.update(1, "")).to.deep.equal([])
    })

    it ("returns error message if non existing message is attempted to delete", () => {
        expect(testApp.delete(0)).to.deep.equal('Message not found in database')
    })
})