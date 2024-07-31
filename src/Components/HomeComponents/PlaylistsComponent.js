import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Certifique-se de que axios esteja instalado
import './PlaylistsComponent.css';

const PlaylistsComponent = () => {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:4000/playlists")
      .then((res) => {
        setPlaylists(res.data);
        setLoading(false); // Atualiza o estado de carregamento quando os dados são recebidos
      })
      .catch((error) => {
        console.error("Erro ao buscar playlists:", error);
        setLoading(false); // Atualiza o estado de carregamento em caso de erro
      });
  }, []);

  if (loading) {
    return <div className="loading-msg">Carregando...</div>;
  }

  return (
    <div className='playlist-section'>
      {playlists.length === 0 ? (
        <div className="error-msg">Parece que ainda não temos dados por aqui</div>
      ) : (
        <ul className="playlist-data">
          <span>
            <Link to={'/newplaylist'} className='btn-new'>
              <i className='fa-solid fa-plus' />
            </Link>
            <p className="playlist-title">Criar nova playlist</p>
          </span>
          {playlists.map((playDados) => (
            <li key={playDados.id} className="playlist-item">
              <Link to={`/playlists/${playDados.id}`} className='playlist-link'>
                <img
                  className="playlist-image"
                  src={playDados.cover}
                  alt="Capa do álbum"
                />
              </Link>
              <p className="playlist-title">{playDados.name}</p>
              <p className="type">{playDados.type}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PlaylistsComponent;