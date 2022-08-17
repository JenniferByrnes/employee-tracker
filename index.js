const inquirer = require('inquirer');
const db = require('./db/');

var promptTask = 'temp';

const firstQuestion = [
  {
    type: 'list',
    name: 'task',
    message: 'What would you like to do?',
    choices:
      [
        'View all departments',
        'View all roles',
        'View all employees',
        'View all employees by manager',
        'View salary totals by department',
        'Add a department',
        'Add a role',
        'Add an employee',
        "Update an employee's role",
        "Update an employee's manager",
        'Delete a department',
        'Delete a role',
        'Delete an employee',
        'Exit'
      ],
  },
]

const addADeptQuestions = [
  {
    type: 'input',
    name: 'newDeptName',
    message: 'What is the name of the department to be added?',
    validate: newDeptName => {
      if (newDeptName) {
        return true;
      } else {
        console.log("This field is required");
        return false;
      }
    }
  },
]

const addARoleQuestions = [
  {
    type: 'input',
    name: 'newRoleName',
    message: 'What is the name of the role to be added?',
    validate: newRoleName => {
      if (newRoleName) {
        return true;
      } else {
        console.log("This field is required");
        return false;
      }
    }
    
  },
  {
    type: 'number',
    name: 'newRoleSalary',
    message: 'What is the salary for this role?',
    validate: newRoleSalary => {
    if (newRoleSalary) {
      return true;
    } else if (newRoleSalary === 0) {
      return true;
    } else {
      console.log("This field is required");
      return false;
    }
  }
  },
]

const addAnEmpQuestions = [
  {
    type: 'input',
    name: 'newEmpFirstName',
    message: 'What is the first name of the employee to be added?',
    validate: newEmpFirstName => {
      if (newEmpFirstName) {
        return true;
      } else {
        console.log("This field is required");
        return false;
      }
    }
  },
  {
    type: 'input',
    name: 'newEmpLastName',
    message: 'What is the last name of the employee to be added?',
    validate: newEmpLastName => {
      if (newEmpLastName) {
        return true;
      } else {
        console.log("This field is required");
        return false;
      }
    }
  },
]

function ask() {
  inquirer.prompt(firstQuestion).then((answers) => {

    promptTask = answers.task;

    switch (promptTask) {
      case 'View all departments':
        viewAllDepts();
        break;
      case 'View all roles':
        viewAllRoles();
        break;
      case 'View all employees':
        viewAllEmps();
        break;
      case 'View all employees by manager':
        viewAllEmpsByMgr();
        break;
      case 'View salary totals by department':
        viewDeptSum();
        break;
      case 'Add a department':
        inquirer.prompt(addADeptQuestions).then((answers) => {
          insertDept(answers);
        })
        break;
      case 'Add a role':
        inquirer.prompt(addARoleQuestions).then((answers) => {
          insertRole(answers);
        })
        break;
      case 'Add an employee':
        inquirer.prompt(addAnEmpQuestions).then((answers) => {
          insertEmp(answers);
        })
        break;
      case "Update an employee's role":
        updateEmployeeRole();
        break;
      case "Update an employee's manager":
        updateEmployeeManager();
      break;
      case 'Delete a department':
        deleteDepartment();
      break;
      case 'Delete a role':
        deleteRole();
      break;
      case 'Delete an employee':
        deleteEmployee();
      break;

      default:
        console.log("Exiting");
        process.exit(1);
    }
  })
};

ask();

function viewAllDepts() {
  console.log("Getting departments...\n");
  db.viewAllDeptsDB()
    .then(([rows]) => {
      console.table(rows);
      console.log("\n");
    })
    .then(
      () => ask()
    )
};

function viewAllRoles() {
  console.log("Getting employee roles...\n");
  db.viewAllRolesDB()
    .then(([rows]) => {
      console.table(rows);
      console.log("\n");
    })
    .then(
      () => ask()
    )
};

function viewAllEmps() {
  console.log("Getting employees...\n");
  db.viewAllEmpsDB()
    .then(([rows]) => {
      console.table(rows);
      console.log("\n");
    })
    .then(
      () => ask()
    )
};

