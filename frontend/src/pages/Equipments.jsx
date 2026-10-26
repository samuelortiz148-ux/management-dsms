import React, { useState, useEffect } from 'react';
import { getEquipmentsApi, createEquipmentApi } from '../services/api';
import { Monitor, List } from 'lucide-react';

const Equipments = () => {
  const [equipments, setEquipments] = useState([]);
  const [formData, setFormData] = useState({ serialNumber: '', name: '', brand: '', model: '', location: '' });
  const [message, setMessage] = useState('');

  const fetchEquipments = async () => {
    try {
      const res = await getEquipmentsApi();
      setEquipments(res.data.equipments);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEquipments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createEquipmentApi(formData);
      setMessage('Equipo registrado exitosamente');
      setFormData({ serialNumber: '', name: '', brand: '', model: '', location: '' });
      fetchEquipments();
    } catch (err) {
      setMessage(err.response?.data?.error || 'Error al registrar equipo');
    }
  };

  return (
    <div style={{ padding: '20px', color: '#333' }}>
      <h2><Monitor style={{ verticalAlign: 'middle', marginRight: '8px' }} /> Registrar Equipo Tecnológico</h2>
      {message && <p style={{ fontWeight: 'bold' }}>{message}</p>}
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px', display: 'grid', gap: '10px', maxWidth: '400px' }}>
        <input type="text" placeholder="Serie (serialNumber)" value={formData.serialNumber} onChange={(e) => setFormData({...formData, serialNumber: e.target.value})} required style={{ padding: '8px' }} />
        <input type="text" placeholder="Nombre (ej: Laptop Dell)" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required style={{ padding: '8px' }} />
        <input type="text" placeholder="Marca" value={formData.brand} onChange={(e) => setFormData({...formData, brand: e.target.value})} required style={{ padding: '8px' }} />
        <input type="text" placeholder="Modelo" value={formData.model} onChange={(e) => setFormData({...formData, model: e.target.value})} required style={{ padding: '8px' }} />
        <input type="text" placeholder="Ubicación (ej: Bloque 2 - Lab 101)" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} required style={{ padding: '8px' }} />
        <button type="submit" style={{ padding: '10px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Guardar Equipo</button>
      </form>

      <h2><List style={{ verticalAlign: 'middle', marginRight: '8px' }} /> Equipos Registrados ({equipments.length})</h2>
      <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', width: '100%', marginTop: '10px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th>ID</th>
            <th>Serie</th>
            <th>Nombre</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Ubicación</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {equipments.map((eq) => (
            <tr key={eq.id}>
              <td>{eq.id}</td>
              <td>{eq.serialNumber}</td>
              <td>{eq.name}</td>
              <td>{eq.brand}</td>
              <td>{eq.model}</td>
              <td>{eq.location}</td>
              <td>{eq.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Equipments;