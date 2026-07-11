import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic, faPlay, faSpinner } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';
import { usePlayer } from '../../contexts/PlayerContext';
import '../css/Musicas.css';

function Musicas() {
  const [musicas, setMusicas] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { currentTrack, playTrack, isPlaying } = usePlayer();

  useEffect(() => {
    let active = true;

    axios
      .get('http://localhost:4000/musicas')
      .then((response) => {
        if (!active) return;
        setMusicas(Array.isArray(response.data) ? response.data : []);
        setError('');
      })
      .catch(() => {
        if (!active) return;
        setError('Não foi possível carregar as músicas.');
        toast.error('Não foi possível carregar as músicas.');
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const filteredMusicas = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return musicas;

    return musicas.filter((music) => {
      const name = `${music.nome || ''} ${music.cantor || ''}`.toLowerCase();
      return name.includes(query);
    });
  }, [musicas, search]);

  const handlePlay = (music) => {
    playTrack(music);
  };

  return (
    <section className="music-library-page">
      <header className="music-library-hero">
        <div className="music-library-hero__icon">
          <FontAwesomeIcon icon={faMusic} />
        </div>
        <div className="music-library-hero__text">
          <p className="music-library-hero__eyebrow">Biblioteca completa</p>
          <h1>Todas as músicas</h1>
          <p>
            Explore nosso catálogo e toque qualquer faixa diretamente no player global.
          </p>
        </div>
      </header>

      <div className="music-library-toolbar">
        <input
          type="search"
          className="music-library-search"
          placeholder="Buscar por música ou artista"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          aria-label="Buscar músicas"
        />
        <span className="music-library-counter">
          {loading ? 'Carregando...' : `${filteredMusicas.length} faixa(s)`}
        </span>
      </div>

      {error ? (
        <div className="music-library-empty">
          <p>{error}</p>
        </div>
      ) : null}

      {loading ? (
        <div className="music-library-loading">
          <FontAwesomeIcon icon={faSpinner} spin />
          <span>Buscando músicas no backend...</span>
        </div>
      ) : (
        <ul className="music-library-grid">
          {filteredMusicas.length > 0 ? filteredMusicas.map((music) => {
            const isCurrent = currentTrack?.src === (music.src || music.arquivo);

            return (
              <li key={music.id} className={`music-library-card ${isCurrent ? 'is-active' : ''}`}>
                <button
                  type="button"
                  className="music-library-card__button"
                  onClick={() => handlePlay(music)}
                >
                  <span className="music-library-card__icon">
                    <FontAwesomeIcon icon={faPlay} />
                  </span>
                  <span className="music-library-card__meta">
                    <strong className="music-library-card__title">{music.nome}</strong>
                    <span className="music-library-card__artist">{music.cantor}</span>
                  </span>
                  <span className="music-library-card__action">
                    {isCurrent && isPlaying ? 'Tocando' : 'Ouvir'}
                  </span>
                </button>
              </li>
            );
          }) : (
            <li className="music-library-empty">
              <p>Nenhuma música encontrada.</p>
            </li>
          )}
        </ul>
      )}
    </section>
  );
}

export default Musicas;
