let departmentArr = [];
let rolesArr = [];
let managerNameArr = [];
let employeeNameArr = [];





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

module.exports = questions;