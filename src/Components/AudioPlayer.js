import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackwardStep, faForwardStep, faPause, faPlay, faRepeat } from '@fortawesome/free-solid-svg-icons';
import { usePlayer } from '../contexts/PlayerContext';
import './AudioPlayer.css';

function AudioPlayer({ compact = false }) {
  const {
    currentTrack,
    playbackSource,
    isPlaying,
    repeatMode,
    queue,
    currentIndex,
    currentTime,
    duration,
    playPrevious,
    playNext,
    toggleRepeatTrack,
    togglePlayPause,
    seek,
  } = usePlayer();

  if (!currentTrack) {
    return null;
  }

  const formatTime = (value) => {
    if (!Number.isFinite(value) || value < 0) {
      return '0:00';
    }

    const minutes = Math.floor(value / 60);
    const seconds = Math.floor(value % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const handleProgressChange = (event) => {
    const newTime = (Number(event.target.value) / 100) * (duration || 0);
    seek(newTime);
  };

  const handleToggle = (event) => {
    event.stopPropagation();
    togglePlayPause();
  };

  const hasPreviousTrack = queue.length > 0 && currentIndex > 0;
  const hasNextTrack = queue.length > 0 && currentIndex < queue.length - 1;

  return (
    <div
      className={`audio-player ${compact ? 'audio-player--compact' : 'audio-player--full'}`}
      aria-label={`Player de ${currentTrack.musicname}`}
    >
      <div className="music-info">
        {playbackSource?.type === 'playlist' ? (
          <span className="audio-player__source">Playlist · {playbackSource.name}</span>
        ) : (
          <span className="audio-player__eyebrow">Tocando agora</span>
        )}
        <p className="playlist-song">{currentTrack.musicname}</p>
        <p className="playlist-artist">{currentTrack.artist}</p>
      </div>

      <div className="audio-player__timeline">
        <div className="progress-container">
          <input
            aria-label="Progresso da música"
            type="range"
            min="0"
            max="100"
            value={duration > 0 ? (currentTime / duration) * 100 : 0}
            onChange={handleProgressChange}
          />
        </div>

        <div className="time">
          <span>{formatTime(currentTime)}</span>
          <span className="time__separator" aria-hidden="true">/</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <div className="navbar-player__controls">
        <button
          type="button"
          onClick={playPrevious}
          aria-label="Música anterior"
          className="navbar-player__icon-button"
          disabled={!hasPreviousTrack}
        >
          <FontAwesomeIcon icon={faBackwardStep} />
        </button>

        <button
          type="button"
          className="audio-player__toggle navbar-player__primary-control"
          onClick={handleToggle}
          aria-label={isPlaying ? 'Pausar música' : 'Reproduzir música'}
        >
          <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
        </button>

        <button
          type="button"
          onClick={playNext}
          aria-label="Próxima música"
          className="navbar-player__icon-button"
          disabled={!hasNextTrack}
        >
          <FontAwesomeIcon icon={faForwardStep} />
        </button>

        <button
          type="button"
          onClick={toggleRepeatTrack}
          aria-label={repeatMode === 'track' ? 'Desativar repetição da música' : 'Repetir música atual'}
          aria-pressed={repeatMode === 'track'}
          className={`navbar-player__icon-button ${repeatMode === 'track' ? 'is-active' : ''}`}
        >
          <FontAwesomeIcon icon={faRepeat} />
        </button>
      </div>
    </div>
  );
}

export default AudioPlayer;
