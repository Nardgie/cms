const inquirer = require('inquirer');
const database = require('./config/connection');
const figlet = require('figlet');

const table = require('console.table');


figlet.text('Employee Tracker', {
    font: "3-d",
    horizontalLayout: 'controlled smushing',
    width: 65,
    whitespaceBreak: true
}, function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data);
    console.log('Welcome to the Employee Tracker');
    console.log('--------------------------------');
    console.log('Please select an option below');
})

// Main menu function to prompt user with options
const mainMenu = () => {
    inquirer.prompt([{
        type: 'list',
        name: 'mainMenu',
        message: 'What would you like to do?',
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Exit']
    }]).then((response) => {
        switch (response.mainMenu) {
            case 'View all departments':
                viewDepartments();
                break;
            case 'View all roles':
                viewRoles();
                break;
            case 'View all employees':
                viewEmployees();
                break;
            case 'Add a department':
                addDepartment();
                break;
            case 'Add a role':
                addRole();
                break;
            case 'Add an employee':
                addEmployee();
                break;
            case 'Update an employee role':
                updateEmployeeRole();
                break;
            case 'Exit':
                console.log('Goodbye!');
                process.exit();
        }
    })
}

// Function to view all departments
const viewDepartments = () => {
    database.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        console.table(res);
        mainMenu();
    })
}

// Function to view all roles
const viewRoles = () => {
    database.query('SELECT * FROM role', (err, res) => {
        if (err) throw err;
        console.table(res);
        mainMenu();
    })
}

// Function to view all employees
const viewEmployees = () => {
    database.query('SELECT * FROM employee', (err, res) => {
        if (err) throw err;
        console.table(res);
        mainMenu();
    })
}

// Function to add a department to the database
const addDepartment = () => {
    inquirer.prompt([{
        type: 'input',
        name: 'departmentName',
        message: 'Enter the name of the department you would like to add'
    }]).then((response) => {
        database.query('INSERT INTO department SET ?', { name: response.departmentName }, (err, res) => {
            if (err) throw err;
            console.log('Department added successfully');
            mainMenu();
        })
    })
}

// Function to add a role to the database
const addRole = () => {
    inquirer.prompt([{
        type: 'input',
        name: 'roleTitle',
        message: 'Enter the title of the role you would like to add'
    }, {
        type: 'input',
        name: 'roleSalary',
        message: 'Enter the salary of the role you would like to add'
    }, {
        type: 'input',
        name: 'roleDepartmentId',
        message: 'Enter the department ID of the role you would like to add'
    }]).then((response) => {
        database.query('INSERT INTO role SET ?', { title: response.roleTitle, salary: response.roleSalary, department_id: response.roleDepartmentId }, (err, res) => {
            if (err) throw err;
            console.log('Role added successfully');
            mainMenu();
        })
    })
}

// Function to add an employee to the database  
const addEmployee = () => {
    inquirer.prompt([{
        type: 'input',
        name: 'employeeFirstName',
        message: 'Enter the first name of the employee you would like to add'
    }, {
        type: 'input',
        name: 'employeeLastName',
        message: 'Enter the last name of the employee you would like to add'
    }, {
        type: 'input',
        name: 'employeeRoleId',
        message: 'Enter the role ID of the employee you would like to add'
    }, {
        type: 'input',
        name: 'employeeManagerId',
        message: 'Enter the manager ID of the employee you would like to add'
    }]).then((response) => {
        database.query('INSERT INTO employee SET ?', { first_name: response.employeeFirstName, last_name: response.employeeLastName, role_id: response.employeeRoleId, manager_id: response.employeeManagerId }, (err, res) => {
            if (err) throw err;
            console.log('Employee added successfully');
            mainMenu();
        })
    })
}

// Function to update an employee role  
const updateEmployeeRole = () => {
    inquirer.prompt([{
        type: 'input',
        name: 'employee',
        message: 'Enter the ID of the employee you would like to update'
    }, {
        type: 'input',
        name: 'roleId',
        message: 'Enter the ID of the role you would like to assign to the employee'
    }]).then((response) => {
        database.query('UPDATE employee SET role_id = ? WHERE id = ?', [response.roleId, response.employeeId], (err, res) => {
            if (err) throw err;
            console.log('Employee role updated successfully');
            mainMenu();
        })
    })
}

// Don't forget to call the mainMenu function to start the application
mainMenu();

