const express = require('express');
const inqurier = require('inquirer');
const cTable = require('console.table');
const db = require('./db/connection');


let departmentArr = [];
let rolesArr = [];
let managerNameArr = [];
let employeeNameArr = [];

// functions to set results array from SQL queries to be used in inquirer prompts
const setResultsToDeptArr = (array) => {
    departmentArr = array;
    return departmentArr;
};
const setToRolesArr = (array) => {
    rolesArr = array;
    return rolesArr;
};

const setToManagerArr = (array) => {
    for(let i = 0; i < array.length; i++) {
        managerNameArr[i] = array[i].first_name + ' ' + array[i].last_name ;
    }
    return managerNameArr;
};

const setToEmployeeArr = (array) => {
    employeeNameArr = array;
    return employeeNameArr;
};

// function to get the department name 
const getDepartments = (array) => {
    const db = require('./db/connection');
    const sql = `SELECT name FROM department`;
    
        db.query(sql, (err, rows) => {
            if(err) {
                console.log(err)
                return;
            }
            for(let i = 0; i < rows.length; i++){
                array.push(rows[i].name);
                // console.log(departmentArr[i]);
            }    
            setResultsToDeptArr(array);       
            return;            
        });
};
// function to query and get the role names
const getRoles = (array) => {
    const db = require('./db/connection');
    const sql = `SELECT title FROM roles`;
    db.query(sql, (err, rows) => {
        if(err) {
            console.log(err)
            return;
        }
        for(let i = 0; i < rows.length; i++ ){
            array.push(rows[i].title);
        }
        setToRolesArr(array);
        return;
    })
};

const getManagerID = (array) => {
    const sql = `SELECT DISTINCT M.first_name, M.last_name
    FROM employee E
    JOIN employee M ON E.manager_id = M.id
    WHERE E.manager_id = M.id`;
    db.query(sql, (err, rows) => {
        if(err) {
            console.log(err)
            return;
        }
        for(let i = 0; i < rows.length; i++) {
            array.push(rows[i]);
        }
        setToManagerArr(array);
        return;
    })
};

