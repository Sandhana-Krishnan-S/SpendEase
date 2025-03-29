const express = require('express');
require('dotenv').config()
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.use('/' , (req , res) => {
    res.send('Hello from node');
});

const port = process.env.PORT || 8080;

app.listen(port , () => {
    console.log(`The app started on port http://localhost:${port}/`);
});