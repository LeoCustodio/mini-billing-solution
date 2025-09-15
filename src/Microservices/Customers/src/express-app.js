const express = require('express');
const cors = require('cors');
const {customers, auth} = require('./api');
// const  { rateLimiterMiddleware } = require('./rateLimiterMiddleware');

module.exports = async (app, channel) => {
    // app.use(rateLimiterMiddleware);
    app.use(express.json({limit: 'lmb'}));
    app.use(express.urlencoded({extended: true, limit:'lmb'}));
    app.use(cors());
    app.use(express.static(__dirname + '/public'));


    //passing app to apis
    customers(app,channel);
    auth(app);

}