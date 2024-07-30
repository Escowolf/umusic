import './Navhome.css';

function Navhome({ setSection }) {
  return (
    <nav className='home-menu'>
      <button className='menu-item' onClick={() => setSection('destaques')}>Destaques</button>
      <button className='menu-item' onClick={() => setSection('mais-queridas')}>Mais Queridas</button>
      <button className='menu-item' onClick={() => setSection('playlists')}>Playlists</button>
      <button className='menu-item' onClick={() => setSection('albuns')}> Álbuns</button>
      <button className='menu-item' onClick={() => setSection('artistas')}> Artistas</button>
      <button className='menu-item' onClick={() => setSection('historico')}> Histórico</button>
      <button className='menu-item' onClick={() => setSection('podcasts')}> Podcasts</button>
      <button className='menu-item' onClick={() => setSection('mais')}> Mais <i className='fa-solid fa-plus' /></button>
    </nav>
  )
}

export default Navhome;