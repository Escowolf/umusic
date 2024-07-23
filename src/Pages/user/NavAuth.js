import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from '../img/logoUmus.png';
import UserExample from '../img/User.jpg';
import './NavAuth.css';

function NavAuth() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));

  function logout() {
    localStorage.removeItem("usuarioLogado");
    navigate('/');
  }

  function toggleDropdown() {
    setDropdownOpen(!dropdownOpen);
  }

  return (
    <>
      <header className="nav-container">
        <nav className="navbar-auth">
          <Link to="/home">
            <img src={logo} className="logo" alt="Logo site" />
          </Link>
          <div className="nav-links">
            <Link to="/home" className="nav-item">Início</Link>
            <Link to="/play" className="nav-item">Playlists</Link>
          </div>
          <div className="nav-user">
            <div className="dropdown" onClick={toggleDropdown}>
              <div className="dropdown-toggle">
                <img src={UserExample} alt="User" className="user-avatar" />
                <p><strong>{usuario.nome}</strong></p>
                <i className="fa-solid fa-caret-down"></i>
              </div>
              {dropdownOpen && (
                <div className="dropdown-content">
                  <Link className="dropdown-item" to="/newplaylist">Nova Playlist</Link>
                  <Link className="dropdown-item" to="/perfil">Perfil</Link>
                  <hr className="dropdown-divider" />
                  <button className="dropdown-item" onClick={logout}>Logout</button>
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}

export default NavAuth;
