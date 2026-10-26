import React, { useState, useEffect } from 'react';
import { getEquipmentsApi, createIssueApi, getIssuesApi, assignIssueApi, updateIssueStatusApi } from '../services/api';
import { AlertTriangle, FileText, CheckSquare, UserCheck, Eye } from 'lucide-react';

const Issues = ({ user }) => {
  const [equipments, setEquipments] = useState([]);
  const [issues, setIssues] = useState([]);
  const [message, setMessage] = useState('');

  // Formulario de reporte (SCRUM-30 / SCRUM-15)
  const [formData, setFormData] = useState({
    equipmentId: '',
    description: '',
    evidenceUrl: ''
  });

  // Cargar datos al iniciar
  const fetchData = async () => {
    try {
      const eqRes = await getEquipmentsApi();
      setEquipments(eqRes.data.equipments);

      // Filtros dinámicos según el perfil (SCRUM-18 / SCRUM-31)
      let params = {};
      if (user.role === 'solicitante') {
        params.userEmail = user.email; // HU-22: Mis solicitudes
      } else if (user.role === 'tecnico') {
        params.technician = user.fullName; // HU-10: Solo asignadas a mi
      }

      const isRes = await getIssuesApi(params);
      setIssues(isRes.data.issues);
    } catch (err) {
      console.error('Error al cargar datos:', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  // Manejar el reporte de falla (SCRUM-30)
  const handleSubmitReport = async (e) => {
    e.preventDefault();
    try {
      await createIssueApi({
        ...formData,
        reportedBy: user.email
      });
      setMessage('Reporte enviado con éxito.');
      setFormData({ equipmentId: '', description: '', evidenceUrl: '' });
      fetchData();
    } catch (err) {
      setMessage(err.response?.data?.error || 'Error al enviar reporte');
    }
  };

  // Asignar Técnico, Prioridad y Fecha (SCRUM-16 - HU-06)
  const handleAssign = async (issueId) => {
    const priority = prompt('Ingrese prioridad (Baja, Media, Alta, Critica):');
    const assignedTechnician = prompt('Nombre del técnico asignado:');
    const estimatedDate = prompt('Fecha estimada de reparación (YYYY-MM-DD):');

    if (priority && assignedTechnician) {
      try {
        await assignIssueApi(issueId, { priority, assignedTechnician, estimatedDate });
        fetchData();
      } catch (err) {
        alert('Error al asignar caso');
      }
    }
  };

  // Actualizar Estado (SCRUM-19 - HU-11)
  const handleStatusChange = async (issueId, newStatus) => {
    try {
      await updateIssueStatusApi(issueId, { status: newStatus });
      fetchData();
    } catch (err) {
      alert('Error al actualizar estado');
    }
  };

  return (
    <div style={{ padding: '20px', color: '#333' }}>
      {/* SECCIÓN 1: FORMULARIO DE REPORTE (Disponible para Solicitantes) */}
      {user.role === 'solicitante' && (
        <div style={{ marginBottom: '30px', background: '#fff', padding: '15px', borderRadius: '8px', border: '1px solid #ccc' }}>
         <h2 style={{ color: '#222' }}><AlertTriangle style={{ verticalAlign: 'middle', marginRight: '8px' }} /> Reportar Falla de Equipo (HU-21)</h2>
          {message && <p style={{ fontWeight: 'bold' }}>{message}</p>}
          <form onSubmit={handleSubmitReport} style={{ display: 'grid', gap: '10px', maxWidth: '500px' }}>
            <label>Seleccionar Equipo:</label>
            <select
              value={formData.equipmentId}
              onChange={(e) => setFormData({ ...formData, equipmentId: e.target.value })}
              required
              style={{ padding: '8px' }}
            >
              <option value="">-- Seleccione un equipo --</option>
              {equipments.map((eq) => (
                <option key={eq.id} value={eq.id}>
                  {eq.name} ({eq.serialNumber}) - {eq.location}
                </option>
              ))}
            </select>

            <label>Descripción detallada del fallo:</label>
            <textarea
              rows="3"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describa el problema presentado por el equipo..."
              required
              style={{ padding: '8px' }}
            />

            <label>URL de Evidencia / Foto adjunta (HU-14):</label>
            <input
              type="text"
              placeholder="http://ejemplo.com/evidencia.png"
              value={formData.evidenceUrl}
              onChange={(e) => setFormData({ ...formData, evidenceUrl: e.target.value })}
              style={{ padding: '8px' }}
            />

            <button type="submit" style={{ padding: '10px', backgroundColor: '#d9534f', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Enviar Reporte
            </button>
          </form>
        </div>
      )}

      {/* SECCIÓN 2: TABLA DE CASOS Y SOLICITUDES */}
      <h2 style={{ color: '#222' }}><FileText style={{ verticalAlign: 'middle', marginRight: '8px' }} /> Casos de Mantenimiento / Reportes ({issues.length})</h2>
      <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', width: '100%', marginTop: '10px', backgroundColor: '#fff' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th>ID</th>
            <th>Equipo ID</th>
            <th>Reportado Por</th>
            <th>Descripción</th>
            <th>Evidencia (HU-14)</th>
            <th>Prioridad</th>
            <th>Técnico</th>
            <th>Fecha Est.</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {issues.length === 0 ? (
            <tr><td colSpan="10" style={{ textAlign: 'center' }}>No hay reportes registrados.</td></tr>
          ) : (
            issues.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.equipmentId}</td>
                <td>{item.reportedBy}</td>
                <td>{item.description}</td>
                <td>
                  {item.evidenceUrl ? (
                    <a href={item.evidenceUrl} target="_blank" rel="noreferrer">
                      <Eye size={16} /> Ver Foto
                    </a>
                  ) : (
                    'Sin evidencia'
                  )}
                </td>
                <td><strong>{item.priority}</strong></td>
                <td>{item.assignedTechnician || 'Sin Asignar'}</td>
                <td>{item.estimatedDate || 'N/A'}</td>
                <td>{item.status}</td>
                <td>
                  {/* SCRUM-16: Asignar (Soporte/Admin) */}
                  {(user.role === 'administrador' || user.role === 'soporte') && (
                    <button onClick={() => handleAssign(item.id)} style={{ padding: '4px 8px', marginRight: '5px', cursor: 'pointer' }}>
                      <UserCheck size={14} /> Asignar
                    </button>
                  )}

                  {/* SCRUM-19: Cambiar estado */}
                  <select
                    value={item.status}
                    onChange={(e) => handleStatusChange(item.id, e.target.value)}
                    style={{ padding: '4px' }}
                  >
                    <option value="Reportado">Reportado</option>
                    <option value="En Revisión">En Revisión</option>
                    <option value="En Proceso">En Proceso</option>
                    <option value="Resuelto">Resuelto</option>
                  </select>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Issues;