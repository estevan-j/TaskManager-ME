const express = require('express');
const TaskRouter = require('./routes/TaskRoute');
const morgan = require('morgan');
const connectDB = require('../src/db/connection');
const notFound = require('../src/middleware/not-found');
const errorHandlerMiddleware = require('../src/middleware/error-handler');
require('dotenv').config()

const app = express();
   
//Settings
const PORT = process.env.PORT || 3000

// Middleware
app.use(morgan('dev'))
app.use(express.static('./public'))
app.use(express.json())

//ROUTES
app.use('/api/v1/tasks', TaskRouter)


app.use(notFound);
app.use(errorHandlerMiddleware);


const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT,() => {
            console.log(`Server is listening on PORT ${PORT}`)
        })
    } catch (error) {
        console.log(error);
    }
}

start();

