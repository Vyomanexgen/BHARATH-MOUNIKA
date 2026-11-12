import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { weddingConfig } from '../config/weddingConfig';

interface YTPlayer {
  playVideo: () => void;
  pauseVideo: () => void;
  unMute: () => void;
  setVolume: (volume: number) => void;
  getVolume: () => number;
  getPlayerState: () => number;
  destroy: () => void;
}

interface YTNamespace {
  Player: new (
    elementId: string | HTMLElement,
    options: {
      height: string | number;
      width: string | number;
      videoId: string;
      playerVars?: Record<string, string | number>;
      events?: {
        onReady?: () => void;
        onStateChange?: (event: { data: number }) => void;
        onError?: (event: { data: number }) => void;
      };
    }
  ) => YTPlayer;
  PlayerState: {
    ENDED: number;
    PLAYING: number;
    PAUSED: number;
  };
}

declare global {
  interface Window {
    YT?: YTNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

interface AudioContextValue {
  isPlaying: boolean;
  embedBlocked: boolean;
  startMusic: () => Promise<void>;
  toggleMusic: () => Promise<void>;
}

const WeddingAudioContext = createContext<AudioContextValue>({
  isPlaying: false,
  embedBlocked: false,
  startMusic: async () => {},
  toggleMusic: async () => {},
});

const TARGET_VOLUME = 70;
const PLAYER_DOM_ID = 'yt-wedding-audio-player';

export const WeddingAudioProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const playerRef = useRef<YTPlayer | null>(null);
  const readyRef = useRef(false);
  const pendingPlayRef = useRef(false);
  const fadeIntervalRef = useRef<number | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [embedBlocked, setEmbedBlocked] = useState(false);

  const cancelFade = () => {
    if (fadeIntervalRef.current !== null) {
      window.clearInterval(fadeIntervalRef.current);
      fadeIntervalRef.current = null;
    }
  };

  const fadeVolume = useCallback(
    (from: number, to: number, durationMs: number, onComplete?: () => void) => {
      const player = playerRef.current;
      if (!player || !readyRef.current) return;
      cancelFade();

      const steps = Math.max(8, Math.round(durationMs / 50));
      let currentStep = 0;
      player.setVolume(from);

      fadeIntervalRef.current = window.setInterval(() => {
        currentStep += 1;
        const progress = Math.min(1, currentStep / steps);
        const vol = Math.round(from + (to - from) * progress);
        try {
          player.setVolume(vol);
        } catch {
          cancelFade();
        }
        if (progress >= 1) {
          cancelFade();
          onComplete?.();
        }
      }, 50);
    },
    []
  );

  const beginPlayback = useCallback(() => {
    const player = playerRef.current;
    if (!player || !readyRef.current) {
      pendingPlayRef.current = true;
      return;
    }
    try {
      player.unMute();
      player.setVolume(0);
      player.playVideo();
      setIsPlaying(true);
      fadeVolume(0, TARGET_VOLUME, 1400);
    } catch {
      setIsPlaying(false);
    }
  }, [fadeVolume]);

  useEffect(() => {
    let disposed = false;

    const initPlayer = () => {
      if (disposed || playerRef.current || !window.YT?.Player) return;
      const el = document.getElementById(PLAYER_DOM_ID);
      if (!el) return;

      playerRef.current = new window.YT.Player(PLAYER_DOM_ID, {
        height: '113',
        width: '200',
        videoId: weddingConfig.audio.youtubeVideoId,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          loop: 1,
          modestbranding: 1,
          playlist: weddingConfig.audio.youtubeVideoId,
          playsinline: 1,
          rel: 0,
          origin: window.location.origin,
        },
        events: {
          onReady: () => {
            if (disposed) return;
            readyRef.current = true;
            if (pendingPlayRef.current) {
              pendingPlayRef.current = false;
              beginPlayback();
            }
          },
          onStateChange: (event) => {
            if (disposed) return;
            if (event.data === 1) {
              setIsPlaying(true);
            } else if (event.data === 2) {
              setIsPlaying(false);
            } else if (event.data === 0) {
              // Seamless loop fallback
              try {
                playerRef.current?.playVideo();
              } catch {
                setIsPlaying(false);
              }
            }
          },
          onError: () => {
            if (disposed) return;
            setEmbedBlocked(true);
            setIsPlaying(false);
          },
        },
      });
    };

    if (window.YT?.Player) {
      initPlayer();
    } else {
      const prevCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        prevCallback?.();
        initPlayer();
      };

      if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        tag.async = true;
        document.head.appendChild(tag);
      }
    }

    return () => {
      disposed = true;
      cancelFade();
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch {
          // ignore cleanup error
        }
        playerRef.current = null;
      }
      readyRef.current = false;
    };
  }, [beginPlayback]);

  const startMusic = useCallback(async () => {
    if (embedBlocked) return;
    beginPlayback();
  }, [beginPlayback, embedBlocked]);

  const toggleMusic = useCallback(async () => {
    if (embedBlocked) {
      window.open(weddingConfig.audio.youtubeUrl, '_blank', 'noopener,noreferrer');
      return;
    }
    const player = playerRef.current;
    if (!player || !readyRef.current) {
      pendingPlayRef.current = true;
      return;
    }
    const state = player.getPlayerState();
    if (state === 1) {
      setIsPlaying(false);
      const currentVol = player.getVolume() || TARGET_VOLUME;
      fadeVolume(currentVol, 0, 650, () => {
        try {
          player.pauseVideo();
        } catch {
          // ignore
        }
      });
    } else {
      beginPlayback();
    }
  }, [beginPlayback, embedBlocked, fadeVolume]);

  return (
    <WeddingAudioContext.Provider
      value={{ isPlaying, embedBlocked, startMusic, toggleMusic }}
    >
      {children}
      {/* Unobtrusive YouTube Audio Frame (minimum dimensions required for reliable playback) */}
      <div
        aria-hidden="true"
        className="fixed bottom-0 right-0 w-[200px] h-[113px] opacity-[0.001] pointer-events-none overflow-hidden -z-10"
      >
        <div id={PLAYER_DOM_ID} />
      </div>
    </WeddingAudioContext.Provider>
  );
};

export function useWeddingAudio() {
  return useContext(WeddingAudioContext);
}
