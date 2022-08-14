const inquirer = require('inquirer');
const db = require('./db/');
//const employeelogic = require('./routes/apiRoutes');

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
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Exit'
      ],
  },
]

const addADeptQuestions = [
  {
    type: 'input',
    name: 'newDeptName',
    message: 'What is the name of the department to be added?',
  },
]

const addARoleQuestions = [
  {
    type: 'input',
    name: 'newRoleName',
    message: 'What is the name of the role to be added?',
  },
  {
    type: 'input',
    name: 'newRoleSalary',
    message: 'What is the salary for this role?',
  },
]

const addAnEmpQuestions = [
  {
    type: 'input',
    name: 'newEmpFirstName',
    message: 'What is the first name of the employee to be added?',
  },
  {
    type: 'input',
    name: 'newEmpLastName',
    message: 'What is the last name of the employee to be added?',
  },
]

const updtAnEmpQuestions = [
  {
    type: 'input',
    name: 'udptEmpRole',
    message: "What is this employee's new role?",
  },
]

function ask() {
  inquirer.prompt(firstQuestion).then((answers) => {

    promptTask = answers.task;
    console.log("promptTask=", promptTask);

    switch (promptTask) {
      case 'View all departments':
        console.log("allDepts");
        viewAllDepts();
        break;
      case 'View all roles':
        console.log("allRoles");
        viewAllRoles();
        break;
      case 'View all employees':
        console.log("allEmps");
        viewAllEmps();
        break;
      case 'Add a department':
        inquirer.prompt(addADeptQuestions).then((answers) => {
          console.log("answers", answers);
          insertDept(answers);
        })
        break;
      case 'Add a role':
        inquirer.prompt(addARoleQuestions).then((answers) => {
          console.log("answers", answers);
          insertRole(answers);
        })
        break;
      case 'Add an employee':
        inquirer.prompt(addAnEmpQuestions).then((answers) => {
          console.log("answers", answers);
          insertEmp(answers);
        })
        break;
      case 'Update an employee role':
        inquirer.prompt(updtAnEmpQuestions).then((answers) => {
          console.log("answers", answers);
        })
        break;
      default:
        console.log("Exiting because of ", promptTask);
        //inquirer.prompt.ui.close();
        process.exit(1);
        break;
    }
  })
};

ask();

function viewAllDepts() {
  console.log("Getting departments...\n");
  db.viewAllDeptsDB()
    .then(([rows]) => {
      console.table(rows)
    })
    .then(
      () => ask()
    )
};

function viewAllRoles() {
  console.log("Getting employee roles...\n");
  db.viewAllRolesDB()
    .then(([rows]) => {
      console.table(rows)
    })
    .then(
      () => ask()
    )
};

function viewAllEmps() {
  console.log("Getting employees...\n");
  db.viewAllEmpsDB()
    .then(([rows]) => {
      console.table(rows)
    })
    .then(
      () => ask()
    )
};

function insertDept(answers) {
  console.log("Adding a Dept...\n");
  console.log(answers);
  db.insertDeptDB(answers)
    .then((status) => {
      console.log("status = ", status[0].affectedRows)
      if (status[0].affectedRows === 1) {
        console.log("row was added");
      }
      else {
        console.log("row was not added, bummer");
      }
    })
    .then(
      () => ask()
    )
}

function insertRole(answers) {
  console.log("Adding a Role...\n");
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
          console.log("res = ", res)
          db.insertRoleDB(answers, res.deptId)
            .then((status) => {
              console.log("status = ", status[0].affectedRows)
              if (status[0].affectedRows === 1) {
                console.log("row was added");
              }
              else {
                console.log("row was not added, bummer");
              }
            })
            .then(
              () => ask()
            )
        })
    })
}

function insertEmp(answers) {
  console.log("Adding an Employee...\n");
  console.log(answers);
  db.viewPlainRolesDB()
    .then(([rows]) => {
      let rolesInfo = rows;
      console.log("rolesInfo=", rolesInfo)
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
          console.log("res = ", res)
          console.log("newEmpRole = ", newEmpRole)
          db.viewManagersDB()
            .then(([rows]) => {
              let managersInfo = rows;
              console.log("managersInfo=", managersInfo)
              const managerChoice = managersInfo.map(({ id, first_name, last_name }) => ({
                name: `${first_name} ${last_name}`,
                value: id
              }));

              inquirer.prompt([
                {
                  type: "list",
                  name: "managerId",
                  message: "Which manager does this employ fall under?",
                  choices: managerChoice
                }
              ])
                .then(res => {
                  const newManagerId = res.managerId;
                  db.insertEmpDB(answers, newEmpRole, newManagerId)
                    .then((status) => {
                      console.log("status = ", status[0].affectedRows)
                      if (status[0].affectedRows === 1) {
                        console.log("row was added");
                      }
                      else {
                        console.log("row was not added, bummer");
                      }
                    })
                    .then(
                      () => ask()
                    )
                })
            })
        })
    })
} 