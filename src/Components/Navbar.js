import { Link } from "react-router-dom";
import './Navbar.css';
import logo from "./favicon.optimized.svg"

function Navbar() {
  return (<>
    <nav id="navbar" className="nav-container">
      <span className="logo">
        <img src={logo} className="logo_icon" alt="Logo site" />
        <Link to="/" className="logo_name">uMusic</Link>
      </span>
      <div className="nav-links">
        <Link to="/" className="nav-item" onClick={hideItens}>Home</Link>
        <Link to="/faq" className="nav-item" onClick={hideItens}>FAQ</Link>
        <Link to="/singup" className="nav-item" onClick={hideItens}>Sing up</Link>
        <Link to="/login" className="nav-log" onClick={hideItens}>Log in<i className="fa-solid fa-right-to-bracket"></i></Link>
      </div>
      <span>
        <Link to="#" className="nav-icon nav-item" onClick={lightModeFunction}>
          <i id="light-mode" className="fa-regular fa-lightbulb" alt="Toggle light mode" value="1"></i>
        </Link>

        <Link to="#" className="dropbtn nav-icon nav-item" onClick={showItens}>
          <i className="fa fa-bars"></i>
        </Link>
      </span>
    </nav>
  </>);

  //Função que altera tema da página. 
  //A variável element serve para definir qual elemento será alterado.
  function lightModeFunction() {
    var element = document.documentElement;
    element.classList.toggle("dark-mode");
  }

  function showItens() {
    var x = document.getElementById("navbar");
    if (x.className === "nav-container") {
      x.className += " responsive";
    } else {
      x.className = "nav-container";
    }
  }

  function hideItens() {
    var x = document.getElementById("navbar");
    if (x.className.includes("responsive")) {
      x.className = "nav-container";
    }
  }
}

export default Navbar;