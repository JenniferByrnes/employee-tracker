const inquirer = require('inquirer');
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
        break;
      case 'View all employees':
        console.log("allEmps");
        break;
      case 'Add a department':
        inquirer.prompt(addADeptQuestions).then((answers) => {
          console.log("answers", answers);
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
      }
    })
  };


ask();

function viewAllDepts() {
  console.log("Getting departments...\n");
  // View all items in the department table
  var query = "SELECT id AS ID, dept_name AS Department FROM department";
  fetch('/api/department', {
    method: 'GET'
    },
  );
} 

  connection.query(query, function (err, res) {
      if (!err)
          console.table('Department List: \n', res);
      else
          console.log('Error in the query');
      // Re-prompt the user for what they would like to do
      firstQuestion();
  });
}

const viewAllDepts = () =>
  


