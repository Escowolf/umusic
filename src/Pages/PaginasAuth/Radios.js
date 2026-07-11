import { useMemo, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRadio, faPlay, faSpinner } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';
import { usePlayer } from '../../contexts/PlayerContext';
import { radiosMock } from '../../data/discoveryContent';
import '../css/DiscoveryPages.css';

function Radios() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [loading] = useState(false);
  const [error] = useState('');
  const { playTrack, currentTrack, playbackSource } = usePlayer();

  const categories = ['all', 'Música', 'Notícias', 'Esportes', 'Cultura', 'Comunitária'];

  const filteredRadios = useMemo(() => {
    const query = search.trim().toLowerCase();
    return radiosMock.filter((radio) => {
      const matchesSearch = !query || `${radio.name} ${radio.city} ${radio.description}`.toLowerCase().includes(query);
      const matchesCategory = category === 'all' || radio.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [category, search]);

  const handlePlayRadio = (radio) => {
    playTrack(
      {
        id: radio.id,
        nome: radio.name,
        cantor: `${radio.category} · ${radio.city}`,
        arquivo: radio.src,
        isLive: true,
      },
      { type: 'radio', id: radio.id, name: radio.name }
    );
    toast.success('Rádio ao vivo carregada.');
  };

  return (
    <section className="discovery-page">
      <header className="discovery-hero">
        <div className="discovery-hero__icon">
          <FontAwesomeIcon icon={faRadio} />
        </div>
        <div className="discovery-hero__content">
          <p className="discovery-hero__eyebrow">Rádios</p>
          <h1>Ouça estações ao vivo por categoria.</h1>
          <p>Selecione uma estação e ouça ao vivo no player global.</p>
        </div>
      </header>

      <div className="discovery-toolbar">
        <input className="discovery-search" placeholder="Buscar rádio" value={search} onChange={(e) => setSearch(e.target.value)} />
        <select className="discovery-select" value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((item) => <option key={item} value={item}>{item === 'all' ? 'Todas as categorias' : item}</option>)}
        </select>
      </div>

      {error ? <div className="discovery-empty">{error}</div> : null}

      {loading ? (
        <div className="discovery-loading"><FontAwesomeIcon icon={faSpinner} spin /> <span>Carregando rádios...</span></div>
      ) : filteredRadios.length > 0 ? (
        <div className="discovery-grid">
          {filteredRadios.map((radio) => {
            const isActive = currentTrack?.src === radio.src && playbackSource?.type === 'radio' && playbackSource?.id === String(radio.id);
            return (
              <article key={radio.id} className={`discovery-card ${isActive ? 'is-active' : ''}`}>
                <img src={radio.logo} alt={radio.name} />
                <div className="discovery-card__body">
                  <h3>{radio.name}</h3>
                  <p>{radio.category} · {radio.city}</p>
                  <span className="discovery-card__meta">{radio.live ? 'Ao vivo' : 'Offline'}</span>
                  <div className="discovery-card__actions">
                    <button type="button" className="btn" onClick={() => handlePlayRadio(radio)}>
                      <FontAwesomeIcon icon={faPlay} /> Ouvir
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="discovery-empty">
          <p>Nenhuma rádio disponível no momento.</p>
        </div>
      )}
    </section>
  );
}

export default Radios;
