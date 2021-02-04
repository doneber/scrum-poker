import express from 'express'
import roomsRouter from './routes/rooms'
const app = express()

// Middlewares:
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Endpoints:
app.get('/', (req, res) => res.send('The server is running OK'))
app.use('/rooms', roomsRouter);

export default app