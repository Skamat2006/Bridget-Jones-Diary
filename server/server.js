const express = require('express');
const cors = require('cors');

const server = express();

//middleware
server.use(cors());
server.use(express.json());

server.get('/', (req, res) => {
    res.send('Hello Bridget Jones');
})

module.exports = server;