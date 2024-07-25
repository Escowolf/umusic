import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";
import ListItem from "./ListItem";

const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background-color: black;
  padding-top: 3%;
`;

function SelectMusic() {
  const [musicas, setMusicas] = useState([]);
  const [playlistId, setPlaylistId] = useState(null);

  useEffect(() => {
    // Obtém o ID da playlist da URL
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    setPlaylistId(id);

    // Carrega as músicas disponíveis
    axios.get("http://localhost:4000/musicas").then((resp) => {
      setMusicas(resp.data);
    });
  }, []);

  function handleAddMusic(musicId) {
    if (playlistId) {
      axios.post(`http://localhost:4000/playlists/${playlistId}/musicas`, { musicId })
        .then(() => {
          console.log("Music added to playlist");
        })
        .catch((error) => {
          console.error("Error adding music to playlist:", error);
        });
    }
  }

  return (
    <div className="SelectMusic">
      <h1 className="select-music-title">Select Music for Playlist</h1>
      <ListContainer>
        {musicas.map((m) => (
          <ListItem
            key={m.id}
            nome={m.nome}
            image={m.image}
            artista={m.cantor}
            arquivo={m.arquivo}
            onAdd={() => handleAddMusic(m.id)} // Passa a função para o componente ListItem
          />
        ))}
      </ListContainer>
    </div>
  );
}

export default SelectMusic;
