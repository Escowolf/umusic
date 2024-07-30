import React from 'react';
import Navbar from './Components/Navegation/Navbar';
import Footer from './Components/Navegation/Footer';
import RoutesConfig from './Routes/RoutesConfig';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import './App.css';
import Sidebar from './Components/Navegation/Sidebar';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Navbar />
      <div className="app-container">
        {isAuthenticated && <Sidebar />}
        <main className={`main-content ${isAuthenticated ? 'with-sidebar' : ''}`}>
          <RoutesConfig />
        </main>
      </div>
      {!isAuthenticated && <Footer />}
    </>
  );
}

export default function AppWithProvider() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}
