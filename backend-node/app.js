const express = require('express');
require('dotenv').config()
const bodyParser = require('body-parser');
const { connectDB } = require('./connectDB');
const mainRouter = require('./routers');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(bodyParser.json());

//connect to DB --- with ananomus auto calling function
(() => {
    connectDB();
})();

//all api handler
app.use('/api', mainRouter);

// Error Handler
app.use(errorHandler);

//404 Handler
app.use('*' , (req , res) => {
    res.status(404).send({
        status : false,
        data : null,
        error : "Invalid Url"
    });
});


const port = process.env.PORT || 8080;

app.listen(port , () => {
    console.log(`The app started on port http://localhost:${port}/`);
});
