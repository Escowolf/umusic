import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Faq from '../Pages/PaginasNoAuth/Faq';
import Home from '../Pages/PaginasNoAuth/Home';
import Cadastro from '../Pages/PaginasNoAuth/Cadastro';
import Login from '../Pages/PaginasNoAuth/Login';
import PlaylistDetail from '../Components/PlaylistDetails/PlaylistDetail';
import CreatePlaylist from '../Pages/PaginasAuth/CreatePlaylist';
import HomeUser from '../Pages/PaginasAuth/HomeUser';
import Profile from '../Pages/PaginasAuth/Profile';
import NewPlaylist from '../Components/PlaylistDetails/NewPlaylist';
import PrivateRoute from '../Components/PrivateRoute';
import { useAuth } from '../contexts/AuthContext';

function RoutesConfig() {
  const { isAuthenticated } = useAuth();

  // Retorna Loading enquanto verifica se a autenticação está sendo processada
  if (isAuthenticated === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/faq" element={<Faq />} />
      <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/home" />} />
      <Route path="/signup" element={!isAuthenticated ? <Cadastro /> : <Navigate to="/home" />} />
      <Route path="/" element={!isAuthenticated ? <Home /> : <Navigate to="/home" />} />

      {/* Rotas privadas */}
      <Route path="/playlists/:_id" element={<PrivateRoute element={PlaylistDetail} />} />
      <Route path="/select-music/:_id" element={<PrivateRoute element={NewPlaylist} />} />
      <Route path="/newplaylist" element={<PrivateRoute element={CreatePlaylist} />} />
      <Route path="/home" element={<PrivateRoute element={HomeUser} />} />
      <Route path="/perfil" element={<PrivateRoute element={Profile} />} />
    </Routes>
  );
}

export default RoutesConfig;
