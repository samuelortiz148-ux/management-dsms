describe('Suite de Pruebas Unitarias del Dominio - Management_DSMS', () => {

  // Reglas de Autenticación (RN-07) - Samuel 
  describe('Integrante 1: Validaciones de Correo Institucional (RN-07)', () => {
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

});