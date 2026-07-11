import React from 'react';
import Navbar from './Components/Navegation/Navbar';
import Footer from './Components/Navegation/Footer';
import RoutesConfig from './Routes/RoutesConfig';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { PlayerProvider } from './contexts/PlayerContext';
import './App.css';
import Sidebar from './Components/Navegation/Sidebar';
import { Toaster } from 'react-hot-toast';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2800,
          style: {
            borderRadius: '14px',
            padding: '14px 16px',
          },
        }}
      />
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
      <PlayerProvider>
        <App />
      </PlayerProvider>
    </AuthProvider>
  );
}
