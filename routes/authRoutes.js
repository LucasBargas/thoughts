const express = require('express');

const router = express.Router();

const AuthController = require('../controllers/AuthController');

router.get('/entrar', AuthController.login);
router.get('/registrar', AuthController.register);

module.exports = router;
