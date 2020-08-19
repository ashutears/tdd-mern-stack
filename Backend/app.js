import express from 'express'
import routes from "./lib/routes"
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.use(routes)

app.listen(3001, () => console.log('Connected'))

export default app
