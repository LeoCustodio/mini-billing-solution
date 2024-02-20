const express = require('express');
const cors = require('cors');
const {transactions} = require('./api');

module.exports = async (app,channel) => {
    app.use(express.json({limit: 'lmb'}));
    app.use(express.urlencoded({extended: true, limit:'lmb'}));
    // app.cors(cors());
    app.use(express.static(__dirname + '/public'));


    //passing app to apis
    transactions(app,channel);
}