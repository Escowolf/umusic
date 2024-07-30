import './Footer.css';

function Footer() {
  return (<>
    <footer>
      <nav className="footer">
        <p className='special-text'> © 2024. Desenvolvimento para plataformas web. Nulamar. </p>
        <ul className="nav-footer-items">
          <a href="#"><i className="fa-brands fa-facebook special-text" /></a>
          <a href="#"><i className="fa-brands fa-instagram special-text " /></a>
          <a href="#"><i className="fa-brands fa-linkedin special-text" /></a>
        </ul>
      </nav>
    </footer>
  </>);
}

export default Footer;