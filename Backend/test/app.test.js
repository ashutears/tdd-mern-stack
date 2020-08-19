import request from 'supertest'
import { expect } from "chai"

import app from "../app"

describe("message API endpoint tests", () => {

    it ("gets from backend messages", (done) => {
        const res = request(app).get('/')

        // res.expect(200, done);

        res.end((err, res) => {
            if (err) {
                return done(err)
            }

            expect(res.body.length).to.equal(0) // empty in the beginning
            done()
        })
    })

    it ("posts a message", (done) => {
        let data = {content: 'hi world'}

        const res = request(app)
            .post('/message')
            .send(data)
            .set("Accept", "application/json")

        res.expect(200)
            .end((err, res) => {
                if (err) done(err)

                expect(res.body[0].content).to.deep.equal('hi world')

                done()
            })
    })

    it ("updates and returned a single message", (done) => {
        let data = {content: 'updated content'}

        // insert a message first
        request(app)
            .post('/message')
            .send({content: 'initial content'})
            .set("Accept", "application/json")

        const res = request(app)
            .post('/message/1')
            .send(data)
            .set('Accept', "application/json")

        res.expect(200)
            .end((err, res) => {
                if (err) done(err)

                expect(res.body[0].content).to.deep.equal(data.content)

                done()
            })
    })

    it ("deletes a message", (done) => {
        request(app).post('/message').send({content: 'test content'}).set("Accept", "application/json")

        request(app)
            .delete('/message/1')
            .set("Accept", 'application/json')
            .end((err, res) => {
                if (err) done(err)
                
                expect(res.body.length).to.equal(0)
                
                done()
            })
    })

    // Error Testing
    describe ("Error Handling", () => {

        it ("empty post message returns error", (done) => {
            request(app)
                .post('/message')
                .set("Accept", 'application/json')
                .send({content: ''})
                .end((err, res) => {
                    if (err) done(err)
                    
                    expect(res.body).to.equal('Empty string cannot be a message')
                    
                    done()
                })
        })

    })
})