const getEmployee = (array) => {
    const sql = `SELECT first_name, last_name 
    FROM employee`;
    db.query(sql, (err, rows) => {
        if(err) {
            console.log(err)
            return;
        }
        for(let i = 0; i < rows.length; i++ ) {
            array.push(rows[i].first_name + ' ' + rows[i].last_name);
        }
        setToEmployeeArr(array);
        return;
    })
};

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
        message: 'Please enter a department this role falls under',
        choices: departmentArr,
        when: (answers) => answers.menu === 'Add a role',
        validate: newRoleDepartment => {
            if (newRoleDepartment) {
                return true;
            } else {
                console.log('Please select a department');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'newFirstName',
        message: "Please enter the employee's first name?",
        when: (answers) => answers.menu === 'Add an employee',
        validate: newFirstName => {
            if(newFirstName) {
                return true;
            } else {
                console.log('Please enter their first name');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'newLastName',
        message: "Please enter the employee's last name?",
        when: (answers) => answers.menu === 'Add an employee',
        validate: newLastName => {
            if(newLastName) {
                return true;
            } else {
                console.log('Please enter their first name');
                return false;
            }
        }
    },
    {
        type: 'list',
        name: 'newEmployeeRole',
        message: 'Please select their role',
        choices: rolesArr,
        when: (answers) => answers.menu === 'Add an employee',
        validate: newEmployeeRole => {
            if(newEmployeeRole) {
                return true;
            } else {
                console.log('Please select a role');
                return false;
            }
        }
    },
    {
        type: 'list',
        name: 'newEmployeeManager',
        message: 'Please select a manager the new employee will report',
        choices: managerNameArr,
        when: (answers) => answers.menu === 'Add an employee',
        validate: newEmployeeManager => {
            if(newEmployeeManager) {
                return true;
            } else {
                console.log('Please select a manager');
                return false;
            }
        }
    },
    {
        type: 'list',
        name: 'editEmployee',
        message: 'Please select an employee to edit their role',
        choices: employeeNameArr,
        when: (answers) => answers.menu === 'Update an employee role',
        validate: editEmployee => {
            if(editEmployee) {
                return true;
            } else {
                console.log('Please select an employee');
                return false;
            }
        }
    },
    {
        type: 'list',
        name: 'updateRole',
        message: 'Please select a new role',
        choices: rolesArr,
        when: (answers) => answers.menu === 'Update an employee role',
        validate: updateRole => {
            if(updateRole) {
                return true;
            } else {
                console.log('Please select a role');
                return false;
            }
        }
    }
];



async function promptUser() {
    const mysql = require('mysql2/promise');
    const db = require('./db/connection');
    // call queries to push values into an array to be used later in the promptUser prompts for inqurier
    // this also ensures that the data is correct each time a function completes
    getDepartments(departmentArr);
    getRoles(rolesArr);
    getManagerID(managerNameArr);
    getEmployee(employeeNameArr);  

    return inqurier
        .prompt(questions)
        .then(({menu, newDepartment, newRoleTitle, newRoleSalary, newRoleDepartment, newFirstName, newLastName, newEmployeeRole, newEmployeeManager, editEmployee, updateRole}) => {
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
            } else if(menu === 'Add a role') {
                // get index from department arr to set the id 
                let index = departmentArr.indexOf(newRoleDepartment);
                // insert into role table
                const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`
                const params = [newRoleTitle, newRoleSalary, index]
                db.query(sql, params, (err, rows) => {
                    if(err) {
                        console.log(err);
                        return;
                    }
                    const sql = `SELECT * FROM roles`;
                    db.query(sql, (err, rows) => {
                        if(err) {
                            console.log(err)
                            return;
                        }
                        const table = cTable.getTable(rows);
                        console.log(table);
                        return promptUser();
                    });                    
                });
            } else if(menu === 'Add an employee') {
                // get index of role for new employee from array and add one to match row from sql table
                let indexRole = 1 + rolesArr.indexOf(newEmployeeRole);
                // get index of manager array and add one to match table value
                let indexManager = 1 + managerNameArr.indexOf(newEmployeeManager);

                const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
                const params = [newFirstName, newLastName, indexRole, indexManager];
                db.query(sql, params, (err, rows) => {
                    if(err) {
                        console.log(err);
                        return;
                    }
                    const sql2 = `SELECT E.*, M.first_name AS manager_first_name, M.last_name AS manager_last_name
                    FROM employee E
                    JOIN employee M ON E.manager_id = M.id`;
                    db.query(sql2, (err, rows) => {
                        if(err) {
                            console.log(err)
                            return;
                        }
                        const table = cTable.getTable(rows);
                        console.log(table);
                        return promptUser();
                    });
                });
            } else if(menu === 'Update an employee role') {
                // get index of employee array and one to match table value
                let indexEmp = 1 + employeeNameArr.indexOf(editEmployee);
                // get index of role array and add one to match table value
                let indexRole = 1 + rolesArr.indexOf(updateRole);
                console.log(indexEmp + "emp index" + indexRole + 'indexrole');
                const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
                const params = [indexRole, indexEmp];
                db.query(sql, params, (err, rows) => {
                    if(err) {
                        console.log(err);
                        return;
                    }
                    const sql2 = `SELECT * FROM employee WHERE id = ?`
                    db.query(sql2, indexEmp, (err, rows) => {
                        if(err) {
                            console.log(err);
                            return;
                        }
                        console.log('Employee Updated!')
                        const table = cTable.getTable(rows);
                        console.log(table);
                        return promptUser();
                    });
                });
            } else if(menu === 'Exit') {
                console.log('Goodbye!');
                return process.exit();
            }
        })
        // .then(promptUser());
        // .then(db.execute('/api/departments'));
};

// call prompt user to execute at the command line
promptUser();





