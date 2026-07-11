import React, { useEffect, useState } from 'react';
import '../css/CreatePlaylist.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMusic, faImage } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import toast from 'react-hot-toast';

function CreatePlaylist() {
    const [playlistName, setPlaylistName] = useState('');
    const [coverImage, setCoverImage] = useState('');
    const [coverPreview, setCoverPreview] = useState('');
    const [musicas, setMusicas] = useState([]);
    const [selectedMusicIds, setSelectedMusicIds] = useState([]);
    const [creationDate] = useState(new Date().toISOString().split('T')[0]);

    useEffect(() => {
        axios.get("http://localhost:4000/musicas")
            .then((response) => setMusicas(response.data))
            .catch((error) => {
                console.error("Error loading music list:", error);
                toast.error("Não foi possível carregar as músicas.");
            });
    }, []);

    function handleCreatePlaylist(event) {
        event.preventDefault();

        const selectedMusics = musicas.filter((music) => selectedMusicIds.includes(String(music.id)));
        const newPlaylist = {
            nome: playlistName,
            name: playlistName,
            capa: coverImage,
            cover: coverImage,
            created_at: creationDate,
            musicas: selectedMusics
        };

        axios.post("http://localhost:4000/playlists", newPlaylist)
            .then((response) => {
                console.log("Playlist created successfully:", response.data);
                toast.success("Playlist criada com sucesso.");
                setPlaylistName('');
                setCoverImage('');
                setCoverPreview('');
                setSelectedMusicIds([]);
            })
            .catch((error) => {
                console.error("Error creating playlist:", error);
                toast.error("Não foi possível criar a playlist.");
            });
    }

    function handleNameChange(event) {
        setPlaylistName(event.target.value);
    }

    function handleCoverChange(event) {
        const file = event.target.files?.[0];

        if (!file) {
            setCoverImage('');
            setCoverPreview('');
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            const result = String(reader.result || '');
            setCoverImage(result);
            setCoverPreview(result);
        };
        reader.readAsDataURL(file);
    }

    function handleMusicToggle(musicId) {
        setSelectedMusicIds((current) => (
            current.includes(musicId)
                ? current.filter((id) => id !== musicId)
                : [...current, musicId]
        ));
    }

    return (
        <div className="create-playlist-header">
            <form onSubmit={handleCreatePlaylist} className="create-playlist-form">
                <div className="create-playlist-intro">
                    <p className="create-playlist-eyebrow">Nova playlist</p>
                    <h1>Monte tudo na mesma página</h1>
                    <p>Escolha um nome, faça upload da foto se quiser e marque as músicas agora.</p>
                </div>
                <div className="create-playlist-grid">
                    <label className="create-playlist-field">
                        <span className="form-label">Nome da playlist</span>
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Ex.: Chilling no pôr do sol"
                            aria-label="Nome da playlist"
                            value={playlistName}
                            onChange={handleNameChange}
                            required
                        />
                    </label>
                    <label className="create-playlist-field">
                        <span className="form-label">Foto da playlist</span>
                        <div className="upload-box">
                            <FontAwesomeIcon icon={faImage} />
                            <span>Enviar imagem opcional</span>
                        </div>
                        <input
                            className="form-control form-control-file"
                            type="file"
                            accept="image/*"
                            aria-label="Foto da playlist"
                            onChange={handleCoverChange}
                        />
                    </label>
                </div>

                {coverPreview && (
                    <div className="cover-preview">
                        <img src={coverPreview} alt="Prévia da capa da playlist" />
                    </div>
                )}

                <section className="music-picker">
                    <div className="music-picker-header">
                        <FontAwesomeIcon icon={faMusic} />
                        <div>
                            <h2>Músicas da playlist</h2>
                            <p>Selecione as faixas que devem entrar agora.</p>
                        </div>
                    </div>
                    <div className="music-list">
                        {musicas.map((music) => {
                            const musicId = String(music.id);
                            const checked = selectedMusicIds.includes(musicId);

                            return (
                                <label key={musicId} className={`music-card ${checked ? 'is-selected' : ''}`}>
                                    <input
                                        type="checkbox"
                                        checked={checked}
                                        onChange={() => handleMusicToggle(musicId)}
                                    />
                                    <div>
                                        <strong>{music.nome}</strong>
                                        <span>{music.cantor}</span>
                                    </div>
                                </label>
                            );
                        })}
                    </div>
                </section>

                <button type="submit" className="button">
                    <FontAwesomeIcon icon={faPlus} />
                    Criar playlist
                </button>
            </form>
        </div>
    );
}

export default CreatePlaylist;
