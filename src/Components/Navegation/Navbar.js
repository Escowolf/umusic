import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../../contexts/AuthContext';
import { useState } from "react";
import './Navbar.css';

function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isResponsive, setIsResponsive] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);
  const { isAuthenticated, logout, currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleDropdown = () => {
    setDropdownOpen(prevState => !prevState);
  };

  const toggleResponsive = () => {
    setIsResponsive(prevState => !prevState);
  };

  const toggleLightMode = () => {
    setIsLightMode(prevState => !prevState);
    document.documentElement.classList.toggle("dark-mode", !isLightMode);
  };

  return (
      <nav id="navbar" className={`nav-container ${isResponsive ? "responsive" : ""}`}>
        <Link to={isAuthenticated && currentUser ? "/home" : "/"} className="nav-logo">
          <p className="logo-name">uMusic</p>
        </Link>
        <div className="nav-drop">
          {!isAuthenticated ? (
            <div className="nav-drop-content">
              <Link to="/faq" className="nav-item nav-drop-item" onClick={toggleResponsive}>FAQ</Link>
              <Link to="/signup" className="nav-sign nav-drop-item" onClick={toggleResponsive}>Sign up</Link>
              <Link to="/login" className="nav-log nav-drop-item" onClick={toggleResponsive}>Log in <i className="fa-solid fa-right-to-bracket"></i></Link>
            </div>
          ) : (
            <div className="nav-user">
              <div className="user-container">
                <button
                  type="button"
                  className="dropdown-toggle"
                  onClick={toggleDropdown}
                  aria-haspopup="menu"
                  aria-expanded={dropdownOpen}
                  aria-label="Abrir menu do usuário"
                >
                  <img src={currentUser?.user_photo} alt="User" className="user-avatar" />
                  <span className="user-name">{currentUser?.username}</span>
                  <i className="fa-solid fa-caret-down" aria-hidden="true"></i>
                </button>
                {dropdownOpen && (
                  <div className="dropdown-content" role="menu" aria-label="Menu do usuário">
                    <Link className="dropdown-item" to="/newplaylist" role="menuitem">Nova Playlist</Link>
                    <Link className="dropdown-item" to="/perfil" role="menuitem">Perfil</Link>
                    <hr className="dropdown-divider" />
                    <button className="dropdown-btn" onClick={handleLogout} type="button">
                      Sair <i className="fa-solid fa-power-off" aria-hidden="true" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
          <div className="nav-icons">
            <Link to="#" className="nav-icon-item" onClick={toggleLightMode}>
              <i id="light-mode" className={`fa-regular fa-lightbulb ${isLightMode ? "active" : ""}`} alt="Toggle light mode"></i>
            </Link>
            <Link to="#" className="dropbtn nav-icon-item" onClick={toggleResponsive}>
              <i className="fa fa-bars"></i>
            </Link>
          </div>
        </div>
      </nav>
  );
}

export default Navbar;
