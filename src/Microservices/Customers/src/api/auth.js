const User = require('../database/models/usersModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {APP_SECRET} = require('../config');

module.exports = (app) => {

    // User registration
    app.post('/register', async (req, res) => {
        try {
            const { username, password } = req.body;

            const hashedPassword = await bcrypt.hash(password, 10);

            const user = new User({ username, password: hashedPassword });

            await user.save();

            res.status(201).json({ message: `User registered successfully` });
        } catch (err) {
            res.status(500).json({ error: `'Registration failed' - ${err}` });
        }});
        
    // User login
    app.post('/login', async (req, res) => {
        try {
            const { username, password } = req.body;

            const user = await User.findOne({ username });

            if (!user) {
                return res.status(401).json({ error: 'Authentication failed' });
            }

            const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch) {
                return res.status(401).json({ error: 'Authentication failed' });
            }

            const token = jwt.sign({ userId: user._id }, APP_SECRET, {
            expiresIn: '1h',
            });
            res.status(200).json({ token });
        } catch (err) {
        res.status(500).json({ err: 'Login failed' });
        }});
}