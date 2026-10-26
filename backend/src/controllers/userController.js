const usersList = [
  { id: 1, email: 'admin@pascualbravo.edu.co', fullName: 'Carlos Admin', role: 'administrador' },
  { id: 2, email: 'juan.perez@pascualbravo.edu.co', fullName: 'Juan Perez', role: 'solicitante' },
  { id: 3, email: 'tecnico@pascualbravo.edu.co', fullName: 'Laura Técnico', role: 'tecnico' }
];

const getUsers = async (req, res) => {
  return res.json({ users: usersList });
};

const updateUserRole = async (req, res) => {
  try {
    const { userId } = req.params;
    const { newRole } = req.body;

    const validRoles = ['solicitante', 'tecnico', 'administrador'];
    if (!validRoles.includes(newRole)) {
      return res.status(400).json({ error: 'Rol no válido.' });
    }

    const user = usersList.find(u => u.id === parseInt(userId));
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }

    user.role = newRole;
    return res.json({ message: 'Rol actualizado exitosamente', user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { getUsers, updateUserRole };