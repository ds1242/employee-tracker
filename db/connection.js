const mysql = require('mysql2');
// const { secrets } = require('.secrets.js');
const secret = require('../secrets');

const db = mysql.createConnection(
    {
        host:'localhost',
        user: 'root',
        password: secret,
        database: 'employee_tracker'
    },
    console.log('Connected to the election database')
);

module.exports = db;
