import React, { useState, useEffect } from 'react';
import { getUsersApi, updateUserRoleApi } from '../services/api';
import { ShieldCheck } from 'lucide-react';

const UsersAdmin = () => {
  const [users, setUsers] = useState([]);
  const [msg, setMsg] = useState('');

  const fetchUsers = async () => {
    try {
      const res = await getUsersApi();
      setUsers(res.data.users);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    try {
      await updateUserRoleApi(userId, newRole);
      setMsg('Rol actualizado con éxito.');
      fetchUsers();
    } catch (err) {
      setMsg('Error al actualizar el rol.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ color: 'var(--text-dark)' }}>
        <ShieldCheck style={{ verticalAlign: 'middle', marginRight: '8px' }} />
        Administración de Usuarios y Roles (HU-23)
      </h2>
      {msg && <p style={{ color: 'var(--success-green)', fontWeight: 'bold' }}>{msg}</p>}

      <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', width: '100%', backgroundColor: '#fff', marginTop: '15px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th>ID</th>
            <th>Nombre Completo</th>
            <th>Correo Institucional</th>
            <th>Rol Actual</th>
            <th>Cambiar Rol</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.fullName}</td>
              <td>{u.email}</td>
              <td><strong>{u.role}</strong></td>
              <td>
                <select
                  value={u.role}
                  onChange={(e) => handleRoleChange(u.id, e.target.value)}
                  style={{ padding: '4px' }}
                >
                  <option value="solicitante">solicitante</option>
                  <option value="tecnico">tecnico</option>
                  <option value="administrador">administrador</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersAdmin;