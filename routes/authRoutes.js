const express = require('express');
const { register, login } = require('../controllers/authController');
const router = express.Router();

router.route('/login').post(login);
router.route('/adminUserCreate').post(register);

module.exports = router;
