const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

router.get('/emp_role', (req, res) => {
  const sql = `SELECT title AS "Job Title", 
  emp_role.id AS "Role ID", 
  dept_name AS "Department Name", 
  salary AS "Salary" FROM emp_role 
  LEFT JOIN department
  ON emp_role.department_id = department.id
  ORDER BY title`;
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

router.get('/emp_role/:id', (req, res) => {
  const sql = `SELECT title AS "Job Title", 
  emp_role.id AS "Role ID", 
  dept_name AS "Department Name", 
  salary AS "Salary" FROM emp_role 
  LEFT JOIN department
  ON emp_role.department_id = department.id 
  WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: row
    });
  });
});

router.post('/emp_role', ({ body }, res) => {

  const sql = `INSERT INTO emp_role (title, salary, department_id) VALUES (?,?,?)`;
  const params = [body.title, body.salary, body.department_id];

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

router.delete('/emp_role/:id', (req, res) => {
  const sql = `DELETE FROM emp_role WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, req.params.id, (err, result) => {
    if (err) {
      res.status(400).json({ error: res.message });
      // checks if anything was deleted
    } else if (!result.affectedRows) {
      res.json({
        message: 'Role not found'
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