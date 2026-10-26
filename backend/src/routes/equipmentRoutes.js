const express = require('express');
const router = express.Router();
const equipmentController = require('../controllers/equipmentController');

// Rutas para equipos
router.post('/', equipmentController.createEquipment);
router.get('/', equipmentController.getEquipments);

module.exports = router;