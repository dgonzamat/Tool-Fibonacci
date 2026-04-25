declare namespace YT {
  enum PlayerState {
    UNSTARTED = -1,
    ENDED = 0,
    PLAYING = 1,
    PAUSED = 2,
    BUFFERING = 3,
    CUED = 5,
  }

  interface Player {
    seekTo(seconds: number, allowSeekAhead?: boolean): void
    playVideo(): void
    pauseVideo(): void
    getCurrentTime(): number
    getPlayerState(): PlayerState
    destroy(): void
    loadVideoById(videoId: string): void
  }

  interface PlayerEvent {
    target: Player
  }

  interface OnStateChangeEvent extends PlayerEvent {
    data: PlayerState
  }

  interface OnErrorEvent extends PlayerEvent {
    data: number
  }

  interface PlayerVars {
    autoplay?: 0 | 1
    controls?: 0 | 1
    modestbranding?: 0 | 1
    rel?: 0 | 1
    enablejsapi?: 0 | 1
    origin?: string
  }

  interface PlayerOptions {
    height?: string | number
    width?: string | number
    videoId?: string
    playerVars?: PlayerVars
    events?: {
      onReady?: (event: PlayerEvent) => void
      onStateChange?: (event: OnStateChangeEvent) => void
      onError?: (event: OnErrorEvent) => void
    }
  }

  interface PlayerConstructor {
    new (elementId: string | HTMLElement, options: PlayerOptions): Player
  }
}

interface Window {
  YT?: {
    Player: YT.PlayerConstructor
    PlayerState: typeof YT.PlayerState
  }
  onYouTubeIframeAPIReady?: () => void
}
