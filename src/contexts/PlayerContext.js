import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

const PlayerContext = createContext(null);

const STORAGE_KEY = 'umusic-player-state';

function formatTrack(track) {
  if (!track) return null;
  return {
    ...track,
    src: track.src || track.arquivo || '',
    musicname: track.musicname || track.nome || 'Música sem título',
    artist: track.artist || track.cantor || 'Artista não informado',
  };
}

function formatPlaybackSource(source) {
  if (!source) return null;
  if (source.type === 'single') return { type: 'single' };
  if (!source.type || !source.id || !source.name) return null;
  return {
    type: source.type,
    id: String(source.id),
    name: source.name,
  };
}

function normalizeQueue(tracks) {
  return Array.isArray(tracks) ? tracks.map(formatTrack).filter((track) => track?.src) : [];
}

export function PlayerProvider({ children }) {
  const audioRef = useRef(null);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [playbackSource, setPlaybackSource] = useState(null);
  const [queue, setQueue] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [repeatMode, setRepeatMode] = useState('off');
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(1);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (!stored) return;
      const parsed = JSON.parse(stored);
      if (parsed?.currentTrack) setCurrentTrack(formatTrack(parsed.currentTrack));
      if (parsed?.playbackSource) setPlaybackSource(formatPlaybackSource(parsed.playbackSource));
      if (Array.isArray(parsed?.queue)) setQueue(parsed.queue.map(formatTrack).filter(Boolean));
      if (Number.isInteger(parsed?.currentIndex)) setCurrentIndex(parsed.currentIndex);
      if (parsed?.repeatMode === 'track' || parsed?.repeatMode === 'off') setRepeatMode(parsed.repeatMode);
      if (typeof parsed?.currentTime === 'number') setCurrentTime(parsed.currentTime);
      if (typeof parsed?.duration === 'number') setDuration(parsed.duration);
      if (typeof parsed?.volume === 'number') setVolumeState(parsed.volume);
      if (typeof parsed?.isPlaying === 'boolean') setIsPlaying(parsed.isPlaying);
    } catch {
      // Ignore invalid persisted state.
    } finally {
      setIsReady(true);
    }
  }, []);

  useEffect(() => {
    if (!isReady) return;
    sessionStorage.setItem(
      STORAGE_KEY,
        JSON.stringify({
          currentTrack,
          playbackSource,
          queue,
          currentIndex,
          repeatMode,
          currentTime,
          duration,
          volume,
        isPlaying,
      })
    );
  }, [currentTrack, playbackSource, queue, currentIndex, repeatMode, currentTime, duration, volume, isPlaying, isReady]);

  const loadAndPlayTrack = useCallback(async (track) => {
    const nextTrack = formatTrack(track);
    if (!nextTrack?.src) return false;

    const audio = audioRef.current;
    if (!audio) return false;

    if (audio.src !== nextTrack.src) {
      audio.src = nextTrack.src;
      audio.load();
    }

    try {
      await audio.play();
      return true;
    } catch {
      setIsPlaying(false);
      return false;
    }
  }, []);

  const playQueueTrack = useCallback(async (nextIndex) => {
    if (nextIndex < 0 || nextIndex >= queue.length) return false;
    const nextTrack = queue[nextIndex];
    if (!nextTrack) return false;

    setCurrentIndex(nextIndex);
    setCurrentTrack(nextTrack);
    setCurrentTime(0);
    setPlaybackSource((currentSource) => currentSource || { type: 'single' });

    const started = await loadAndPlayTrack(nextTrack);
    setIsPlaying(started);
    return started;
  }, [queue, loadAndPlayTrack]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack?.src) return;
    if (audio.src !== currentTrack.src) {
      audio.src = currentTrack.src;
      audio.load();
    }
  }, [currentTrack]);

  const playTrack = useCallback(async (track, source = null) => {
    const nextTrack = formatTrack(track);
    if (!nextTrack?.src) return;

    setCurrentTrack(nextTrack);
    setPlaybackSource(formatPlaybackSource(source) || { type: 'single' });
    setQueue([nextTrack]);
    setCurrentIndex(0);
    setCurrentTime(0);
    setRepeatMode('off');

    const started = await loadAndPlayTrack(nextTrack);
    setIsPlaying(started);
  }, [loadAndPlayTrack]);

  const playPlaylist = useCallback(async ({ playlistId, playlistName, tracks, startIndex = 0 }) => {
    const normalizedQueue = normalizeQueue(tracks);
    const nextTrack = normalizedQueue[startIndex];
    if (!nextTrack) return;

    setPlaybackSource({
      type: 'playlist',
      id: String(playlistId),
      name: playlistName,
    });
    setQueue(normalizedQueue);
    setCurrentIndex(startIndex);
    setCurrentTrack(nextTrack);
    setCurrentTime(0);
    setRepeatMode('off');

    const started = await loadAndPlayTrack(nextTrack);
    setIsPlaying(started);
  }, [loadAndPlayTrack]);

  const playNext = useCallback(async () => {
    if (!queue.length) return;
    const nextIndex = currentIndex + 1;
    if (nextIndex >= queue.length) {
      setIsPlaying(false);
      return;
    }
    await playQueueTrack(nextIndex);
  }, [queue.length, currentIndex, playQueueTrack]);

  const toggleRepeatTrack = useCallback(() => {
    setRepeatMode((current) => (current === 'track' ? 'off' : 'track'));
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime || 0);
    const handleLoadedMetadata = () => setDuration(audio.duration || 0);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = async () => {
      if (repeatMode === 'track') {
        audio.currentTime = 0;
        try {
          await audio.play();
          setIsPlaying(true);
        } catch {
          setIsPlaying(false);
        }
        return;
      }

      setIsPlaying(false);
      await playNext();
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);
    audio.volume = volume;

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [volume, currentTrack, queue, currentIndex, playbackSource, playNext, repeatMode]);

  const togglePlayPause = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio || !currentTrack?.src) return;

    if (audio.paused) {
      try {
        await audio.play();
      } catch {
        setIsPlaying(false);
      }
    } else {
      audio.pause();
    }
  }, [currentTrack]);

  const seek = useCallback((time) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = time;
    setCurrentTime(time);
  }, []);

  const playPrevious = useCallback(async () => {
    if (!queue.length) return;

    if (currentTime > 3) {
      seek(0);
      return;
    }

    const previousIndex = currentIndex - 1;
    if (previousIndex < 0) {
      seek(0);
      return;
    }

    await playQueueTrack(previousIndex);
  }, [queue.length, currentIndex, currentTime, playQueueTrack, seek]);

  const setVolume = useCallback((nextVolume) => {
    const audio = audioRef.current;
    const normalized = Math.min(1, Math.max(0, nextVolume));
    setVolumeState(normalized);
    if (audio) audio.volume = normalized;
  }, []);

  const stop = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
    setCurrentTime(0);
    setIsPlaying(false);
  }, []);

  const value = useMemo(() => ({
    audioRef,
    currentTrack,
    playbackSource,
    queue,
    currentIndex,
    isPlaying,
    repeatMode,
    currentTime,
    duration,
    volume,
    playTrack,
    playPlaylist,
    playNext,
    playPrevious,
    playQueueTrack,
    toggleRepeatTrack,
    togglePlayPause,
    seek,
    setVolume,
    stop,
    setCurrentTime,
    setCurrentTrack,
    setPlaybackSource,
    setQueue,
    setCurrentIndex,
  }), [currentTrack, playbackSource, queue, currentIndex, isPlaying, repeatMode, currentTime, duration, volume, playTrack, playPlaylist, playNext, playPrevious, playQueueTrack, toggleRepeatTrack, togglePlayPause, seek, setVolume, stop]);

  return (
    <PlayerContext.Provider value={value}>
      <audio ref={audioRef} preload="metadata" />
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer must be used within PlayerProvider');
  }
  return context;
}
