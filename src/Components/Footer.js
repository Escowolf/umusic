import './Footer.css';

function Footer() {
  return (<>
    <footer>
      <nav className="footer">
        <p> © 2024. Desenvolvimento para plataformas web. Nulamar. </p>
        <ul className="nav-footer-items">
          <a href="#"><i className="fa-brands fa-facebook nav-item" /></a>
          <a href="#"><i className="fa-brands fa-instagram nav-item" /></a>
          <a href="#"><i className="fa-brands fa-linkedin nav-item" /></a>
        </ul>
      </nav>
    </footer>
  </>);
}

export default Footer;