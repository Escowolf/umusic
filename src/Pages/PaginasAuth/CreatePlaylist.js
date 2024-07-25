import React, { useState } from 'react';
import './CreatePlaylist.css'; // Ajuste o CSS conforme necessário
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreatePlaylist() {
    const [playlistName, setPlaylistName] = useState('');
    const [coverImage, setCoverImage] = useState('');
    const [creationDate] = useState(new Date().toISOString().split('T')[0]);
    const navigate = useNavigate();

    function handleCreatePlaylist(event) {
        event.preventDefault();
        const newPlaylist = {
            name: playlistName,
            cover: coverImage,
            created_at: creationDate
        };
        axios.post("http://localhost:4000/playlists", newPlaylist)
            .then((response) => {
                console.log("Playlist created successfully:", response.data);
                const playlistId = response.data.id;
                navigate(`/select-music/${playlistId}`);
            })
            .catch((error) => {
                console.error("Error creating playlist:", error);
            });
    }

    function handleNameChange(event) {
        setPlaylistName(event.target.value);
    }

    function handleCoverChange(event) {
        setCoverImage(event.target.value);
    }

    return (
        <div className="create-playlist-header">
            <form onSubmit={handleCreatePlaylist}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Enter playlist name"
                        aria-label="Enter playlist name"
                        value={playlistName}
                        onChange={handleNameChange}
                        required
                    />
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Enter cover image URL"
                        aria-label="Enter cover image URL"
                        value={coverImage}
                        onChange={handleCoverChange}
                    />
                    <button type="submit" className="button">
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CreatePlaylist;
