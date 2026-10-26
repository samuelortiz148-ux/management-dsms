const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const equipmentRoutes = require('./routes/equipmentRoutes');
const userRoutes = require('./routes/userRoutes');
const issueRoutes = require('./routes/issueRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/equipments', equipmentRoutes);
app.use('/api/users', userRoutes);
app.use('/api/issues', issueRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Servidor Management_DSMS listo para Sprint 2' });
});

module.exports = app;