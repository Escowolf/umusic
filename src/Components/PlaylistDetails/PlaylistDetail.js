import { useEffect, useMemo, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import { usePlayer } from '../../contexts/PlayerContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faMusic } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';
import './PlaylistDetail.css';

function PlaylistDetail() {
  const [playlistSelecionada, setPlaylistSelecionada] = useState({
    musicas: [],
    nome: 'Nome da Playlist',
    capa: 'caminho/para/imagem/default.jpg'
  });
  const [catalogoMusicas, setCatalogoMusicas] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const { _id } = useParams();
  const { currentTrack, playbackSource, playPlaylist, stop } = usePlayer();

  useEffect(() => {
    Promise.all([
      axios.get(`http://localhost:4000/playlists/${_id}`),
      axios.get('http://localhost:4000/musicas')
    ])
      .then(([playlistRes, musicasRes]) => {
        setPlaylistSelecionada(playlistRes.data);
        setCatalogoMusicas(musicasRes.data);
      })
      .catch(() => {
        toast.error('Não foi possível carregar a playlist.');
      });
  }, [_id]);

  useEffect(() => {
    if (playlistSelecionada.capa) {
      const header = document.getElementById('playlist-header');
      if (header) {
        header.style.backgroundImage = `url(${playlistSelecionada.capa})`;
      }
    }
  }, [playlistSelecionada.capa]);

  const savePlaylist = async (nextPlaylist) => {
    setIsSaving(true);

    try {
      const res = await axios.put(`http://localhost:4000/playlists/${_id}`, nextPlaylist);
      setPlaylistSelecionada(res.data);
      return res.data;
    } catch (error) {
      toast.error('Não foi possível salvar a playlist.');
      throw error;
    } finally {
      setIsSaving(false);
    }
  };

  const handleSongClick = (trackIndex) => {
    playPlaylist({
      playlistId: playlistSelecionada.id || _id,
      playlistName: playlistSelecionada.nome,
      tracks: playlistSelecionada.musicas,
      startIndex: trackIndex,
    });
  };

  const handleAddMusic = async (song) => {
    const exists = playlistSelecionada.musicas.some((music) => String(music.id) === String(song.id));
    if (exists) return;

    const nextPlaylist = {
      ...playlistSelecionada,
      musicas: [...playlistSelecionada.musicas, song],
    };

    await savePlaylist(nextPlaylist);
    toast.success('Música adicionada à playlist.');
  };

  const handleRemoveMusic = async (songId) => {
    const nextMusicas = playlistSelecionada.musicas.filter((music) => String(music.id) !== String(songId));
    const nextPlaylist = {
      ...playlistSelecionada,
      musicas: nextMusicas,
    };

    if (currentTrack && String(currentTrack.id) === String(songId)) {
      const nextTrack = nextMusicas[0] || null;
      if (nextTrack) {
        playPlaylist({
          playlistId: playlistSelecionada.id || _id,
          playlistName: playlistSelecionada.nome,
          tracks: nextMusicas,
          startIndex: 0,
        });
      } else {
        stop();
      }
    }

    await savePlaylist(nextPlaylist);
    toast.success('Música removida da playlist.');
  };

  const playlistMusicIds = useMemo(
    () => new Set(playlistSelecionada.musicas.map((music) => String(music.id))),
    [playlistSelecionada.musicas]
  );

  const availableMusics = catalogoMusicas.filter((music) => !playlistMusicIds.has(String(music.id)));

  const musicas = playlistSelecionada.musicas.length > 0
    ? playlistSelecionada.musicas.map((song, index) => (
      <li key={song.id || song._id || index} className="playlist-song-item">
        <div className={`playlist-song-button ${currentTrack?.arquivo === song.arquivo && playbackSource?.type === 'playlist' && String(playbackSource.id) === String(playlistSelecionada.id || _id) ? 'is-active' : ''}`}>
          <button
            type="button"
            className="playlist-song-main"
            onClick={() => handleSongClick(index)}
          >
            <span className="playlist-song-index">{String(index + 1).padStart(2, '0')}</span>
            <span className="playlist-song-meta">
              <span className="playlist-song-name">{song.nome}</span>
              <span className="playlist-song-artist">{song.cantor}</span>
            </span>
            <span className="playlist-song-action">
              {currentTrack?.arquivo === song.arquivo && playbackSource?.type === 'playlist' && String(playbackSource.id) === String(playlistSelecionada.id || _id)
                ? 'Tocando'
                : 'Tocar'}
            </span>
          </button>
          <button
            type="button"
            className="playlist-song-remove"
            onClick={() => handleRemoveMusic(song.id)}
            aria-label={`Remover ${song.nome} da playlist`}
            disabled={isSaving}
          >
            <FontAwesomeIcon icon={faMinus} />
          </button>
        </div>
      </li>
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
        <div className="playlist-content__columns">
          <section className="playlist-column">
            <div className="playlist-column__header">
              <FontAwesomeIcon icon={faMusic} />
              <div>
                <h2>Músicas da playlist</h2>
                <p>Clique para tocar ou remova da playlist.</p>
              </div>
            </div>
            <ul>
              {musicas}
            </ul>
          </section>

          <section className="playlist-column">
            <div className="playlist-column__header">
              <FontAwesomeIcon icon={faPlus} />
              <div>
                <h2>Biblioteca</h2>
                <p>Adicione músicas disponíveis à playlist.</p>
              </div>
            </div>
            {availableMusics.length > 0 ? (
              <ul>
                {availableMusics.map((song) => (
                  <li key={song.id} className="playlist-song-item">
                    <button
                      type="button"
                      className="playlist-song-button playlist-song-button--add"
                      onClick={() => handleAddMusic(song)}
                      disabled={isSaving}
                    >
                      <span className="playlist-song-meta playlist-song-meta--library">
                        <span className="playlist-song-name">{song.nome}</span>
                        <span className="playlist-song-artist">{song.cantor}</span>
                      </span>
                      <span className="playlist-song-action">
                        <FontAwesomeIcon icon={faPlus} />
                        <span>Adicionar</span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="playlist-empty-state">Todas as músicas já estão nesta playlist.</p>
            )}
          </section>
        </div>

      </div>
    </>
  );
}

export default PlaylistDetail;
