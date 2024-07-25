import React from 'react';
import ReactAudioPlayer from 'react-audio-player';
import Image from '../favicon.optimized.svg'
import './ListItem.css'; 

const ListItem = ({ nome, arquivo, cantor }) => (
    <div className="item-container">
        <img
            className="thumbnail"
            src={Image}
            alt="Capa do Álbum"
        />
        <div>
            <div className="title-pane">{nome}</div>
            <div className="cantor-pane">{cantor}</div>
            <ReactAudioPlayer
                src={arquivo}
                controls
                autoPlay={false}
            />
        </div>
    </div>
);

export default ListItem;
