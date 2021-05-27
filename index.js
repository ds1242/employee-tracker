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

    },
    {
        type:'input',
        name: 'newDepartment',
        message: 'What is the name of the new department?',
        when: (answers) => answers.menu === 'Add a department'
    }
];



async function promptUser() {
    const mysql = require('mysql2/promise');
    const db = require('./db/connection');

    return inqurier
        .prompt(questions)
        .then(({menu, newDepartment}) => {
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
                    const table = cTable.getTable(rows);
                    console.log(table);
                    return promptUser();
                });
            } else if(menu === 'View all employees') {
                const sql = `SELECT E.*, M.first_name AS manager_first_name, M.last_name AS manager_last_name
                FROM employee E
                JOIN employee M ON E.manager_id = M.id`;
                db.query(sql, (err, rows) => {
                    if(err) {
                        console.log(err);
                        return;
                    }
                    const table = cTable.getTable(rows);
                    console.log(table);
                    return promptUser();
                })
            } else if(menu === 'Add a department') {
                const sql = `INSERT INTO department (name) VALUES (?)`;
                const params = [newDepartment];
                db.query(sql, params, (err, rows) => {
                    if(err) {
                        console.log(err);
                        return;
                    }
                    const table = cTable.getTable(rows);
                    console.log(table);
                    return promptUser();
                })
            }
        })
        // .then(promptUser());
        // .then(db.execute('/api/departments'));
};

promptUser();
// main();


