import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import '../css/HomeUser.css';
import Navhome from '../../Components/Navegation/Navhome';

function HomeUser() {
  const [playlists, setPlaylists] = useState([]);
  const { currentUser } = useAuth();
  const [section, setSection] = useState('playlists');

  useEffect(() => {
    axios
      .get("http://localhost:4000/playlists")
      .then((res) => setPlaylists(res.data));
  }, []);

  const renderSection = () => {
    switch (section) {
      case 'destaques':
        return <div>Destaques Content</div>;
      case 'mais-queridas':
        return <div>Mais Queridas Content</div>;
      case 'playlists':
        return (
          <div className='playlist-section'>
            <ul className="playlist-data">
              <Link to={'/newplaylist'} className='btn-new' ><i className='fa-solid fa-plus' /></Link>
              {playlists.map((playDados) => (
                <li key={playDados.id} className="playlist-item">
                  <Link to={`/playlists/${playDados.id}`} className='playlist-link'>
                    <img
                      className="playlist-image"
                      src={playDados.capa}
                      alt="Capa do álbum"
                    />
                  </Link>
                  <p className="playlist-title">{playDados.nome}</p>
                  <p className="type">{playDados.type}</p>
                </li>
              ))}
            </ul>
          </div>
        );
      case 'albuns':
        return <div>Álbuns Content</div>;
      case 'artistas':
        return <div>Artistas Content</div>;
      case 'historico':
        return <div>Histórico Content</div>;
      case 'podcasts':
        return <div>Podcasts Content</div>;
      case 'mais':
        return <div>Mais Content</div>;
      default:
        return <div>Destaques Content</div>;
    }
  };

  return (
    <>
      <div className='home-container'>
        <div className='data-user'>
          <img
            src={currentUser?.user_photo}
            className="home-photo"
            alt="User photo"
          />
          <div className='home-text-container'>
            <h2 className='home-name'>
              {currentUser?.nome}
            </h2>
            <p>{currentUser?.seguidores} seguidores - {currentUser?.seguindo} seguindo</p>
          </div>
        </div>
        <Navhome setSection={setSection} />
      </div>
      <div className="home-content">
        {renderSection()}
      </div>
    </>
  );
}

export default HomeUser;
