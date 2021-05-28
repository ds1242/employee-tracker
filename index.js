const express = require('express');
const inqurier = require('inquirer');
const cTable = require('console.table');

const departmentArr = [];
const getDepartments = () => {
    const db = require('./db/connection');
    const sql = `SELECT name FROM department`;
    
        db.query(sql, (err, rows) => {
            if(err) {
                console.log(err)
                return;
            }
            for(let i = 0; i < rows.length; i++){
                departmentArr.push(rows[i].name);
            }
            
            console.log(departmentArr);
            return;
            
        });
};
// var departmentArr = [];
getDepartments();
console.log(departmentArr)

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
        when: (answers) => answers.menu === 'Add a department',
        validate: newDepartment => {
            if(newDepartment) {
                return true;
            } else {
                console.log('Please enter a name for the new department');
                return false;
            }
        }
    },
    {
        type:'input',
        name: 'newRoleTitle',
        message: 'What is the title of the new role?',
        when: (answers) => answers.menu === 'Add a role',
        validate: newRoleTitle => {
            if(newRoleTitle) {
                return true;
            } else {
                console.log('Please enter the title of the new role');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'newRoleSalary',
        message: 'What is the salary for the new role?',
        when: (answers) => answers.menu === 'Add a role',
        validate: newRoleSalary => {
            if(newRoleSalary) {
                return true;
            } else {
                console.log('Please enter a salary for the new role');
                return false;
            }
        }
    },
    {
        type: 'list',
        name: 'newRoleDepartment',
        message: 'Please enter a department id this role falls under',
        choices: departmentArr,
        when: (answers) => answers.menu === 'Add a role',
        validate: newRoleDepartment => {
            if (newRoleDepartment) {
                return true;
            } else {
                console.log('Please enter a department id');
                return false;
            }
        }
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
                })
            } 
            // else if(menu === 'Add a role') {
            //     const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`

            // }
        })
        // .then(promptUser());
        // .then(db.execute('/api/departments'));
};

promptUser();
// main();


