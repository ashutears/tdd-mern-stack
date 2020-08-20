import { Router } from "express"
const messageApp = require('./controller')
const routes = Router()

routes.get('/', async (req, res) => {

    await messageApp.getAll()
        .then((messages) => {
            return res.json(messages)
        })
        .catch((err) => res.status(404).json(err))
})

routes.post('/message', async (req, res) => {
    await messageApp.post(req.body.content)
        .then((messages) => res.json(messages))
        .catch((err) => res.status(404).json(err))
})


routes.post('/message/:id', async (req, res) => {
    try {
        const messages = await messageApp.update(req.params.id, req.body.content)

        res.json(messages)

    } catch (error) {
        res.status(404).json(error)
    }
    
})

routes.delete('/message/:id', async (req, res) => {
    try {
        const messages = await messageApp.deleteMessage(req.params.id)
        
        res.json(messages)

    } catch (error) {
        res.status(404).json(error)
    }
    
})

export default routes