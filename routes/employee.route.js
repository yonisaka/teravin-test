var express = require('express');
var router = express.Router();
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');
const EmployeeController = require('../controllers/employee.controller')
const { createEmployeeSchema, updateEmployeeSchema } = require('../middleware/validators/employeeValidator.middleware');

router.get('/', awaitHandlerFactory(EmployeeController.index))
router.get('/datatable', awaitHandlerFactory(EmployeeController.datatable))
router.post('/', createEmployeeSchema, awaitHandlerFactory(EmployeeController.create))
router.get('/id/:id', awaitHandlerFactory(EmployeeController.getById));
router.patch('/id/:id', updateEmployeeSchema, awaitHandlerFactory(EmployeeController.update));
router.delete('/id/:id', awaitHandlerFactory(EmployeeController.delete));

module.exports = router;
