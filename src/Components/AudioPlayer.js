import React, { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import './AudioPlayer.css';

function AudioPlayer({ src, musicname, artist }) {
    const audioRef = useRef(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const audio = audioRef.current;

        const updateTime = () => {
            setCurrentTime(audio.currentTime);
        };

        const updateDuration = () => {
            setDuration(audio.duration);
        };

        audio.addEventListener('timeupdate', updateTime);
        audio.addEventListener('loadedmetadata', updateDuration);

        return () => {
            audio.removeEventListener('timeupdate', updateTime);
            audio.removeEventListener('loadedmetadata', updateDuration);
        };
    }, []);

    const play = () => {
        audioRef.current.play();
        setIsPlaying(true);
    };

    const pause = () => {
        audioRef.current.pause();
        setIsPlaying(false);
    };

    const handleProgressChange = (e) => {
        const newTime = (e.target.value / 100) * duration;
        audioRef.current.currentTime = newTime;
        setCurrentTime(newTime);
    };

    return (
        <div className="audio-player">
            <div className='music-info'>
                <p className='playlist-song'>{musicname}</p>
                <p className='playlist-artist'>{artist}</p>
            </div>
            <div className='row'>
                <audio ref={audioRef}>
                    <source src={src} type="audio/mpeg" />
                </audio>
                <button onClick={isPlaying ? pause : play}>
                    <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
                </button>
                <div className="progress-container">
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={(currentTime / duration) * 100 || 0}
                        onChange={handleProgressChange}
                    />
                </div>
                <div className="time">
                    <span>{Math.floor(currentTime / 60)}:{('0' + Math.floor(currentTime % 60)).slice(-2)}</span> /
                    <span>{Math.floor(duration / 60)}:{('0' + Math.floor(duration % 60)).slice(-2)}</span>
                </div>
            </div>
        </div>
    );
}

export default AudioPlayer;
