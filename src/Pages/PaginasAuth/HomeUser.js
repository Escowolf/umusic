import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../css/HomeUser.css';

function HomeUser() {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/playlists")
      .then((res) => setPlaylists(res.data));
  }, []);

  return (
    <div className="playlist-content">
      <h1 className='playlists-title'>Playlists</h1>
      <Link id="link" to="/newplaylist">
        <h2 className="subtitle">+ Nova Playlist</h2>
      </Link>
      <ul className="playlist-data">
        {playlists.map((playDados) => (
          <li key={playDados.id} className="playlist-item">
            <Link to={`/playlists/${playDados.id}`} className='playlist-link'>
              <img
                className="playlist-image"
                src={playDados.capa}
                alt="Capa do álbum"
              />
              <p className="playlist-title">{playDados.nome}</p>
            </Link>

          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomeUser;
