const express = require('express');
const PORT = require('../src/config/index');
const {dbConnection} = require('./database');
const expressApp = require('./express-app');

const StartApp = async() => {
    const app = express();
    await new dbConnection();
    await expressApp(app);
    console.log(PORT.PORT);
    app.listen(PORT.PORT, () =>{
        console.log(`listening on port ${PORT.PORT}`);
    })
    .on('error', (err) => {
        console.log(err);
        process.exit;
    })
}

StartApp();