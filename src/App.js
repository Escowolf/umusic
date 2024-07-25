import { Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import Home from './Pages/PaginasNoAuth/Home';
import Faq from './Pages/PaginasNoAuth/Faq';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Cadastro from './Pages/PaginasNoAuth/Cadastro';
import PlaylistDetail from "./Components/PlaylistDetails/PlaylistDetail";
import CreatePlaylist from "./Pages/PaginasAuth/CreatePlaylist";
import Login from "./Pages/PaginasNoAuth/Login";
import HomeUser from "./Pages/PaginasAuth/HomeUser";
import Profile from "./Pages/PaginasAuth/Profile";
import { AuthProvider, useAuth } from './contexts/AuthContext';
import NewPlaylist from "./Components/PlaylistDetails/NewPlaylist";
import PrivateRoute from './Components/PrivateRoute';

function App() {
  const { isAuthenticated } = useAuth();

  console.log('Is Authenticated:', isAuthenticated);

  // Retorna Loading enquanto verifica se a autenticação está sendo processada
  if (isAuthenticated === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/signup" element={<Cadastro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={isAuthenticated ? <Navigate to="/home" /> : <Navigate to="/" />} />

        {/* Rotas privadas */}
        <Route path="/playlists/:_id" element={<PrivateRoute element={PlaylistDetail} />} />
        <Route path="/select-music/:_id" element={<PrivateRoute element={NewPlaylist} />} />
        <Route path="/newplaylist" element={<PrivateRoute element={CreatePlaylist} />} />
        <Route path="/home" element={<PrivateRoute element={HomeUser} />} />
        <Route path="/perfil" element={<PrivateRoute element={Profile} />} />
      </Routes>
      <Footer />
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
