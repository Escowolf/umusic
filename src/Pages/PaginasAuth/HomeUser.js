import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import '../css/HomeUser.css';
import Navhome from '../../Components/Navegation/Navhome';
import PlaylistsComponent from '../../Components/HomeComponents/PlaylistsComponent';

function HomeUser() {
  const { currentUser } = useAuth();
  const [section, setSection] = useState('playlists');

  const renderSection = () => {
    switch (section) {
      case 'destaques':
        return <div>Destaques Content</div>;
      case 'mais-queridas':
        return <div>Mais Queridas Content</div>;
      case 'playlists':
        return (
          <PlaylistsComponent />
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
