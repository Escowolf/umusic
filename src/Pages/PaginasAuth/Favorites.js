import { useMemo, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic, faPlay, faTrash, faSpinner } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';
import { usePlayer } from '../../contexts/PlayerContext';
import { favoritesMock, podcastsMock } from '../../data/discoveryContent';
import '../css/DiscoveryPages.css';

const tabs = [
  { id: 'musicas', label: 'Músicas' },
  { id: 'playlists', label: 'Playlists' },
  { id: 'podcasts', label: 'Podcasts' },
  { id: 'radios', label: 'Rádios' },
];

function Favorites() {
  const [activeTab, setActiveTab] = useState('musicas');
  const [favorites, setFavorites] = useState(favoritesMock);
  const [loading] = useState(false);
  const [error] = useState('');
  const { playTrack, playPlaylist } = usePlayer();

  const emptyLabel = useMemo(() => {
    const current = tabs.find((tab) => tab.id === activeTab);
    return current ? current.label.toLowerCase() : 'músicas';
  }, [activeTab]);

  const handleRemove = (type, id) => {
    const confirmed = window.confirm('Remover dos favoritos?');
    if (!confirmed) return;

    setFavorites((current) => ({
      ...current,
      [type]: current[type].filter((item) => String(item.id) !== String(id)),
    }));
    toast.success('Favorito removido.');
  };

  const handlePlayMusic = (music) => playTrack(music, { type: 'single' });
  const handlePlayPlaylist = (playlist) => playPlaylist({ playlistId: playlist.id, playlistName: playlist.nome, tracks: playlist.musicas, startIndex: 0 });
  const handlePlayPodcast = (podcast) => {
    const firstEpisode = podcastsMock.find((item) => item.id === podcast.id)?.episodes?.[0];
    if (!firstEpisode) return;
    playTrack({ id: firstEpisode.id, nome: firstEpisode.title, cantor: podcast.name, arquivo: firstEpisode.src }, { type: 'podcast', id: podcast.id, name: podcast.name });
  };
  const handlePlayRadio = (radio) => playTrack({ id: radio.id, nome: radio.name, cantor: radio.category, arquivo: '/music/SUNNY/Scott Holmes Music - We Are One.mp3', isLive: true }, { type: 'radio', id: radio.id, name: radio.name });

  return (
    <section className="discovery-page">
      <header className="discovery-hero">
        <div className="discovery-hero__icon">
          <FontAwesomeIcon icon={faMusic} />
        </div>
        <div className="discovery-hero__content">
          <p className="discovery-hero__eyebrow">Favoritos</p>
          <h1>Seus conteúdos salvos em um só lugar.</h1>
          <p>Organizado por tipo, com ações simples e atualização imediata na tela.</p>
        </div>
      </header>

      <div className="tabs-bar">
        {tabs.map((tab) => (
          <button key={tab.id} type="button" className={`tab-btn ${activeTab === tab.id ? 'is-active' : ''}`} onClick={() => setActiveTab(tab.id)}>
            {tab.label}
          </button>
        ))}
      </div>

      {error ? <div className="discovery-empty">{error}</div> : null}

      {loading ? (
        <div className="discovery-loading"><FontAwesomeIcon icon={faSpinner} spin /> <span>Carregando favoritos...</span></div>
      ) : (
        <>
          {activeTab === 'musicas' && (
            <div className="favorites-list">
              {favorites.musicas.length > 0 ? favorites.musicas.map((music, index) => (
                <article key={music.id} className="favorites-music">
                  <strong>{String(index + 1).padStart(2, '0')}</strong>
                  <div>
                    <strong>{music.nome}</strong>
                    <p className="muted">{music.cantor}</p>
                  </div>
                  <div className="favorites-actions">
                    <button type="button" className="btn" onClick={() => handlePlayMusic(music)}><FontAwesomeIcon icon={faPlay} /> Ouvir</button>
                    <button type="button" className="btn btn--ghost" onClick={() => handleRemove('musicas', music.id)}><FontAwesomeIcon icon={faTrash} /> Remover</button>
                  </div>
                </article>
              )) : <div className="discovery-empty"><p>Você ainda não adicionou músicas aos favoritos.</p></div>}
            </div>
          )}

          {activeTab === 'playlists' && (
            <div className="discovery-grid">
              {favorites.playlists.length > 0 ? favorites.playlists.map((playlist) => (
                <article key={playlist.id} className="discovery-card">
                  <img src={playlist.capa} alt={playlist.nome} />
                  <div className="discovery-card__body">
                    <h3>{playlist.nome}</h3>
                    <span className="discovery-card__meta">{playlist.musicas.length} música(s)</span>
                    <div className="favorites-actions">
                      <button type="button" className="btn" onClick={() => handlePlayPlaylist(playlist)}>Abrir</button>
                      <button type="button" className="btn btn--ghost" onClick={() => handleRemove('playlists', playlist.id)}><FontAwesomeIcon icon={faTrash} /> Remover</button>
                    </div>
                  </div>
                </article>
              )) : <div className="discovery-empty"><p>Você ainda não adicionou playlists aos favoritos.</p></div>}
            </div>
          )}

          {activeTab === 'podcasts' && (
            <div className="discovery-grid">
              {favorites.podcasts.length > 0 ? favorites.podcasts.map((podcast) => (
                <article key={podcast.id} className="discovery-card">
                  <img src={podcast.cover} alt={podcast.name} />
                  <div className="discovery-card__body">
                    <h3>{podcast.name}</h3>
                    <p>{podcast.author}</p>
                    <div className="favorites-actions">
                      <button type="button" className="btn" onClick={() => handlePlayPodcast(podcast)}>Ver episódios</button>
                      <button type="button" className="btn btn--ghost" onClick={() => handleRemove('podcasts', podcast.id)}><FontAwesomeIcon icon={faTrash} /> Remover</button>
                    </div>
                  </div>
                </article>
              )) : <div className="discovery-empty"><p>Você ainda não adicionou podcasts aos favoritos.</p></div>}
            </div>
          )}

          {activeTab === 'radios' && (
            <div className="discovery-grid">
              {favorites.radios.length > 0 ? favorites.radios.map((radio) => (
                <article key={radio.id} className="discovery-card">
                  <img src={radio.logo} alt={radio.name} />
                  <div className="discovery-card__body">
                    <h3>{radio.name}</h3>
                    <p>{radio.category}</p>
                    <div className="favorites-actions">
                      <button type="button" className="btn" onClick={() => handlePlayRadio(radio)}>Ouvir</button>
                      <button type="button" className="btn btn--ghost" onClick={() => handleRemove('radios', radio.id)}><FontAwesomeIcon icon={faTrash} /> Remover</button>
                    </div>
                  </div>
                </article>
              )) : <div className="discovery-empty"><p>Você ainda não adicionou rádios aos favoritos.</p></div>}
            </div>
          )}
        </>
      )}

      <p className="muted">Conteúdo disponível para a aba {emptyLabel}.</p>
    </section>
  );
}

export default Favorites;