function viewAllEmpsByMgr() {
  console.log("Getting employees...\n");
  db.viewAllEmpsByMgrDB()
    .then(([rows]) => {
      console.table(rows);
      console.log("\n");
    })
    .then(
      () => ask()
    )
};

function viewDeptSum() {
  console.log("Getting total by department...\n");
  db.viewDeptSumDB()
    .then(([rows]) => {
      console.table(rows);
      console.log("\n");
    })
    .then(
      () => ask()
    )
};

function insertDept(answers) {
  console.log("Adding a Department...\n");
  db.insertDeptDB(answers)
    .then(
      db.viewAllDeptsDB()
      .then(([rows]) => {
        console.table(rows);
        console.log("\n");
      })
      .then(
        () => ask()
      )
    )
}

function insertRole(answers) {
  db.viewPlainDeptsDB()
    .then(([rows]) => {
      let departments = rows;
      const deptChoices = departments.map(({ id, dept_name }) => ({
        name: `${dept_name}`,
        value: id
      }));

      inquirer.prompt([
        {
          type: "list",
          name: "deptId",
          message: "Which department does this role fit into?",
          choices: deptChoices
        }
      ])
        .then(res => {
          console.log("Adding a Role...\n");
          db.insertRoleDB(answers, res.deptId)
            .then(
              db.viewAllRolesDB()
              .then(([rows]) => {
                console.table(rows);
                console.log("\n");
              })
              .then(
                () => ask()
              )
            )
        })
    })
}

function insertEmp(answers) {

  db.viewPlainRolesDB()
    .then(([rows]) => {
      let rolesInfo = rows;
      const roleChoice = rolesInfo.map(({ id, title }) => ({
        name: `${title}`,
        value: id
      }));

      inquirer.prompt([
        {
          type: "list",
          name: "roleId",
          message: "What is this employee's role?",
          choices: roleChoice
        }
      ])
        .then(res => {
          const newEmpRole = res.roleId;
          db.viewManagersDB()
            .then(([rows]) => {
              let managersInfo = rows;
              const managerChoice = managersInfo.map(({ id, first_name, last_name }) => ({
                name: `${first_name} ${last_name}`,
                value: id
              }));

              inquirer.prompt([
                {
                  type: "list",
                  name: "managerId",
                  message: "Which manager does this employee fall under?",
                  choices: managerChoice
                }
              ])
                .then(res => {
                  const newManagerId = res.managerId;
                  console.log("Adding an Employee...\n");
                  db.insertEmpDB(answers, newEmpRole, newManagerId)
    
                    .then(
                      db.viewAllEmpsDB()
                      .then(([rows]) => {
                        console.table(rows);
                        console.log("\n");
                      })
                      .then(
                        () => ask()
                      )
                    )
                })
            })
        })
    })
} 

function updateEmployeeRole() {

  db.viewPlainEmpsDB()
    .then(([rows]) => {
      let employeesInfo = rows;
      //console.log('employeesInfo= ',employeesInfo)
      const employeesChoice = employeesInfo.map(({ e_id, e_first_name, e_last_name, title }) => ({
        name: `${e_first_name} ${e_last_name} - ${title}`,
        value: e_id
      }));
      console.log('employeesChoice= ',employeesChoice)
      inquirer.prompt([
        {
          type: "list",
          name: "employeeId",
          message: "Which employee's role are you updating?",
          choices: employeesChoice
        }
      ])
        .then(res => {
          const chosenEmp = res.employeeId;
          console.log("res = ", res)
          console.log("chosenEmp = ", chosenEmp)
          db.viewPlainRolesDB()
          .then(([rows]) => {
            let rolesInfo = rows;
            const roleChoice = rolesInfo.map(({ id, title }) => ({
              name: `${title}`,
              value: id
            }));
      
            inquirer.prompt([
              {
                type: "list",
                name: "roleId",
                message: "What is this employee's new role?",
                choices: roleChoice
              }
            ])
              .then(res => {
                const newEmpRoleId = res.roleId;
                console.log("Updating an Employee's role...\n");
                db.updateEmployeeRoleDB(chosenEmp, newEmpRoleId)
                    .then(
                      db.viewAllEmpsDB()
                      .then(([rows]) => {
                        console.table(rows);
                        console.log("\n");
                      })
                      .then(
                        () => ask()
                      )
                    )
                })
            })
        })
    })
} 

