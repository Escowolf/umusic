import { Link } from "react-router-dom";
import './Navbar.css';
import logo from "./favicon.optimized.svg"

function Navbar() {
  return (<>
    <nav className="nav-container">
      <Link to="/" className="logo_name"><img src={logo} className="logo_icon" alt="Logo site"></img>uMusic</Link>
      <i className="fa-solid fa-bars nav-icon"></i>
      <div className="nav-links">
        <Link to="/" className="nav-item">Home</Link>
        <Link to="/faq" className="nav-item">Faq</Link>
        <Link to="/inscricao" className="nav-item">Inscrever</Link>
        <Link to="/login" className="nav-item">Login</Link>
      </div>
    </nav>
  </>);
}

export default Navbar;