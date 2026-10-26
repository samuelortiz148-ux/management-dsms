const jwt = require('jsonwebtoken');
const UserDomain = require('../domain/User');

const loginMock = async (req, res) => {
  try {
    const { email, fullName, documentNumber, role } = req.body;

    // Regla RN-07: Validar correo institucional (@pascualbravo.edu.co)
    if (!UserDomain.isPascualBravoEmail(email)) {
      return res.status(400).json({
        error: 'Acceso denegado: Debe ingresar con un correo institucional de Pascual Bravo (@pascualbravo.edu.co).'
      });
    }

    const user = {
      id: 1,
      fullName: fullName || 'Usuario Institucional',
      email: email,
      documentNumber: documentNumber || '1234567890',
      role: role || 'solicitante'
    };

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'secreto_desarrollo_dsms',
      { expiresIn: '8h' }
    );

    return res.json({
      message: 'Autenticación exitosa',
      token,
      user
    });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  loginMock
};