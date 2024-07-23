import { Link, useNavigate } from "react-router-dom";
import logo from '../img/logoUmus.png';
import UserExample from '../img/User.jpg';

function NavAuth() {
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));

  function logout() {
    localStorage.removeItem("usuarioLogado");
    navigate('/');
  }

  return (
    <>
      <header>
        <nav className="navbar">
          <Link to="/">
            <img src={logo} className="logo" height="50" alt="Logo site" />
          </Link>
          <div className="nav-links">
            <Link to="/home" className="nav-item">Início</Link>
            <Link to="/play" className="nav-item">Playlists</Link>
          </div>
          <div className="user-menu">
            <div className="dropdown">
              <div className="dropdown-toggle" id="dropdownUser1">
                <img src={UserExample} alt="User" className="user-avatar" />
                <strong>{usuario.nome}</strong>
              </div>
              <div className="dropdown-content">
                <Link className="dropdown-item" to="/newplaylist">Nova Playlist</Link>
                <Link className="dropdown-item" to="/perfil">Perfil</Link>
                <hr className="dropdown-divider" />
                <button className="dropdown-item" onClick={logout}>Logout</button>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}

export default NavAuth;
