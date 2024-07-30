import React from 'react';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import RoutesConfig from './Routes/RoutesConfig';
import { AuthProvider, useAuth} from './contexts/AuthContext';
import './App.css';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Navbar />
      <RoutesConfig />
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
