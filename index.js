require('dotenv').config();
const express = require('express');
var cors = require('cors')
const bodyParser = require('body-parser');

const { dbConnection } = require('./database/config');

const app = express();

//Configuration CORS
app.use(cors())

//read and parse of body
app.use(bodyParser.json());


//BD
dbConnection();

//Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/login', require('./routes/auth'));


app.listen(process.env.PORT , () => {
    console.log(`App running on port !` + process.env.PORT);
})