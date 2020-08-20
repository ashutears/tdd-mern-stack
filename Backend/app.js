import express from 'express'
import routes from "./lib/routes"
import cors from 'cors'
import http from 'http'
import io from 'socket.io'

const app = express()
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(routes)

const server = http.createServer(app)
const socket = io(server)

socket.on("connection", (sock) => {
    console.log("New client connected")

    sock.on("disconnect", () => {
        console.log("Client disconnected")
    })
})

server.listen(3001, () => console.log('Connected at 3001'))

export default app
