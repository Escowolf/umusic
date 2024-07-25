import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import AudioPlayer from '../AudioPlayer';
import './PlaylistDetail.css';

function PlaylistDetail() {
  const [playlistSelecionada, setPlaylistSelecionada] = useState({ musicas: [], nome: 'Nome da Playlist', capa: 'caminho/para/imagem/default.jpg' });
  const { _id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:4000/playlists/${_id}`)
      .then((res) => {
        setPlaylistSelecionada(res.data);
      })
      .catch(() => {
        // Se ocorrer um erro na requisição, os valores padrão serão mantidos
      });
  }, [_id]);

  useEffect(() => {
    if (playlistSelecionada.capa) {
      document.getElementById('playlist-header').style.backgroundImage = `url(${playlistSelecionada.capa})`;
    }
  }, [playlistSelecionada.capa]);

  const musicas = (playlistSelecionada.musicas && playlistSelecionada.musicas.length > 0) 
  ? playlistSelecionada.musicas.map((playDados, index) => (
    <div key={index} className="playlist-detail">
      <AudioPlayer src={playDados.arquivo} musicname={playDados.nome} artist={playDados.cantor} />
    </div>
  ))
  : <p>Não há músicas nesta playlist.</p>;

  return (
    <>
      <div id="playlist-header" className="playlist-header">
        <div className="playlist-info-general">
          <img className="playlist-photo" src={playlistSelecionada.capa} alt="Capa do álbum" />
          <p className="playlist-main-title"> {playlistSelecionada.nome} </p>
        </div>
      </div>
      <div className="playlist-content">
        <ul>
          {musicas}
        </ul>
      </div>
    </>
  );
}

export default PlaylistDetail;