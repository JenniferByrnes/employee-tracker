INSERT INTO department (id, dept_name)
VALUES
  (1, 'Office'),
  (2, 'General Practice'),
  (3, 'Radiology');

INSERT INTO emp_role (title, salary, department_id, id)
VALUES
  ('Doctor', '150000', 1, 1),
  ('Nurse', '70000', 1, 2),
  ('Shift Supervisor', '200000', 1, 3),
  ('LPN', '40000', 2, 4),
  ('Radiologist', '180000', 2, 5),
  ('Radiology Tech', '50000', 3, 6),
  ('Purchasing', '100000', 3, 7),
  ('Manager', '270000', 3, 8),
  ('Bookkeeping', '30000', 3, 9);

  INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES
  (1, 'James', 'Fraser', 1, NULL),
  (2, 'Jack', 'London', 2, 1),
  (3, 'Robert', 'Bruce', 3, NULL),
  (4, 'Peter', 'Greenaway', 1,3),
  (5, 'Derek', 'Jarman', 2,3),
  (6, 'Paolo', 'Pasolini', 2,3),
  (7, 'Heathcote', 'Williams', 2,3),
  (8, 'Sandy', 'Powell', 2,3),
  (9, 'Emil', 'Zola', 2, 1),
  (10, 'Sissy', 'Coalpits', 4,1),
  (17, 'John', 'Dryden',  5, NULL),
  (18, 'Alexander', 'Pope', 6,17),
  (22, 'William', 'Morris', 7,17),
  (23, 'George', 'Shaw',  8, NULL),
  (24, 'Arnold', 'Bennett', 9,23),
  (25, 'Algernon', 'Blackwood', 6,17),
  (26, 'Rhoda', 'Broughton', 9,23),
  (27, 'Hart', 'Crane', 9,23),
  (28, 'Vitorio', 'DeSica', 9,23),
  (42, 'William', 'Bedford', 4,1),
  (50, 'Gerald', 'Griffin', 4,17);