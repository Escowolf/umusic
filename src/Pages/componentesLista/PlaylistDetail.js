import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import '../css/PlaylistDetail.css'

function PlaylistDetail() {
  const [playlistSelecionada, setPlaylistSelecionada] = useState({musicas: []});
  const { _id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:4000/playlists/${_id}`)
        .then((res) => {
          console.log(res.data)
          setPlaylistSelecionada(res.data)
        });
  }, [])

const musicas = playlistSelecionada?.musicas.map((playDados)=>{
return(

<li className="lista">
  <hr/>
  <p className="titleOff">{playDados.nome} <p className="text-muted">{playDados.cantor}</p>
    <audio controls>
      <source src={playDados.arquivo} type="audio/mpeg" />
      </audio>
  </p>
</li>
)
});

return (
<div className="container">
  <div className="header" style={{ backgroundImage: `url(${playlistSelecionada.capa})`, height: '100vh', backgroundRepeat: 'no-repeat',  backgroundSize: 'cover', backgroundPosition: 'center'}}>
  <div className="Reorder">
  <p className="playTitle">
    <img className="item-resize" src={playlistSelecionada.capa} alt="Capa do álbum"/>
  {playlistSelecionada.nome}</p>
</div>
  </div>
  <div className="content">
  <br/><br/>
    {musicas}
  </div>
  <br/><br/>
</div>  
);

}


export default PlaylistDetail;