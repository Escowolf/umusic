import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FalseToken from '../../api/falseToken';
import axios from 'axios';
import './PlayUser.css';

function PlayUser(){
  <FalseToken/>
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/playlists')
    .then((res)=> setPlaylists(res.data))
  }, []); 

  const res = playlists.map((playDados) => {
    return(
      <li>
        <Link to={`/playlists/${playDados._id}`}>
            <img className="itemNew" id="dados" src={playDados.capa} alt="Capa do álbum"/>
        </Link>
      </li>
    )
  })

    return (
      <>
      <div className='PlaylistsContent'>
        <h1>Playlists</h1>
        <small className="text-muted"><Link id="link" to="/newplaylist"><h2 className='sub'>+ Nova Playlist</h2></Link></small>
        <ul className="conteudo">
          {res}
          </ul>
      </div>
          </>
    )
}

export default PlayUser;