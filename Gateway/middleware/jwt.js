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

// module.exports.verifyToken = (req, res, next) => {
//     const token = req.header('Authorization');
//     console.log(token);
//     if (!token) return res.status(401).json({ error: 'Access denied' });
//     try {
//         const decoded = jwt.verify(token, APP_SECRET);
//         req.userId = decoded.userId;
//         next();
//     } catch (error) {
//         res.status(401).json({ error: 'Invalid token' });
//     }
//  };