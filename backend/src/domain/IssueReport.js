class IssueReport {
  static validate(data) {
    const { equipmentId, description } = data;

    if (!equipmentId) {
      throw new Error('Debe seleccionar un equipo para reportar la falla.');
    }
    if (!description || description.trim().length < 10) {
      throw new Error('La descripción del fallo debe tener al menos 10 caracteres.');
    }
  }
}

module.exports = IssueReport;