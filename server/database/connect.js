const { Pool } = require('pg');

const db = new Pool({
    connectionString: process.env.DB_URL
})

console.log('Connected to the database');

module.exports = db;