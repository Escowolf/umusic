import { Link } from "react-router-dom";
import './Navbar.css';
import logo from "./favicon.optimized.svg"

function Navbar() {
  return (<>
    <nav className="nav-container">
      <span className="logo">
        <img src={logo} className="logo_icon" alt="Logo site" />
        <Link to="/" className="logo_name">uMusic</Link>
      </span>
      <i className="fa-solid fa-bars nav-icon"></i>
      <div className="nav-links">
        <Link to="/" className="nav-item">Início</Link>
        <Link to="/faq" className="nav-item">Faq</Link>
        <Link to="/sigin" className="nav-item">Cadastro</Link>
        <Link to="/login" className="nav-item">Login<i className="" /></Link>
      </div>
    </nav>
  </>);
}

export default Navbar;