const express = require('express');
// const apiRoutes = require('./routes/apiRoutes');
// const server = require('./server');
const inqurier = require('inquirer');
const cTable = require('console.table');




const questions = [
    {
        type:'list',
        name: 'menu',
        message: 'What would you like to do?',
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Exit']

    }
];



async function promptUser() {
    const mysql = require('mysql2/promise');
    const db = require('./db/connection');

    return inqurier
        .prompt(questions)
        .then(({menu}) => {
            if(menu ===  'View all departments') {
                const sql = `SELECT * FROM department`;

                db.query(sql, (err, rows) => {
                    if(err) {
                        console.log(err)
                        return;
                    }
                    const table = cTable.getTable(rows);
                    console.log(table);
                    return promptUser();
                });
            } else if(menu === 'View all roles') {
                const sql = `SELECT * FROM roles`;

                db.query(sql, (err, rows) => {
                    if(err) {
                        console.log(err);
                        return;
                    }
                    console.log(rows)
                    return promptUser();
                });
            } else if(menu === 'View all employees') {
                const sql = `SELECT * FROM roles`;
                db.query(sql, (err, rows) => {
                    if(err) {
                        console.log(err);
                        return;
                    }
                    console.log(rows);
                    return promptUser();
                })
            }
        })
        // .then(promptUser());
        // .then(db.execute('/api/departments'));
};

promptUser();
// main();


