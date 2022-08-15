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
      m.first_name AS "Mgr First Name",
      m.last_name AS "Mgr Last Name"
      FROM employee e
      LEFT JOIN emp_role
      ON e.role_id = emp_role.id
      LEFT JOIN department
      ON emp_role.department_id = department.id
      LEFT JOIN employee m ON m.id = e.manager_id
      ;`)
  };

  viewAllEmpsByMgrDB = () => {
    return this.db.promise().query(
      `SELECT 
      m.first_name AS "Mgr First Name",
      m.last_name AS "Mgr Last Name",
      dept_name AS Department, 
      e.id AS ID, 
      e.first_name AS "First Name", 
      e.last_name AS "Last Name", 
      emp_role.title AS "Job Title", 
      salary AS Salary
      FROM employee e
      LEFT JOIN emp_role
      ON e.role_id = emp_role.id
      LEFT JOIN department
      ON emp_role.department_id = department.id
      LEFT JOIN employee m ON m.id = e.manager_id
      ORDER BY m.last_name
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
      m.first_name AS m_first_name,
      m.last_name AS m_last_name,
      e.manager_id AS manager_id
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

  viewDeptSumDB = () => {
    return this.db.promise().query(
      `SELECT dept_name AS Department,SUM(salary) AS "Salary Total" FROM employee
      LEFT JOIN emp_role ON employee.role_id = emp_role.id
      LEFT JOIN department ON department_id = department.id
      GROUP BY dept_name ORDER BY dept_name;`)
  };

  insertDeptDB = (answers) => {
    console.log(answers);
    try{return this.db.promise().query(`INSERT INTO department (dept_name) VALUES ("${answers.newDeptName}");`)
    } catch{console.log("failure")}
  };

  insertRoleDB = (answers, deptId) => {
    return this.db.promise().query(`INSERT INTO emp_role (title, salary, department_id) VALUES ("${answers.newRoleName}", "${answers.newRoleSalary}", "${deptId}");`)
  };

  insertEmpDB = (answers, roleId, managerId) => {
    return this.db.promise().query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${answers.newEmpFirstName}", "${answers.newEmpLastName}", "${roleId}", "${managerId}");`)
  };

  updateEmployeeRoleDB = (employeeId, roleId) => {
    return this.db.promise().query(`UPDATE employee SET role_id = ${roleId} WHERE id = ${employeeId};`)
  };

  updateEmployeeManagerDB = (employeeId, managerId) => {
    return this.db.promise().query(`UPDATE employee SET manager_id = ${managerId} WHERE id = ${employeeId};`)
  };

  deleteDepartmentDB = (deptId) => {
    return this.db.promise().query(`DELETE FROM department WHERE id = ${deptId};`)
  };

  deleteRoleDB = (roleId) => {
    return this.db.promise().query(`DELETE FROM emp_role WHERE id = ${roleId};`)
      .catch(err => {
      console.log(err);ext
    })
  };

  deleteEmployeeDB = (employeeId) => {
    return this.db.promise().query(`DELETE FROM employee WHERE id = ${employeeId};`)
  };
};

module.exports = new LogicSQL(db);