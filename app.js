const express = require('express');
require('express-async-errors');
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect')
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

require('dotenv').config()
// middleware for access data
app.use(express.json());

app.use('/api/v1/tasks', tasks)
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


const port = 5000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server listening on port ${port}`));
    } catch (err) {
        console.log(err);
    }
}
start()
