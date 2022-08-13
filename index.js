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
    {
      type: 'input',
      name: 'newRoleDept',
      message: 'Into which department should this role be added?',
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
    {
      type: 'input',
      name: 'newEmpRole',
      message: "What is this employee's role?",
    },
    {
      type: 'input',
      name: 'newRoleDept',
      message: 'Into which department should this employee be added?',
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

    //promptTask = JSON.stringify(answers.task, null, 2);
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
        })
        break;
      case 'Add an employee':
        inquirer.prompt(addAnEmpQuestions).then((answers) => {
          console.log("answers", answers);
        })
        break;
      case 'Update an employee role':
        inquirer.prompt(updtAnEmpQuestions).then((answers) => {
          console.log("answers", answers);
        })
        break;
      default:
        console.log("Exiting because of ", promptTask);
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
} 

function viewAllRoles() {
  console.log("Getting employee roles...\n");
  db.viewAllRolesDB()
  .then(([rows]) => {
    console.table(rows)
  })
  .then(
    () => ask()
  )
} 

function viewAllEmps() {
  console.log("Getting employees...\n");
  db.viewAllEmpsDB()
  .then(([rows]) => {
    console.table(rows)
  })
  .then(
    () => ask()
  )
} 

;

function insertDept(answers) {
  console.log("Adding a Dept...\n");
  console.log(answers);
  db.insertDeptDB(answers)
  .then((status) => {
    console.log("status = ", status[0].affectedRows)
    if (status[0].affectedRows ===1) {
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