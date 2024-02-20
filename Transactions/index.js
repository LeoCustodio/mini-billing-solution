const express = require('express');

const app = express();

app.use(express.json());

app.use('/', (req, res,next) =>{
    return res.status(200).json({"msg":"Transaction MicroService"});
})

app.listen(8003, () => {
    console.log('Transactions is Listening to port 8003');
})