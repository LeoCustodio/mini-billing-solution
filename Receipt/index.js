const express = require('express');

const app = express();

app.use(express.json());

app.use('/', (req, res,next) =>{
    return res.status(200).json({"msg":"Receipt MicroService"});
})

app.listen(8002, () => {
    console.log('Receipt is Listening to port 8004');
})