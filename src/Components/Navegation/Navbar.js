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
    <header className="nav-container">
      <nav className={`navbar ${isResponsive ? "responsive" : ""}`}>
        <Link to={isAuthenticated && currentUser ? "/home" : "/"} className="nav-logo">
          <p className="logo-name">uMusic</p>
        </Link>
        <div className="nav-content">
          {!isAuthenticated ? (
            <div className="nav-links">
              <Link to="/faq" className="nav-item" onClick={toggleResponsive}>FAQ</Link>
              <Link to="/signup" className="nav-sign" onClick={toggleResponsive}>Sign up</Link>
              <Link to="/login" className="nav-log" onClick={toggleResponsive}>Log in <i className="fa-solid fa-right-to-bracket"></i></Link>
            </div>
          ) : (
            <div className="nav-user">
              <div className="user-container" onClick={toggleDropdown}>
                <div className="dropdown-toggle">
                  <img src={currentUser?.user_photo} alt="User" className="user-avatar" />
                  <p className="user-name"><strong>{currentUser?.username}</strong></p>
                  <i className="fa-solid fa-caret-down"></i>
                </div>
                {dropdownOpen && (
                  <div className="dropdown-content">
                    <Link className="dropdown-item" to="/newplaylist">Nova Playlist</Link>
                    <Link className="dropdown-item" to="/perfil">Perfil</Link>
                    <hr className="dropdown-divider" />
                    <button className="dropdown-btn" onClick={handleLogout}>Sair <i className="fa-solid fa-power-off" /></button>
                  </div>
                )}
              </div>
            </div>
          )}
          <div className="nav-icons">
            <Link to="#" className="nav-item" onClick={toggleLightMode}>
              <i id="light-mode" className={`fa-regular fa-lightbulb ${isLightMode ? "active" : ""}`} alt="Toggle light mode"></i>
            </Link>
            <Link to="#" className="dropbtn nav-icon nav-item" onClick={toggleResponsive}>
              <i className="fa fa-bars"></i>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
