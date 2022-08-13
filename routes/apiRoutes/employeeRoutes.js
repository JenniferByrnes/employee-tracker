const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

// Get all employees
router.get('/employee', (req, res) => {
  const sql = `SELECT 
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
  ;`;

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
});

// GET a single employee
router.get('/employee/:id', (req, res) => {
  const sql = `SELECT 
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
  WHERE e.employee.id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: row
    })
  });
});

// Create an employee
router.post('/employee', ({ body }, res) => {

  const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)  VALUES (?,?,?,?)`;
  const params = [body.first_name, body.last_name, body.role_id, body.manager_id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: body
    });
  });
});

// Update a employee's role
router.put('/api/employee/:id', (req, res) => {
  const sql = `UPDATE employee SET role = ? 
               WHERE id = ?`;
  const params = [req.body.role_id, req.params.id];
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      // check if a record was found
    } else if (!result.affectedRows) {
      res.json({
        message: 'Employee not found'
      });
    } else {
      res.json({
        message: 'success',
        data: req.body,
        changes: result.affectedRows
      });
    }
  });
});

// Delete an employee
router.delete('/employee/:id', (req, res) => {
  const sql = `DELETE FROM employee WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.statusMessage(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({
        message: 'Employee not found'
      });
    } else {
      res.json({
        message: 'deleted',
        changes: result.affectedRows,
        id: req.params.id
      });
    }
  });
});
module.exports = router;