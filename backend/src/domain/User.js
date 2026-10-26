class User {
  // Regla RN-07: Validar que el correo sea exclusivamente institucional de Pascual Bravo[cite: 23, 28]
  static isPascualBravoEmail(email) {
    if (!email) return false;
    return email.toLowerCase().endsWith('@pascualbravo.edu.co');
  }

  // Regla RN-08: Validar datos obligatorios[cite: 23, 28]
  static validateRegistration(data) {
    const { email, fullName, documentNumber } = data;
    if (!email || !fullName || !documentNumber) {
      throw new Error('El correo, nombre completo y documento son obligatorios.');
    }
  }
}

module.exports = User;