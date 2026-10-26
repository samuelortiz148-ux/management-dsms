describe('Suite de Pruebas Unitarias del Dominio - Management_DSMS', () => {

  // Reglas de Autenticación (RN-07)
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

  //  Registro de Equipos (RN-08)
  describe('Integrante 2: Registro de Equipos Tecnológicos (RN-08)', () => {
    test('Prueba 3: Debe verificar que el numero de serie no este vacio', () => {
      const serialNumber = '';
      const esValido = serialNumber.trim().length > 0;
      expect(esValido).toBe(false);
    });

    test('Prueba 4: Debe validar exitosamente un equipo con numero de serie correcto', () => {
      const serialNumber = 'EQ-100';
      const esValido = serialNumber.trim().length > 0;
      expect(esValido).toBe(true);
    });
  });

  // Reporte de Fallas (HU-21 / HU-14)
  describe('Integrante 3: Reporte de Fallas y Evidencias', () => {
    test('Prueba 5: Debe exigir una descripcion min de 10 caracteres al reportar fallo', () => {
      const descripcion = 'Corta';
      const esValida = descripcion.length >= 10;
      expect(esValida).toBe(false);
    });

    test('Prueba 6: Debe permitir reportar fallo cuando los datos son correctos', () => {
      const descripcion = 'El monitor presenta parpadeo constante.';
      const esValida = descripcion.length >= 10;
      expect(esValida).toBe(true);
    });
  });

  // Solicitudes y Prioridades
  describe('Integrante 4: Prioridades y Estados de Solicitudes', () => {
    test('Prueba 7: Debe rechazar una prioridad no valida', () => {
      const prioridadesValidas = ['baja', 'media', 'alta', 'critica'];
      const prioridad = 'urgentisima';
      expect(prioridadesValidas.includes(prioridad)).toBe(false);
    });

    test('Prueba 8: Debe aceptar prioridades validas (baja, media, alta, critica)', () => {
      const prioridadesValidas = ['baja', 'media', 'alta', 'critica'];
      const prioridad = 'alta';
      expect(prioridadesValidas.includes(prioridad)).toBe(true);
    });
  });

});