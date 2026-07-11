import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import AudioPlayer from '../AudioPlayer';
import { useAuth } from '../../contexts/AuthContext'
import toast from 'react-hot-toast';
import './PlaylistDetail.css';

function PlaylistDetail() {
  const [playlistSelecionada, setPlaylistSelecionada] = useState({
    musicas: [],
    nome: 'Nome da Playlist',
    capa: 'caminho/para/imagem/default.jpg'
  });
  const { _id } = useParams();
  const { currentMusic, setCurrentMusic } = useAuth();

  useEffect(() => {
    axios.get(`http://localhost:4000/playlists/${_id}`)
      .then((res) => {
        setPlaylistSelecionada(res.data);
      })
      .catch(() => {
        toast.error('Não foi possível carregar a playlist.');
      });
  }, [_id]);

  useEffect(() => {
    if (playlistSelecionada.capa) {
      document.getElementById('playlist-header').style.backgroundImage = `url(${playlistSelecionada.capa})`;
    }
  }, [playlistSelecionada.capa]);

  const handleSongClick = (song) => {
    setCurrentMusic(song);
  };

  const musicas = playlistSelecionada.musicas.length > 0
    ? playlistSelecionada.musicas.map((song, index) => (
      <div key={index} onClick={() => handleSongClick(song)} className="song-item">
        <p>{song.nome}</p>
        <p>{song.cantor}</p>
      </div>
    ))
    : <p>Não há músicas nesta playlist.</p>;

  return (
    <>
      <div id="playlist-header" className="playlist-header">
        <div className="playlist-info-general">
          <img className="playlist-photo" src={playlistSelecionada.capa} alt="" />
          <p className="playlist-main-title">{playlistSelecionada.nome}</p>
        </div>
      </div>
      <div className="playlist-content">
        <ul>
          {musicas}
        </ul>
        {currentMusic && <AudioPlayer {...currentMusic} />}
      </div>
    </>
  );
}

export default PlaylistDetail;
