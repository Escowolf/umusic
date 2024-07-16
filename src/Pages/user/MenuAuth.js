import { Link, useNavigate } from "react-router-dom";
import logo from '../img/logoUmus.png';
import '../css/MenuAuth.css';
import UserExemple from '../img/User.jpg';
import { useState } from "react";


function MenuAuth() {
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));

  function logout(){
    localStorage.removeItem("usuarioLogado");
    navigate('/');
  }
  
  return (<>
    <header>
      <nav className="navbar navbar-expand-lg fixed-top">
        <Link to="/"><img src={logo} className="d-inline-block align-top" height="50" alt="Logo site"></img></Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="container-fluid" />

        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link to="/home" className="nav-item nav-link text-light active">Início</Link>
            <Link to="/play" className="nav-item nav-link text-light">Playlists</Link>
            <div className="dropdown">
      <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
        <img src={UserExemple} alt="" className="rounded-circle me-2" width="32" height="32"/>
        <strong>{usuario.nome}</strong>
      </a>
      <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
        <li><Link className="dropdown-item" id="link" to="/newplaylist">Nova Playlist</Link></li>
        <li><Link className="dropdown-item" to="/perfil">Perfil</Link></li>
        <li><hr className="dropdown-divider"/></li>
        <li><button className="dropdown-item" onClick={logout}>Logout</button></li>
      </ul>
    </div>&nbsp;&nbsp;&nbsp;&nbsp;
            
          </div>
        </div>
      </nav>
    </header>
  </>);
}

export default MenuAuth;