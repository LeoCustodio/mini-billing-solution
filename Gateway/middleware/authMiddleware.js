// const jwt = require('./jwt');
const jwt = require('jsonwebtoken');
const {APP_SECRET} = require('../config');


function verifyToken(req, res, next){
    const token = req.header('Authorization');
    console.log(token);
    if (!token) return res.status(401).json({ error: 'Access denied' });
    try {
        const decoded = jwt.verify(token, APP_SECRET);
        req.userId = decoded.userId;
        return next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
}

const Keycloak = require('keycloak-connect');
const session = require('express-session');

const setupAuth = (app, routes) => {
    var memoryStore = new session.MemoryStore();
    var keycloak = new Keycloak({ store: memoryStore });

    app.use(session({
        secret:'<RANDOM GENERATED TOKEN>',
        resave: false,
        saveUninitialized: true,
        store: memoryStore
    }));

    app.use(keycloak.middleware());
    
    routes.forEach(r => {
        if (r.auth) {
            app.use(r.url, verifyToken, function (req, res, next) {
                next();
            });
        }
    });
}

exports.setupAuth = setupAuth