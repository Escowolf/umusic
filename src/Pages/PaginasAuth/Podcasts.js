import { useMemo, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeadphones, faSpinner } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';
import { usePlayer } from '../../contexts/PlayerContext';
import { podcastsMock } from '../../data/discoveryContent';
import '../css/DiscoveryPages.css';

function Podcasts() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [selectedPodcast, setSelectedPodcast] = useState(null);
  const [loading] = useState(false);
  const [error] = useState('');
  const { playTrack } = usePlayer();

  const categories = ['all', ...new Set(podcastsMock.map((podcast) => podcast.category))];

  const filteredPodcasts = useMemo(() => {
    const query = search.trim().toLowerCase();
    return podcastsMock.filter((podcast) => {
      const matchesSearch =
        !query ||
        `${podcast.name} ${podcast.author} ${podcast.episodes.map((episode) => episode.title).join(' ')}`.toLowerCase().includes(query);
      const matchesCategory = category === 'all' || podcast.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [category, search]);

  const handlePlayEpisode = (podcast, episode) => {
    playTrack(
      {
        id: episode.id,
        nome: episode.title,
        cantor: podcast.name,
        arquivo: episode.src,
      },
      { type: 'podcast', id: podcast.id, name: podcast.name }
    );
    toast.success('Episódio carregado no player.');
  };

  if (selectedPodcast) {
    return (
      <section className="discovery-page">
        <header className="discovery-hero">
          <div className="discovery-hero__icon">
            <FontAwesomeIcon icon={faHeadphones} />
          </div>
          <div className="discovery-hero__content">
            <p className="discovery-hero__eyebrow">Podcasts</p>
            <h1>{selectedPodcast.name}</h1>
            <p>{selectedPodcast.author}</p>
            <p>{selectedPodcast.description}</p>
            <div className="discovery-card__actions">
              <button type="button" className="btn">Seguir</button>
              <button type="button" className="btn btn--ghost" onClick={() => setSelectedPodcast(null)}>Voltar</button>
            </div>
          </div>
        </header>

        <section className="discovery-section">
          <div className="section-title">
            <div>
              <h2>Episódios</h2>
              <p>Abra um episódio para tocar no player global.</p>
            </div>
          </div>
          <div className="favorites-list">
            {selectedPodcast.episodes.map((episode) => (
              <article key={episode.id} className="favorites-episode">
                <strong>{episode.title}</strong>
                <p className="muted">{episode.date} · {episode.duration}</p>
                <p>{episode.description}</p>
                <div className="episode-actions">
                  <button type="button" className="btn" onClick={() => handlePlayEpisode(selectedPodcast, episode)}>Ouvir</button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </section>
    );
  }

  return (
    <section className="discovery-page">
      <header className="discovery-hero">
        <div className="discovery-hero__icon">
          <FontAwesomeIcon icon={faHeadphones} />
        </div>
        <div className="discovery-hero__content">
          <p className="discovery-hero__eyebrow">Podcasts</p>
          <h1>Encontre programas e episódios para ouvir.</h1>
          <p>Selecione um programa, explore os episódios e ouça no player global.</p>
        </div>
      </header>

      <div className="discovery-toolbar">
        <input className="discovery-search" placeholder="Buscar podcasts ou episódios" value={search} onChange={(e) => setSearch(e.target.value)} />
        <select className="discovery-select" value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((item) => <option key={item} value={item}>{item === 'all' ? 'Todas as categorias' : item}</option>)}
        </select>
      </div>

      {error ? <div className="discovery-empty">{error}</div> : null}

      {loading ? (
        <div className="discovery-loading"><FontAwesomeIcon icon={faSpinner} spin /> <span>Carregando podcasts...</span></div>
      ) : filteredPodcasts.length > 0 ? (
        <div className="discovery-grid">
          {filteredPodcasts.map((podcast) => (
            <article key={podcast.id} className="discovery-card">
              <img src={podcast.cover} alt={podcast.name} />
              <div className="discovery-card__body">
                <h3>{podcast.name}</h3>
                <p>{podcast.author}</p>
                <span className="discovery-card__meta">{podcast.episodes.length} episódio(s)</span>
                <div className="discovery-card__actions">
                  <button type="button" className="btn" onClick={() => setSelectedPodcast(podcast)}>Ver episódios</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="discovery-empty">
          <p>Nenhum podcast encontrado. Tente alterar sua busca ou categoria.</p>
        </div>
      )}
    </section>
  );
}

export default Podcasts;
