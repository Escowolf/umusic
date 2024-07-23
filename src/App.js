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
import { useState } from "react";
import NavAuth from "./Pages/user/NavAuth";
import HomeAuth from "./Pages/PaginasAuth/HomeAuth";
import Profile from "./Pages/user/Profile";

function App() {
  const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));
  const [login] = useState(usuario);
  console.log(login);
  return (<>
    {!login ? (<Navbar />) : (<NavAuth />)}
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/faq" element={<Faq />} />
      <Route path="/play" element={<PlaylistList />} />
      <Route path="/playlists/:_id" element={<PlaylistDetail />} />
      <Route path="/newplaylist" element={<NewPlaylist />} />
      <Route path="/singup" element={<Cadastro />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<HomeAuth />} />
      <Route path="/perfil" element={<Profile />} />

    </Routes>
    <Footer />
  </>
  );
}

export default App;