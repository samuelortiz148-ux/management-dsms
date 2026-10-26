class Equipment {
  // Validar campos obligatorios al registrar un equipo
  static validate(data) {
    const { serialNumber, name, brand, model, location } = data;

    if (!serialNumber || !name || !brand || !model || !location) {
      throw new Error('Todos los campos son obligatorios: serialNumber, name, brand, model y location.');
    }
  }
}

module.exports = Equipment;