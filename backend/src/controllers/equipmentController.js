const EquipmentDomain = require('../domain/Equipment');

// Lista en memoria simulada para desarrollo
const equipmentsList = [];

// SCRUM-34: Registrar un equipo tecnológico
const createEquipment = async (req, res) => {
  try {
    const { serialNumber, name, brand, model, location, status } = req.body;

    // 1. Validar reglas del dominio
    EquipmentDomain.validate({ serialNumber, name, brand, model, location });

    // 2. Verificar duplicado por número de serie
    const exists = equipmentsList.some(item => item.serialNumber === serialNumber);
    if (exists) {
      return res.status(400).json({ error: 'Ya existe un equipo registrado con ese número de serie.' });
    }

    // 3. Crear el nuevo registro
    const newEquipment = {
      id: equipmentsList.length + 1,
      serialNumber,
      name,
      brand,
      model,
      location,
      status: status || 'disponible', // Estado inicial por defecto
      createdAt: new Date()
    };

    equipmentsList.push(newEquipment);

    return res.status(201).json({
      message: 'Equipo tecnológico registrado exitosamente',
      equipment: newEquipment
    });

  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// SCRUM-10: Visibilidad total / Listar equipos
const getEquipments = async (req, res) => {
  return res.json({
    total: equipmentsList.length,
    equipments: equipmentsList
  });
};

module.exports = {
  createEquipment,
  getEquipments
};