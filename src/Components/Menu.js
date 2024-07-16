import { Link } from "react-router-dom";
import '../css/Menu.css';

function Menu() {
  return (<>
    <header>
      <nav className="navbar navbar-expand-lg fixed-top">
        <Link to="/"><img src="https://live.staticflickr.com/65535/51894192435_56e9fb2955_z.jpg" className="d-inline-block align-top" height="50" alt="Logo site"></img></Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="container-fluid" />

        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link to="/" className="nav-item nav-link text-light active">Home</Link>
            <Link to="/faq" className="nav-item nav-link text-light">Faq</Link>
            <Link to="/inscricao" className="nav-item nav-link text-light">Inscrever</Link>
            <Link to="/login" className="nav-item nav-link text-light">Login</Link>
          </div>
        </div>
      </nav>
    </header>
  </>);
}

export default Menu;