function updateEmployeeManager() {

  db.viewPlainEmpsDB()
    .then(([rows]) => {
      let employeesInfo = rows;
      //console.log('employeesInfo= ',employeesInfo)
      const employeesChoice = employeesInfo.map(({ e_id, e_first_name, e_last_name, m_first_name, m_last_name }) => ({
        name: `${e_first_name} ${e_last_name} - ${m_first_name} ${m_last_name}`,
        value: e_id
      }));
      console.log('employeesChoice= ',employeesChoice)
      inquirer.prompt([
        {
          type: "list",
          name: "employeeId",
          message: "Which employee's manager are you updating?",
          choices: employeesChoice
        }
      ])
        .then(res => {
          const chosenEmp = res.employeeId;
          console.log("res = ", res)
          console.log("chosenEmp = ", chosenEmp)
          db.viewManagersDB()
          .then(([rows]) => {
            let managersInfo = rows;
            const managerChoice = managersInfo.map(({ id, first_name, last_name }) => ({
              name: `${first_name} ${last_name}`,
              value: id
            }));
      
            inquirer.prompt([
              {
                type: "list",
                name: "managerId",
                message: "Who is this employee's new manager?",
                choices: managerChoice
              }
            ])
              .then(res => {
                const newEmpManagerId = res.managerId;
                console.log("Updating an Employee's manager...\n");
                db.updateEmployeeManagerDB(chosenEmp, newEmpManagerId)
                    .then(
                      db.viewAllEmpsDB()
                      .then(([rows]) => {
                        console.table(rows);
                        console.log("\n");
                      })
                      .then(
                        () => ask()
                      )
                    )
                })
            })
        })
    })
} 

function deleteDepartment() {
  db.viewPlainDeptsDB()
    .then(([rows]) => {
      let departments = rows;
      const deptChoices = departments.map(({ id, dept_name }) => ({
        name: `${dept_name}`,
        value: id
      }));

      inquirer.prompt([
        {
          type: "list",
          name: "deptId",
          message: "Which department do you wish to delete?",
          choices: deptChoices
        }
      ])
        .then(res => {
          console.log("Deleting a department...\n");
          db.deleteDepartmentDB(res.deptId)
            .then(
              db.viewAllDeptsDB()
              .then(([rows]) => {
                console.table(rows);
                console.log("\n");
              })
              .then(
                () => ask()
              )
            )
        })
    })
}

function deleteRole() {
  db.viewPlainRolesDB()
    .then(([rows]) => {
      let roles = rows;
      const roleChoices = roles.map(({ id, title }) => ({
        name: `${title}`,
        value: id
      }));

      inquirer.prompt([
        {
          type: "list",
          name: "roleId",
          message: "Which role do you wish to delete?",
          choices: roleChoices
        }
      ])
        .then(res => {
          console.log("Deleting a role...\n");
          db.deleteRoleDB(res.roleId)
            .then(
              db.viewAllRolesDB()
              .then(([rows]) => {
                console.table(rows);
                console.log("\n");
              })
              .then(
                () => ask()
              )
            )
        })
    })
}

function deleteEmployee() {
  db.viewPlainEmpsDB()
    .then(([rows]) => {
      let employeesInfo = rows;
      const employeesChoice = employeesInfo.map(({ e_id, e_first_name, e_last_name, title }) => ({
        name: `${e_first_name} ${e_last_name} - ${title}`,
        value: e_id
      }));
      console.log('employeesChoice= ',employeesChoice)
      inquirer.prompt([
        {
          type: "list",
          name: "employeeId",
          message: "Which employee do you wish to delete?",
          choices: employeesChoice
        }
      ])
        .then(res => {
          console.log("Deleting an employee...\n");
          db.deleteEmployeeDB(res.employeeId)
            .then(
              db.viewAllEmpsDB()
              .then(([rows]) => {
                console.table(rows);
                console.log("\n");
              })
              .then(
                () => ask()
              )
            )
        })
    })
}