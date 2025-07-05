const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect')
const notFound = require('./middlewares/not-found')
require('dotenv').config()
const port = process.env.PORT || 5000;
const errorHandler = require('./middlewares/errorHandler')

//middleware
app.use(express.static('./public'))
app.use(express.json())


app.use('/api/v1/tasks',tasks)
app.use(notFound)
app.use(errorHandler)
const startServer = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => console.log(`Server is listening on port ${port}...`))
    }
    catch(error) {
        console.error('Failed to start the server:', error)
    }
}

startServer()