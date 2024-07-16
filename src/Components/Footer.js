import './Footer.css';

function Footer() {
  return (<>
    <footer>
      <nav className="footer">
        <p> © 2022 - nulamar - Desenvolvimento para plataformas web</p>
        <ul className="nav-footer-items">
          <a href="#"><i className="fa-brands fa-facebook" /></a>
          <a href="#"><i className="fa-brands fa-instagram" /></a>
          <a href="#"><i className="fa-brands fa-linkedin" /></a>
        </ul>
      </nav>
    </footer>
  </>);
}

export default Footer;