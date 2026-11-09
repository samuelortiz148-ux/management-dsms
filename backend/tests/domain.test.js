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

    test('Prueba 1: Debe rechazar un reporte con descripción vacía', () => {
  const reporteInvalido = { description: '' };
  const esValido = Boolean(reporteInvalido.description && reporteInvalido.description.trim().length > 0);
  expect(esValido).toBe(false);
});

test('Prueba 2: Debe aceptar un reporte de falla bien detallado', () => {
  const reporteValido = { description: 'El monitor del aula 201 no enciende' };
  const esValido = Boolean(reporteValido.description && reporteValido.description.trim().length > 0);
  expect(esValido).toBe(true);
});
    
  });

  
 // ==========================================
// ESPACIO PARA: MANUELA (RN-05)
// ==========================================
describe('Permisos de Administrador de Roles (RN-05) - Manuela', () => {

  test('Prueba 1: Debe denegar acceso al módulo de usuarios a un rol común', () => {
    const usuario = { role: 'tecnico' };
    const tieneAcceso = usuario.role === 'administrador';
    expect(tieneAcceso).toBe(false);
  });

  test('Prueba 2: Debe otorgar acceso al módulo de usuarios al Administrador', () => {
    const usuario = { role: 'administrador' };
    const tieneAcceso = usuario.role === 'administrador';
    expect(tieneAcceso).toBe(true);
  });

});

});
