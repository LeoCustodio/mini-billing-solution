const express = require('express');
const cors = require('cors');
const proxy = require('express-http-proxy');
const helmet = require("helmet");
const morgan = require("morgan");
const { setupProxies } = require('./proxy/proxy');
const {setupAuth} = require("./middleware/authMiddleware");
const { routes } = require('./routes/routes');
const PORT = process.env.PORT || 8000;
const app = express();


setupAuth(app, routes);
setupProxies(app, routes);


app.use(cors());
app.use(express.json());
app.use(helmet()); // Add security headers
app.use(morgan("combined")); // Log HTTP requests
app.disable("x-powered-by"); // Hide Express server information

// app.use('/transactions', proxy('http://localhost:8001'));
// app.use('/customers', proxy('http://localhost:8002'));
// app.use('/', proxy('http://localhost:8003'));



app.listen(8000, () => {
    console.log(`Gateway port ${PORT}`);
})

