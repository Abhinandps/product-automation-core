const express = require('express')
const path = require('path')
const cors = require('cors')
const dotenv = require('dotenv')
const colors = require('colors')
const connectDB = require('./config/db')
const { readdirSync } = require('fs')
const { notFound, errorHandler } = require('./middleware/errorMiddleware')

dotenv.config({path:"./config.env"})
const app = express()


app.use(cors())
app.use(express.json({ limit: '2mb' }))

connectDB()
app.get('/', (req, res) => {
  res.send('API is running....')
})

// routes middleware -auto load
readdirSync('./routes').map((r) => app.use('/api', require('./routes/' + r)))

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, console.log(`Server running at ${PORT}`.yellow.bold))


