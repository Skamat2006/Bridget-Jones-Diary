const fs = require('fs');

require('dotenv').config();

const db = require('./connect');

const sql = fs.readFileSync('./database/setup.sql').toString();

db.query(sql)
    .then(data => {
        console.log('Database setup complete');
        db.end();
    })
    .catch(error => console.log(error));