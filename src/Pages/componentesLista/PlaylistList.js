import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../css/PlaylistList.css';

function PlaylistList() {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/playlists')
    .then((res)=> setPlaylists(res.data))
  }, []); 

  const res = playlists.map((playDados) => {
    return(
      <li>
        <Link to={`/playlists/${playDados._id}`}>
            <img className="item" src={playDados.capa} alt="Capa do álbum"/>
        </Link>
      </li>
    )
  })

    return (
      <div className="background">
      <div className="container">
        <h1>Playlists</h1>
        <center><h2>O que vamos ouvir hoje?</h2></center>
        
        <ul className="flex-container">
        
          {res}
        </ul>
      </div>
      </div>
      )
}

export default PlaylistList;