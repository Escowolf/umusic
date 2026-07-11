import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompass, faFire, faMusic, faPlay, faRadio, faHeadphones, faSpinner } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';
import { usePlayer } from '../../contexts/PlayerContext';
import '../css/Explorar.css';

const moodFilters = [
  { id: 'all', label: 'Tudo' },
  { id: 'morning', label: 'Bom dia' },
  { id: 'chill', label: 'Chill' },
  { id: 'sunny', label: 'Sunny' },
  { id: 'party', label: 'Festa' },
  { id: 'romantic', label: 'Romântico' },
  { id: 'rap', label: 'Rap' },
];

function Explorar() {
  const [playlists, setPlaylists] = useState([]);
  const [musicas, setMusicas] = useState([]);
  const [search, setSearch] = useState('');
  const [activeMood, setActiveMood] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { playTrack, playPlaylist } = usePlayer();

  useEffect(() => {
    let active = true;

    Promise.all([
      axios.get('http://localhost:4000/playlists'),
      axios.get('http://localhost:4000/musicas'),
    ])
      .then(([playlistsRes, musicasRes]) => {
        if (!active) return;
        setPlaylists(Array.isArray(playlistsRes.data) ? playlistsRes.data : []);
        setMusicas(Array.isArray(musicasRes.data) ? musicasRes.data : []);
        setError('');
      })
      .catch(() => {
        if (!active) return;
        setError('Não foi possível carregar as sugestões de exploração.');
        toast.error('Não foi possível carregar as sugestões de exploração.');
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const normalizedPlaylists = useMemo(
    () =>
      playlists.map((playlist) => ({
        ...playlist,
        title: playlist.nome || playlist.name || 'Playlist sem nome',
        cover: playlist.capa || playlist.cover || '',
        trackCount: Array.isArray(playlist.musicas) ? playlist.musicas.length : 0,
      })),
    [playlists]
  );

  const featuredPlaylists = useMemo(() => {
    const query = search.trim().toLowerCase();

    return normalizedPlaylists.filter((playlist) => {
      const text = `${playlist.title} ${playlist.type || ''}`.toLowerCase();
      const matchesSearch = !query || text.includes(query);
      const title = playlist.title.toLowerCase();
      const matchesMood =
        activeMood === 'all' ||
        (activeMood === 'morning' && title.includes('bom dia')) ||
        (activeMood === 'chill' && title.includes('chilling')) ||
        (activeMood === 'sunny' && title.includes('sunny')) ||
        (activeMood === 'party' && title.includes('festinha')) ||
        (activeMood === 'romantic' && title.includes('mozão')) ||
        (activeMood === 'rap' && title.includes('rap'));

      return matchesSearch && matchesMood;
    });
  }, [activeMood, normalizedPlaylists, search]);

  const featuredTracks = useMemo(() => {
    const query = search.trim().toLowerCase();
    return musicas.filter((music) => {
      const text = `${music.nome || ''} ${music.cantor || ''}`.toLowerCase();
      const title = (music.nome || '').toLowerCase();
      const artist = (music.cantor || '').toLowerCase();
      const moodMatch =
        activeMood === 'all' ||
        (activeMood === 'morning' && (title.includes('morning') || title.includes('coffee') || title.includes('7am'))) ||
        (activeMood === 'chill' && (title.includes('chill') || artist.includes('ketsa') || artist.includes('holizna'))) ||
        (activeMood === 'sunny' && (title.includes('sun') || title.includes('glimpse') || title.includes('overstand'))) ||
        (activeMood === 'party' && (title.includes('life') || title.includes('ye') || title.includes('groove'))) ||
        (activeMood === 'romantic' && (title.includes('desire') || title.includes('clyde') || title.includes('step by step'))) ||
        (activeMood === 'rap' && (artist.includes('rap') || title.includes('ye') || title.includes('ptsd') || title.includes('good kids')));
      return (!query || text.includes(query)) && moodMatch;
    });
  }, [activeMood, musicas, search]);

  const topPlaylists = normalizedPlaylists.slice(0, 6);

  const handlePlayPlaylist = (playlist) => {
    if (!Array.isArray(playlist.musicas) || playlist.musicas.length === 0) return;

    playPlaylist({
      playlistId: playlist.id,
      playlistName: playlist.title,
      tracks: playlist.musicas,
      startIndex: 0,
    });
  };

  const handlePlayTrack = (music) => {
    playTrack(music);
  };

  return (
    <section className="explore-page">
      <header className="explore-hero">
        <div className="explore-hero__badge">
          <FontAwesomeIcon icon={faCompass} />
        </div>
        <div className="explore-hero__content">
          <p className="explore-hero__eyebrow">Descobrir música</p>
          <h1>Explore por clima, playlist e faixas prontas para tocar.</h1>
          <p>
            Encontre atalhos rápidos para seu catálogo, descubra playlists por momento e
            comece a ouvir sem sair da tela.
          </p>
        </div>
      </header>

      <div className="explore-toolbar">
        <input
          type="search"
          className="explore-search"
          placeholder="Buscar playlists, músicas ou artistas"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          aria-label="Buscar em explorar"
        />
      </div>

      <div className="explore-chips" role="list" aria-label="Filtros de exploração">
        {moodFilters.map((filter) => (
          <button
            key={filter.id}
            type="button"
            className={`explore-chip ${activeMood === filter.id ? 'is-active' : ''}`}
            onClick={() => setActiveMood(filter.id)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {error ? (
        <div className="explore-empty">
          <p>{error}</p>
        </div>
      ) : null}

      {loading ? (
        <div className="explore-loading">
          <FontAwesomeIcon icon={faSpinner} spin />
          <span>Montando sugestões...</span>
        </div>
      ) : (
        <>
          <section className="explore-section">
            <div className="explore-section__header">
              <FontAwesomeIcon icon={faFire} />
              <div>
                <h2>Playlists em destaque</h2>
                <p>Atalhos para os blocos que já existem no seu catálogo.</p>
              </div>
            </div>

            <div className="explore-grid">
              {featuredPlaylists.length > 0 ? (
                featuredPlaylists.map((playlist) => (
                  <article key={playlist.id} className="explore-card">
                    <button
                      type="button"
                      className="explore-card__cover"
                      onClick={() => handlePlayPlaylist(playlist)}
                    >
                      <img src={playlist.cover} alt={playlist.title} />
                      <span className="explore-card__play">
                        <FontAwesomeIcon icon={faPlay} />
                      </span>
                    </button>
                    <div className="explore-card__body">
                      <div>
                        <h3>{playlist.title}</h3>
                        <p>{playlist.type || 'Playlist'}</p>
                      </div>
                      <span className="explore-card__meta">
                        {playlist.trackCount} faixa(s)
                      </span>
                    </div>
                  </article>
                ))
              ) : (
                <div className="explore-empty explore-empty--wide">
                  <p>Nenhuma playlist encontrada.</p>
                </div>
              )}
            </div>
          </section>

          <section className="explore-section">
            <div className="explore-section__header">
              <FontAwesomeIcon icon={faMusic} />
              <div>
                <h2>Músicas para tocar agora</h2>
                <p>Resultados filtrados pelo que você pesquisou.</p>
              </div>
            </div>

            <div className="explore-track-list">
              {featuredTracks.length > 0 ? (
                featuredTracks.slice(0, 8).map((music) => (
                  <button
                    key={music.id}
                    type="button"
                    className="explore-track"
                    onClick={() => handlePlayTrack(music)}
                  >
                    <span className="explore-track__icon">
                      <FontAwesomeIcon icon={faHeadphones} />
                    </span>
                    <span className="explore-track__meta">
                      <strong>{music.nome}</strong>
                      <span>{music.cantor}</span>
                    </span>
                    <span className="explore-track__action">Ouvir</span>
                  </button>
                ))
              ) : (
                <div className="explore-empty explore-empty--wide">
                  <p>Nenhuma faixa corresponde ao filtro atual.</p>
                </div>
              )}
            </div>
          </section>

          <section className="explore-section">
            <div className="explore-section__header">
              <FontAwesomeIcon icon={faRadio} />
              <div>
                <h2>Mais vistos</h2>
                <p>Uma vitrine simples do que já existe para navegação rápida.</p>
              </div>
            </div>

            <div className="explore-mini-grid">
              {topPlaylists.map((playlist) => (
                <button
                  key={playlist.id}
                  type="button"
                  className="explore-mini-card"
                  onClick={() => handlePlayPlaylist(playlist)}
                >
                  <img src={playlist.cover} alt={playlist.title} />
                  <span>{playlist.title}</span>
                </button>
              ))}
            </div>
          </section>
        </>
      )}
    </section>
  );
}

export default Explorar;
