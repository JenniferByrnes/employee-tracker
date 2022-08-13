DROP TABLE IF EXISTS employee;
DROP TABLE IF EXISTS emp_role;
DROP TABLE IF EXISTS department;

CREATE TABLE department (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  dept_name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE emp_role (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL (8.2),
  department_id INT NOT NULL,
    CONSTRAINT fk_department_id FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE RESTRICT
);

CREATE TABLE employee (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INTEGER NOT NULL,
  manager_id INTEGER DEFAULT NULL,
  CONSTRAINT fk_role_id FOREIGN KEY (role_id)
  REFERENCES emp_role(id),
  KEY manager_id (manager_id),
  CONSTRAINT fk_manager_id FOREIGN KEY (manager_id)
  REFERENCES employee (id) ON DELETE SET NULL
);