const inquirer = require('inquirer');
const db = require("./db/connection.js");
const express = require('express');
const { changeUser } = require('./db/connection.js');


const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// require("console.table");



const mainMenu = () => {
    inquirer
        .prompt([
            {

                type: "list",
                name: "choice",
                message: "What would you like to do?",
                choices: [
                    {
                        name: "View All Employees",
                        value: "VIEW_EMPLOYEES"
                    },
                    // View Employees
                    // View Departments
                    {
                        name: "View All Departments",
                        value: "VIEW_DEPARTMENTS"
                    },
                    // ViewRoles
                    {
                        name: "View Roles",
                        value: "VIEW_ROLES"

                    },

                    // ADD Emplyees
                    {
                        name: "Add Employees",
                        value: "ADD_EMPLOYEES"

                    },
                    // ADD ROLE
                    {
                        name: "Add Role",
                        value: "ADD_ROLE"

                    },
                    // ADD Department
                    {
                        name: "Add Department",
                        value: "ADD_DEPARTMENT"
                    },
                    // Update and employee role

                    {
                        name: "Update and employee role",
                        value: "UPDATE_ROLE"

                    },


                    {
                        name: "Quit",
                        value: "QUIT"
                    }
                ]
            }




        ]).then(res => {
            // now we call the appropriate function depending on what the user chooses
            // if or switch
            switch (res.choice) {
                case "VIEW_EMPLOYEES":
              
                    viewEmployees();


                    break;
                case "VIEW_DEPARTMENTS":
                    ViewDepartments();



                    break;
                case "VIEW_ROLES":

                    ViewRoles();

                    break;
                case "ADD_EMPLOYEES":
                    addEmployee();

                    break;
                case "ADD_DEPARTMENT":
                    addDepartment();

                    break;
                case "ADD_ROLE":
                        addRole();
    
                    break;
                case "UPDATE_ROLE":
                    updateRole();

                    break;
                case "QUIT":
                    quit();

                    break;

                default:
                    console.log("yo")
                    console.log(res.choice)
                    break;
            }

        })

}


mainMenu();

// conditional statment here call corresonding function
// async function viewEmployees() 

function viewEmployees() {
    const sql = `SELECT * FROM employee`;

    db.query(sql, function (err, results) {
        // console.table(results);
        console.table(results)
        mainMenu();

    });

};

// View departmnet function

function ViewDepartments() {

    const sql = `SELECT * FROM department`;

    db.query(sql, function (err, results) {
        console.table(results)
        mainMenu();
    })


};

// View Roles

function ViewRoles() {

    const sql = `SELECT * FROM role`;

    db.query(sql, function (err, results) {

        console.table(results)
        mainMenu();
    })

};


function quit() {
    console.log("Goodbye!");
    process.exit();
};

// add an employee function 

const addEmployee = () => {
    inquirer
        .prompt([

            {
                type: "input",
                name: "employeeID",
                message: "What is the employee id?",

            },

            {
                type: "input",
                name: "employeeFirstName",
                message: "What is your employees firstname?",

            },
            {
                type: "input",
                name: "emplyoeeLastName",
                message: "What is your employees lastname?",

            },
            {
                type: "input",
                name: "employeeRoleId",
                message: "What is your employees roleId?",

            },
            {
                type: "input",
                name: "employeeManagerId",
                message: "What is your employees manager_id",

            }
        ]).then((results) => {
            // console.log(results);
            // console.log(typeof results.employeeID, typeof results.employeeFirstName, typeof results.emplyoeeLastName, typeof results.employeeRoleId, typeof results.employeeManagerId);
            const sql = `INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
        VALUES (?, ?, ?, ?, ?)`;
            const params = [Number(results.employeeID), results.employeeFirstName, results.emplyoeeLastName, Number(results.employeeRoleId), Number(results.employeeManagerId)];

            db.query(sql, params, (err, result) => {

                console.log(results);
                mainMenu();
            })
        });
}

// 
// USE business_db;
// INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
// VALUES (8, "Jesse", "Maun", 2, 3)

// Add department

const addDepartment = () => {
    inquirer
        .prompt([

            {
                type: "input",
                name: "departmentID",
                message: "What is the department id?",

            },

            {
                type: "input",
                name: "departmentName",
                message: "What is the name of your department",

            }

        ]).then((results) => {
            // console.log(results);
            // console.log(results.departmentID, results.departmentName);
            const sql = `INSERT INTO department (id, name)
        VALUES (?, ?)`;
            const params = [Number(results.departmentID), results.departmentName];

            db.query(sql, params, (err, result) => {

                console.log(results);
                mainMenu();
            })
        });
}


// Add roles

const addRole = () => {
    inquirer
        .prompt([

            {
                type: "input",
                name: "roleID",
                message: "What is your id?",

            },

            {
                type: "input",
                name: "title",
                message: "What is your job title",

            },
            {
                type: "input",
                name: "salary",
                message: "What salary will you have?",

            },
            {
                type: "input",
                name: "department_id",
                message: "What is your department id?",

            }

        ]).then((results) => {
            // console.log(results);
            // console.log(results.departmentID, results.departmentName);
            const sql = `INSERT INTO role (id, title, salary, department_id)
        VALUES (?, ?, ?, ?)`;
            const params = [Number(results.roleID), results.title, results.salary, Number(results.department_id)];

            db.query(sql, params, (err, result) => {

                console.log(params);
                mainMenu();
            })
        });
}

// update roles 

const updateRole = () => {
    const sql = `SELECT first_name, id  FROM employee`;


    db.query(sql, function (err, results) {

        // console.table(results)
        // console.log(results);


        var names = results.map(user => {
            return {
                name: user.first_name,
                value: user.id
            }


        });
        // console.log(names)


        inquirer
            .prompt([{
                type: "list",
                name: "employeeId",
                message: "Which employee would you like to update their role?",
                choices: names

            },

            ]).then((answer) => {

                var employeeID = answer.employeeId

                const sql = `SELECT id, title FROM role`;
                // const sql = `UPDATE  SET review = ? WHERE id = ?`;
                const params = [];

                db.query(sql, params, (err, roles) => {

                    // console.log(roles);
                    // console.table(roles);

                    var allRoles = roles.map(role => {
                        return {
                            name: role.title,
                            value: role.id
                        }
                    });
                    inquirer
                        .prompt([{
                            type: "list",
                            name: "rolesId",
                            message: "What role would you like to give them?",
                            choices: allRoles

                        },

                        ]).then((roleAnswer) => {

                            var roleID = roleAnswer.rolesId

                            // console.log(employeeID);
                            // console.log(roleAnswer);



                            const sql = `UPDATE  employee SET role_Id = ${roleID} WHERE id = ${employeeID}`;
                            const params = [];

                            db.query(sql, params, (err, res) => {

                                console.log('Updated employees role')

                                mainMenu();
                            });

                        });
                });

            });
    })
}
