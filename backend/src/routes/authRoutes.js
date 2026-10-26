const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Ruta POST para el inicio de sesión
router.post('/login', authController.loginMock);

module.exports = router;