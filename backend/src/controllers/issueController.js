const IssueReportDomain = require('../domain/IssueReport');

// Simulación de base de datos en memoria para el Sprint 2
const issuesList = [];

// SCRUM-30 (HU-21): Reportar falla de equipo + SCRUM-15 (HU-14): Evidencia
const createIssue = async (req, res) => {
  try {
    const { equipmentId, description, evidenceUrl } = req.body;

    IssueReportDomain.validate({ equipmentId, description });

    const newIssue = {
      id: issuesList.length + 1,
      equipmentId: parseInt(equipmentId),
      reportedBy: req.body.reportedBy || 'usuario@pascualbravo.edu.co',
      description,
      evidenceUrl: evidenceUrl || null, // SCRUM-15: Evidencia adjunta
      priority: 'Por definir', // SCRUM-16
      assignedTechnician: null, // SCRUM-16
      estimatedDate: null, // SCRUM-16
      status: 'Reportado', // SCRUM-19
      createdAt: new Date()
    };

    issuesList.push(newIssue);

    return res.status(201).json({
      message: 'Falla reportada exitosamente',
      issue: newIssue
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// SCRUM-14 (HU-05) & SCRUM-31 (HU-22) & SCRUM-18 (HU-10)
const getIssues = async (req, res) => {
  const { userEmail, technician } = req.query;

  let filtered = [...issuesList];

  // SCRUM-31: Consultar estado de MIS solicitudes
  if (userEmail) {
    filtered = filtered.filter(i => i.reportedBy === userEmail);
  }

  // SCRUM-18: Ver únicamente las solicitudes asignadas al técnico
  if (technician) {
    filtered = filtered.filter(i => i.assignedTechnician === technician);
  }

  return res.json({ total: filtered.length, issues: filtered });
};

// SCRUM-16 (HU-06): Asignar prioridad, técnico y fecha estimada
const assignIssue = async (req, res) => {
  try {
    const { issueId } = req.params;
    const { priority, assignedTechnician, estimatedDate } = req.body;

    const issue = issuesList.find(i => i.id === parseInt(issueId));
    if (!issue) return res.status(404).json({ error: 'Reporte no encontrado.' });

    if (priority) issue.priority = priority;
    if (assignedTechnician) issue.assignedTechnician = assignedTechnician;
    if (estimatedDate) issue.estimatedDate = estimatedDate;
    issue.status = 'En Revisión';

    return res.json({ message: 'Asignación actualizada con éxito', issue });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// SCRUM-19 (HU-11): Actualizar estado de la solicitud
const updateIssueStatus = async (req, res) => {
  try {
    const { issueId } = req.params;
    const { status } = req.body;

    const issue = issuesList.find(i => i.id === parseInt(issueId));
    if (!issue) return res.status(404).json({ error: 'Reporte no encontrado.' });

    if (status) issue.status = status;

    return res.json({ message: 'Estado actualizado', issue });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createIssue,
  getIssues,
  assignIssue,
  updateIssueStatus
};