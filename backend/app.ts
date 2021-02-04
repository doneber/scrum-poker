import express from 'express'
const app = express()

app.get('/', (req, res) => res.send('The server is running OK'))

export default app