import { useState, useRef, useEffect } from 'react';

const AudioController = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [isAutoplayed, setIsAutoplayed] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Attempt to autoplay on mount
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      // Try to play (may fail due to browser policy)
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsAutoplayed(true))
          .catch(() => setIsAutoplayed(false));
      }
    }
  }, []);

  // Mute/unmute effect
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // Fallback: play on first user interaction if autoplay failed
  useEffect(() => {
    if (isAutoplayed) return;
    const handleUserGesture = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play();
        setIsAutoplayed(true);
      }
      window.removeEventListener('pointerdown', handleUserGesture);
      window.removeEventListener('keydown', handleUserGesture);
    };
    window.addEventListener('pointerdown', handleUserGesture);
    window.addEventListener('keydown', handleUserGesture);
    return () => {
      window.removeEventListener('pointerdown', handleUserGesture);
      window.removeEventListener('keydown', handleUserGesture);
    };
  }, [isAutoplayed]);

  return (
    <>
      <audio
        ref={audioRef}
        src="/audio/karthikeya_2_bgm.mp3"
        loop
        autoPlay
        muted={isMuted}
        style={{ display: 'none' }}
      />
      <button
        className="fixed top-4 right-4 p-2 bg-yellow-200 rounded-full shadow-md z-50 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
        onClick={() => setIsMuted((m) => !m)}
        aria-label={isMuted ? 'Unmute background music' : 'Mute background music'}
        type="button"
      >
        <span className="text-2xl" role="img" aria-label={isMuted ? 'Muted' : 'Unmuted'}>
          {isMuted ? '🔇' : '🔊'}
        </span>
      </button>
    </>
  );
};

export default AudioController;