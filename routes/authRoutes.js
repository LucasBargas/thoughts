const express = require('express');

const router = express.Router();

const AuthController = require('../controllers/AuthController');

router.get('/entrar', AuthController.login);
router.post('/entrar', AuthController.loginPost);
router.get('/registrar', AuthController.register);
router.post('/registrar', AuthController.registerPost);
router.get('/sair', AuthController.logout);

module.exports = router;
