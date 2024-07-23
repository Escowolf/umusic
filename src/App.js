import { Routes, Route } from "react-router-dom";
import './App.css';
import Home from './Pages/PaginasNoAuth/Home';
import Faq from './Pages/PaginasNoAuth/Faq';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Cadastro from './Pages/PaginasNoAuth/Cadastro';
import PlaylistDetail from "./Pages/componentesLista/PlaylistDetail";
import PlaylistList from "./Pages/componentesLista/PlaylistList";
import NewPlaylist from "./Pages/PaginasAuth/NewPlaylist";
import Login from "./Pages/PaginasNoAuth/Login";
import NavAuth from "./Pages/user/NavAuth";
import HomeAuth from "./Pages/PaginasAuth/HomeAuth";
import Profile from "./Pages/user/Profile";
import { AuthProvider, useAuth } from './contexts/AuthContext';
import PrivateRoute from './Components/PrivateRoute';

function App() {
  const { usuario } = useAuth();

  // Adiciona log para depuração
  console.log('Usuario:', usuario);

  // Retorna Loading enquanto verifica se o usuário está definido
  if (usuario === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {!usuario ? <Navbar /> : <NavAuth />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/singup" element={<Cadastro />} />
        <Route path="/login" element={<Login />} />

        {/* Rotas privadas */}
        <Route path="/play" element={<PrivateRoute element={PlaylistList} />} />
        <Route path="/playlists/:_id" element={<PrivateRoute element={PlaylistDetail} />} />
        <Route path="/newplaylist" element={<PrivateRoute element={NewPlaylist} />} />
        <Route path="/home" element={<PrivateRoute element={HomeAuth} />} />
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
