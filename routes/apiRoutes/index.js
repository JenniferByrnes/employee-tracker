const express = require('express');
const router = express.Router();

router.use(require('./employeeRoutes'));
router.use(require('./empRoleRoutes'));
router.use(require('./departmentRoutes'));

module.exports = router;