const db = require('./connection');

class LogicSQL {
  constructor(db) {
    this.db = db;
  }
  viewAllDeptsDB = () => {
    return this.db.promise().query(`SELECT dept_name AS "Department Name",
     id AS 'Department ID'
    FROM department ORDER BY dept_name;`)
  };
  viewPlainDeptsDB = () => {
    return this.db.promise().query(`SELECT id, dept_name
    FROM department ORDER BY dept_name;`)
  };
  viewAllRolesDB = () => {
    return this.db.promise().query(`SELECT title AS "Job Title", 
    emp_role.id AS "Role ID", 
    dept_name AS "Department Name", 
    salary AS "Salary" FROM emp_role 
    LEFT JOIN department
    ON emp_role.department_id = department.id
    ORDER BY title`)
  };
  viewPlainRolesDB = () => {
    return this.db.promise().query(
      `SELECT title, 
      emp_role.id, 
      dept_name, 
      salary
      FROM emp_role 
      LEFT JOIN department
      ON emp_role.department_id = department.id
      ORDER BY title`)
  };
  viewAllEmpsDB = () => {
    return this.db.promise().query(
      `SELECT 
      e.id AS ID, 
      e.first_name AS "First Name", 
      e.last_name AS "Last Name", 
      emp_role.title AS "Job Title", 
      dept_name AS Department, 
      salary AS Salary, 
      m.last_name AS manager_name
      FROM employee e
      LEFT JOIN emp_role
      ON e.role_id = emp_role.id
      LEFT JOIN department
      ON emp_role.department_id = department.id
      LEFT JOIN employee m ON m.id = e.manager_id
      ;`)
  };
  viewPlainEmpsDB = () => {
    return this.db.promise().query(
      `SELECT 
      e.id AS e_id, 
      e.first_name AS e_first_name, 
      e.last_name AS e_last_name, 
      emp_role.title, 
      dept_name, 
      salary, 
      m.last_name AS m_last_name
      FROM employee e
      LEFT JOIN emp_role
      ON e.role_id = emp_role.id
      LEFT JOIN department
      ON emp_role.department_id = department.id
      LEFT JOIN employee m ON m.id = e.manager_id
      ;`)
  };
  viewManagersDB = () => {
    return this.db.promise().query(
      `SELECT 
      e.id, 
      first_name, 
      last_name, 
      title, 
      salary
      FROM employee e
      LEFT JOIN emp_role
      ON e.role_id = emp_role.id
      WHERE manager_id IS NULL
      ;`)
  };
  insertDeptDB = (answers) => {
    console.log(answers);
    return this.db.promise().query(`INSERT INTO department (dept_name) VALUES ("${answers.newDeptName}");`)
    /* Another nice try
    .then(
      () => ask()
      )
      */
    /* Nice try - need some error handling here  - duplicate deptname
      .then((status) => {
        console.log("status = ", status[0].affectedRows)
        if (status[0].affectedRows ===1) {
          console.log("row was added");
        }
        else {
          console.log("row was not added, bummer");
        }
      })
      */
  };

  insertRoleDB = (answers, deptId) => {
    console.log(answers);
    return this.db.promise().query(`INSERT INTO emp_role (title, salary, department_id) VALUES ("${answers.newRoleName}", "${answers.newRoleSalary}", "${deptId}");`)
  };

  insertEmpDB = (answers, roleId, managerId) => {
    console.log("answers = " , answers);
    return this.db.promise().query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${answers.newEmpFirstName}", "${answers.newEmpLastName}", "${roleId}", "${managerId}");`)
  };

  updateEmployeeRoleDB = (employeeId, roleId) => {
    return this.db.promise().query(`UPDATE employee SET role_id = ${roleId} WHERE id = ${employeeId};`)
  };
};



module.exports = new LogicSQL(db);