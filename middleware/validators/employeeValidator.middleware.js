const { body } = require('express-validator');

exports.createEmployeeSchema = [
    body('name')
        .exists()
        .withMessage('Name is required')
        .isLength({ min: 3 })
        .withMessage('Must be at least 3 chars long'),
    body('email')
        .exists()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Must be a valid email')
        .normalizeEmail(),
    body('mobile')
        .optional()
        .isNumeric()
        .withMessage('Must be a number'),
    body('birth_date')
        .exists()
        .isDate()
        .withMessage('Must be a date'),
    body('alamat.*')
        .notEmpty()
        .withMessage('Alamat is required')
];
exports.updateEmployeeSchema = [
    body('name')
        .exists()
        .withMessage('Name is required')
        .isLength({ min: 3 })
        .withMessage('Must be at least 3 chars long'),
    body('email')
        .exists()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Must be a valid email')
        .normalizeEmail(),
    body('mobile')
        .optional()
        .isNumeric()
        .withMessage('Must be a number'),
    body('birth_date')
        .exists()
        .isDate()
        .withMessage('Must be a date'),
    body('alamat.*')
        .notEmpty()
        .withMessage('Alamat is required'),
    body()
        .custom(value => {
            return !!Object.keys(value).length;
        })
        .withMessage('Please provide required field to update')
        .custom(value => {
            const updates = Object.keys(value);
            const allowUpdates = ['name', 'email', 'mobile', 'birth_date', 'alamat[]'];
            return updates.every(update => allowUpdates.includes(update));
        })
        .withMessage('Invalid updates!')
];
