import './Footer.css';

function Footer() {
  return (<>
    <footer>
      <nav className="footer">
        <p className='special-text'> © 2024. Desenvolvimento para plataformas web. Nulamar. </p>
        <ul className="nav-footer-items">
          <li><button type="button" className="footer-icon" aria-label="Facebook"><i className="fa-brands fa-facebook special-text" /></button></li>
          <li><button type="button" className="footer-icon" aria-label="Instagram"><i className="fa-brands fa-instagram special-text " /></button></li>
          <li><button type="button" className="footer-icon" aria-label="LinkedIn"><i className="fa-brands fa-linkedin special-text" /></button></li>
        </ul>
      </nav>
    </footer>
  </>);
}

export default Footer;
