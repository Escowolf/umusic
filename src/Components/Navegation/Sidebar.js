import './Sidebar.css';
import { NavLink } from 'react-router-dom';

function Sidebar() {
    return (
        <div className='sidebar app-sidebar'>
            <NavLink to="/home" className={({ isActive }) => `sidebar-item ${isActive ? 'is-active' : ''}`}><i className='fa-solid fa-house' /><p className='link-label'>Início</p></NavLink>
            <NavLink to="/newplaylist" className={({ isActive }) => `sidebar-item ${isActive ? 'is-active' : ''}`}><i className='fa-solid fa-headphones' /><p className='link-label'>Criar Playlist</p></NavLink>
            <NavLink to="/musicas" className={({ isActive }) => `sidebar-item ${isActive ? 'is-active' : ''}`}><i className='fa-solid fa-music' /><p className='link-label'>Músicas</p></NavLink>
            <NavLink to="/explorar" className={({ isActive }) => `sidebar-item ${isActive ? 'is-active' : ''}`}><i className='fa-solid fa-search' /><p className='link-label'>Explorar</p></NavLink>
            <NavLink to="/podcasts" className={({ isActive }) => `sidebar-item ${isActive ? 'is-active' : ''}`}><i className='fa-solid fa-microphone' /><p className='link-label'>Podcasts</p></NavLink>
            <NavLink to="/radios" className={({ isActive }) => `sidebar-item ${isActive ? 'is-active' : ''}`}><i className='fa-solid fa-radio' /><p className='link-label'>Rádios</p></NavLink>
            <NavLink to="/favorites" className={({ isActive }) => `sidebar-item ${isActive ? 'is-active' : ''}`}><i className='fa-solid fa-heart' /><p className='link-label'>Favoritos</p></NavLink>
            <NavLink to="/settings" className={({ isActive }) => `sidebar-item ${isActive ? 'is-active' : ''}`}><i className='fa-solid fa-gear' /><p className='link-label'>Configurações</p></NavLink>
        </div>)
}

export default Sidebar;
