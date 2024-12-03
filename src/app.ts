import express from 'express'
import { router } from './routes/task-list-routes'

const app = express()

app.use(express.json())
app.use(router)

export { app }
