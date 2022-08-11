const inquirer = require('inquirer');

var promptTask = 'temp';

const firstQuestions = [
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
        'Update an employee role'
      ],
    },
  ]

const nextQuestions = [
    {
      type: 'input',
      name: 'newDeptName',
      message: 'What is the name of the department to be added?',
      when: (promptTask === "Add a role")
    },

    {
      type: 'input',
      name: 'newRoleName',
      message: 'What is the name of the role to be added?',
      when: (promptTask === "Add a role")
    },
    {
      type: 'input',
      name: 'newRoleSalary',
      message: 'What is the salary for this role?',
      when: (promptTask === "Add a role")
    },
    {
      type: 'input',
      name: 'newRoleDept',
      message: 'Into which department should this role be added?',
      when: (promptTask === "Add a role")
    },
    {
      type: 'input',
      name: 'newEmpFirstName',
      message: 'What is the first name of the employee to be added?',
      when: (promptTask === "Add an employee")
    },
    {
      type: 'input',
      name: 'newEmpLastName',
      message: 'What is the last name of the employee to be added?',
      when: (promptTask === "Add an employee")
    },
    {
      type: 'input',
      name: 'newEmpRole',
      message: "What is this employee's role?",
      when: (promptTask === "Add an employee")
    },
    {
      type: 'input',
      name: 'newRoleDept',
      message: 'Into which department should this employee be added?',
      when: (promptTask === "Add an employee")
    },
    {
      type: 'input',
      name: 'udptEmpRole',
      message: "What is this employee's new role?",
      when: (promptTask === "Update an employee")
    },
    {
      type: 'input',
      name: 'trash',
      message: "Did this work?  ---" + promptTask + "---",
    },
]

 

function ask() {
  inquirer.prompt(firstQuestions).then((answers) => {

    //promptTask = JSON.stringify(answers.task, null, 2);
    promptTask = answers.task;
    console.log("promptTask=", promptTask);
  
    switch (promptTask) {
      case 'View all departments':
        console.log("allDepts");
        break;
      case 'View all roles':
        console.log("allRoles");
        break;
      case 'View all employees':
        console.log("allEmps");
        break;
      case 'View all roles':
        console.log("allDepts");
        break;
      default:
        console.log("2nd round...", promptTask);
        inquirer.prompt(nextQuestions).then((answers) => {
          console.log("answers", answers);
        })
      }
    })
  };


ask();




