import './Navhome.css';

function Navhome({ setSection, section }) {
  return (
    <nav className='home-menu'>
      <button className={`menu-item ${section === 'playlists' ? 'is-active' : ''}`} onClick={() => setSection('playlists')}>Playlists</button>
      <button className={`menu-item ${section === 'destaques' ? 'is-active' : ''}`} onClick={() => setSection('destaques')}>Destaques</button>
      <button className={`menu-item ${section === 'mais-queridas' ? 'is-active' : ''}`} onClick={() => setSection('mais-queridas')}>Mais Queridas</button>
      <button className={`menu-item ${section === 'albuns' ? 'is-active' : ''}`} onClick={() => setSection('albuns')}>Álbuns</button>
      <button className={`menu-item ${section === 'artistas' ? 'is-active' : ''}`} onClick={() => setSection('artistas')}>Artistas</button>
      <button className={`menu-item ${section === 'historico' ? 'is-active' : ''}`} onClick={() => setSection('historico')}>Histórico</button>
      <button className={`menu-item ${section === 'podcasts' ? 'is-active' : ''}`} onClick={() => setSection('podcasts')}>Podcasts</button>
      <button className={`menu-item ${section === 'mais' ? 'is-active' : ''}`} onClick={() => setSection('mais')}>Mais <i className='fa-solid fa-plus' /></button>
    </nav>
  )
}

export default Navhome;
