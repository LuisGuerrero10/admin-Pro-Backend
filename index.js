require('dotenv').config();
const express = require('express');
var cors = require('cors')

const { dbConnection } = require('./database/config');

const app = express();

//Configuration CORS
app.use(cors())


//BD
dbConnection();


app.get('/', (req, res) => {
    res.json({
        ok: true,
        message: 'Hello World!'
    })

})

app.listen(process.env.PORT , () => {
    console.log(`App running on port !` + process.env.PORT);
})