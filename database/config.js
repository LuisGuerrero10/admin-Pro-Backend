const mongoose = require('mongoose');

const dbConnection = async () => {

    try {
        await mongoose.connect(process.env.DB_CNN , {
            useNewUrlParser : true,
            useUnifiedTopology : true,
    });

        console.log('db connected')

    } catch (error) {

        console.log(error);
        throw new Error('error when starting the db');

    }
}

module.exports = {
  dbConnection

}