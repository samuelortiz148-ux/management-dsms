describe('Suite de Pruebas Unitarias del Dominio - Management_DSMS', () => {

  // ==========================================
  // REGISTRADO POR: SAMUEL ORTIZ (RN-07)
  // ==========================================
  describe('Validaciones de Correo Institucional (RN-07) - Samuel Ortiz', () => {
    test('Prueba 1: Debe rechazar un correo no institucional (@gmail.com)', () => {
      const emailInvalido = 'estudiante@gmail.com';
      const esValido = emailInvalido.endsWith('@pascualbravo.edu.co');
      expect(esValido).toBe(false);
    });

    test('Prueba 2: Debe aceptar un correo institucional valido (@pascualbravo.edu.co)', () => {
      const emailValido = 'usuario@pascualbravo.edu.co';
      const esValido = emailValido.endsWith('@pascualbravo.edu.co');
      expect(esValido).toBe(true);
    });
  });

  // ==========================================
  // ESPACIO PARA: SALOMÉ (RN-01)
  // Pegar aquí tus 2 pruebas dentro del describe
  // ==========================================
  describe('Validación de Registro de Equipos (RN-01) - Salomé', () => {
    
  });

  // ==========================================
  // ESPACIO PARA: DANIEL (RN-03)
  // Pegar aquí tus 2 pruebas dentro del describe
  // ==========================================
  describe('Validación de Reportes de Fallas (RN-03) - Daniel', () => {
    
  });

  // ==========================================
  // ESPACIO PARA: MANUELA (RN-05)
  // Pegar aquí tus 2 pruebas dentro del describe
  // ==========================================
  describe('Permisos de Administrador de Roles (RN-05) - Manuela', () => {
    
  });

});