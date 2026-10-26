import React, { useState } from 'react';
import Login from './pages/Login';
import Equipments from './pages/Equipments';
import Issues from './pages/Issues';
import UsersAdmin from './pages/UsersAdmin';

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  const [currentTab, setCurrentTab] = useState('equipments');

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
  };

  // Condición maestra para saber si el usuario tiene acceso a la administración
  const isAdmin = user && (user.role === 'administrador' || user.email === 'samuel.ortiz@pascualbravo.edu.co');

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: 'var(--bg-light)', minHeight: '100vh' }}>
      <header style={{ padding: '15px 20px', backgroundColor: 'var(--primary-blue)', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ margin: 0, fontSize: '20px' }}>Management_DSMS</h1>
        {user && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <span>Bienvenido, <strong>{user.fullName}</strong> ({user.role})</span>
            <button onClick={handleLogout} className="btn-danger">Cerrar Sesión</button>
          </div>
        )}
      </header>

      {user && (
        <nav style={{ backgroundColor: '#e9ecef', padding: '10px 20px', display: 'flex', gap: '10px' }}>
          <button onClick={() => setCurrentTab('equipments')} className="btn-primary">
            Gestión de Equipos
          </button>
          <button onClick={() => setCurrentTab('issues')} className="btn-primary">
            Reportes y Fallas
          </button>

          {/* Muestra la pestaña de Admin únicamente al usuario autorizado */}
          {isAdmin && (
            <button onClick={() => setCurrentTab('users')} className="btn-primary">
              Gestión de Roles (Admin)
            </button>
          )}
        </nav>
      )}

      <main>
        {!user ? (
          <Login onLoginSuccess={(u) => setUser(u)} />
        ) : currentTab === 'equipments' ? (
          <Equipments />
        ) : currentTab === 'issues' ? (
          <Issues user={user} />
        ) : currentTab === 'users' && isAdmin ? (
          /* Renderiza la vista de roles solo si es Administrador */
          <UsersAdmin />
        ) : (
          /* Redirección de seguridad a equipos */
          <Equipments />
        )}
      </main>
    </div>
  );
}

export default App;