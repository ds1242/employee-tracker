const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host:'localhost',
        user: 'root',
        password: 'SurfaceSkis12!!',
        database: 'employee_tracker'
    },
    console.log('Connected to the election database')
);

module.exports = db;
