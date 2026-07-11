import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import '../css/HomeUser.css';
import Navhome from '../../Components/Navegation/Navhome';

function HomeUser() {
  const [playlists, setPlaylists] = useState([]);
  const { currentUser } = useAuth();
  const [section, setSection] = useState('playlists');
  const [playlistView, setPlaylistView] = useState('grid');
  const [editingPlaylistId, setEditingPlaylistId] = useState(null);
  const [editForm, setEditForm] = useState({
    nome: '',
    type: 'Pública',
    capa: '',
  });

  const loadPlaylists = () => {
    axios
      .get("http://localhost:4000/playlists")
      .then((res) => setPlaylists(res.data))
      .catch(() => toast.error('Não foi possível carregar as playlists.'));
  };

  useEffect(() => {
    loadPlaylists();
  }, []);

  function startEditPlaylist(playlist) {
    setEditingPlaylistId(playlist.id);
    setEditForm({
      nome: playlist.nome || playlist.name || '',
      type: playlist.type || 'Pública',
      capa: playlist.capa || playlist.cover || '',
    });
  }

  function cancelEditPlaylist() {
    setEditingPlaylistId(null);
    setEditForm({
      nome: '',
      type: 'Pública',
      capa: '',
    });
  }

  function handleEditChange(event) {
    const { name, value } = event.target;
    setEditForm((current) => ({ ...current, [name]: value }));
  }

  function savePlaylistChanges(playlistId) {
    const playlistToUpdate = playlists.find((playlist) => playlist.id === playlistId);
    const updatedPlaylist = {
      ...playlistToUpdate,
      nome: editForm.nome.trim(),
      name: editForm.nome.trim(),
      type: editForm.type,
      capa: editForm.capa.trim(),
      cover: editForm.capa.trim(),
    };

    axios
      .put(`http://localhost:4000/playlists/${playlistId}`, updatedPlaylist)
      .then(() => {
        toast.success('Playlist atualizada.');
        cancelEditPlaylist();
        loadPlaylists();
      })
      .catch(() => toast.error('Não foi possível atualizar a playlist.'));
  }

  function deletePlaylist(playlistId) {
    const confirmed = window.confirm('Tem certeza que deseja excluir esta playlist?');
    if (!confirmed) return;

    axios
      .delete(`http://localhost:4000/playlists/${playlistId}`)
      .then(() => {
        toast.success('Playlist excluída.');
        loadPlaylists();
      })
      .catch(() => toast.error('Não foi possível excluir a playlist.'));
  }

  const renderSection = () => {
    switch (section) {
      case 'destaques':
        return <div>Destaques Content</div>;
      case 'mais-queridas':
        return <div>Mais Queridas Content</div>;
      case 'playlists':
        return (
          <div className='playlist-section'>
            <div className="playlist-toolbar">
              <div className="playlist-view-switch">
                <button
                  type="button"
                  className={playlistView === 'grid' ? 'view-button is-active' : 'view-button'}
                  onClick={() => setPlaylistView('grid')}
                >
                  Grade
                </button>
                <button
                  type="button"
                  className={playlistView === 'list' ? 'view-button is-active' : 'view-button'}
                  onClick={() => setPlaylistView('list')}
                >
                  Lista
                </button>
              </div>
              <Link to={'/newplaylist'} className='btn-new' ><i className='fa-solid fa-plus' /></Link>
            </div>

            <div className={playlistView === 'grid' ? 'playlist-data playlist-data--grid' : 'playlist-data playlist-data--list'}>
              {playlists.map((playDados) => {
                const isEditing = editingPlaylistId === playDados.id;
                const privacyValue = playDados.type || 'Pública';

                if (playlistView === 'list') {
                  return (
                    <div key={playDados.id} className="playlist-row">
                      <Link to={`/playlists/${playDados.id}`} className='playlist-row-image'>
                        <img
                          className="playlist-image"
                          src={playDados.capa}
                          alt="Capa do álbum"
                        />
                      </Link>

                      <div className="playlist-row-content">
                        {isEditing ? (
                          <div className="playlist-edit-form">
                            <input
                              name="nome"
                              className="form-control playlist-edit-input"
                              value={editForm.nome}
                              onChange={handleEditChange}
                              placeholder="Nome da playlist"
                            />
                            <select
                              name="type"
                              className="form-control playlist-edit-input"
                              value={editForm.type}
                              onChange={handleEditChange}
                            >
                              <option value="Pública">Pública</option>
                              <option value="Privada">Privada</option>
                            </select>
                            <input
                              name="capa"
                              className="form-control playlist-edit-input"
                              value={editForm.capa}
                              onChange={handleEditChange}
                              placeholder="URL da capa"
                            />
                          </div>
                        ) : (
                          <div className="playlist-row-text">
                            <Link to={`/playlists/${playDados.id}`} className="playlist-row-title">
                              {playDados.nome}
                            </Link>
                            <span className="playlist-privacy playlist-privacy--dark">
                              {privacyValue}
                            </span>
                          </div>
                        )}

                        <div className="playlist-row-actions">
                          {isEditing ? (
                            <>
                              <button
                                type="button"
                                className="playlist-action-button"
                                onClick={() => savePlaylistChanges(playDados.id)}
                              >
                                Salvar
                              </button>
                              <button
                                type="button"
                                className="playlist-action-button is-secondary"
                                onClick={cancelEditPlaylist}
                              >
                                Cancelar
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                type="button"
                                className="playlist-action-button"
                                onClick={() => startEditPlaylist(playDados)}
                              >
                                Editar
                              </button>
                              <button
                                type="button"
                                className="playlist-action-button is-danger"
                                onClick={() => deletePlaylist(playDados.id)}
                              >
                                Excluir
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <li key={playDados.id} className="playlist-item">
                    <Link to={`/playlists/${playDados.id}`} className='playlist-link'>
                      <img
                        className="playlist-image"
                        src={playDados.capa}
                        alt="Capa do álbum"
                      />
                      <span className="playlist-overlay">
                        <strong className="playlist-title">{playDados.nome}</strong>
                        <span className="playlist-privacy">
                          {privacyValue}
                        </span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </div>
          </div>
        );
      case 'albuns':
        return <div>Álbuns Content</div>;
      case 'artistas':
        return <div>Artistas Content</div>;
      case 'historico':
        return <div>Histórico Content</div>;
      case 'podcasts':
        return <div>Podcasts Content</div>;
      case 'mais':
        return <div>Mais Content</div>;
      default:
        return <div>Destaques Content</div>;
    }
  };

  return (
    <>
      <div className='home-container'>
        <div className='data-user'>
          <img
            src={currentUser?.user_photo}
            className="home-photo"
            alt=""
          />
          <div className='home-text-container'>
            <h2 className='home-name'>
              {currentUser?.nome}
            </h2>
            <p className="home-follow-data">{currentUser?.seguidores} seguidores - {currentUser?.seguindo} seguindo</p>
          </div>
        </div>
        <div className="home-tabs">
          <Navhome setSection={setSection} section={section} />
        </div>
      </div>
      <div className="home-content">
        {renderSection()}
      </div>
    </>
  );
}

export default HomeUser;
