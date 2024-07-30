import './Sidebar.css';
import { Link } from 'react-router-dom';

function Sidebar() {
    return (
        <div className='sidebar'>
            <Link to="/newplaylist" className="sidebar-item"><i className='fa-solid fa-headphones' /><p className='link-label'>Criar Playlist</p></Link>
            <Link to="#" className="sidebar-item"><i className='fa-solid fa-music' /><p className='link-label'>Músicas</p></Link>
            <Link to="#" className="sidebar-item"><i className='fa-solid fa-search' /><p className='link-label'>Explorar</p></Link>
            <Link to="#" className="sidebar-item"><i className='fa-solid fa-microphone' /><p className='link-label'>Podcasts</p></Link>
            <Link to="#" className="sidebar-item"><i className='fa-solid fa-radio' /><p className='link-label'>Rádios</p></Link>
            <Link to="#" className="sidebar-item"><i className='fa-solid fa-heart' /><p className='link-label'>Favoritos</p></Link>
            <Link to="#" className="sidebar-item"><i className='fa-solid fa-gear' /><p className='link-label'>Configurações</p></Link>
        </div>)
}

export default Sidebar;