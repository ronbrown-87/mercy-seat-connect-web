import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUp, Pause, Play, Share2, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SocialShareDialog } from "@/components/SocialShareDialog";
import { reels, YOUTUBE_CHANNEL } from "@/data/reelsData";

type Player = {
  playVideo: () => void;
  pauseVideo: () => void;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
  destroy: () => void;
};

type PlayerEvent = { target: Player; data: number };
type YouTubeAPI = {
  Player: new (element: HTMLElement, options: {
    videoId: string;
    playerVars: Record<string, string | number>;
    events: { onReady: (event: { target: Player }) => void; onStateChange: (event: PlayerEvent) => void };
  }) => Player;
  PlayerState: { PLAYING: number; PAUSED: number; ENDED: number };
};

declare global {
  interface Window {
    YT?: YouTubeAPI;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let apiPromise: Promise<YouTubeAPI> | undefined;
const loadPlayerAPI = () => {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (!apiPromise) {
    apiPromise = new Promise<YouTubeAPI>((resolve, reject) => {
      const previous = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        previous?.();
        if (window.YT?.Player) resolve(window.YT);
        else reject(new Error("YouTube player unavailable"));
      };
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.onerror = () => reject(new Error("YouTube player failed to load"));
      document.head.appendChild(script);
    }).catch((error) => { apiPromise = undefined; throw error; });
  }
  return apiPromise;
};

export const ReelsFeed = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mountRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<Player | null>(null);
  const activeRef = useRef(0);
  const readyRef = useRef(false);
  const pendingPlayRef = useRef(false);
  const passesRef = useRef<number[]>(reels.map(() => 0));
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const [cue, setCue] = useState(false);
  const [error, setError] = useState(false);
  const [share, setShare] = useState<{ open: boolean; id: string; title: string }>({ open: false, id: "", title: "" });

  const scrollTo = useCallback((i: number) => {
    const el = containerRef.current;
    if (!el) return;
    const target = el.children[Math.max(0, Math.min(reels.length, i))] as HTMLElement | undefined;
    target?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, []);

  const moveTo = useCallback((next: number) => {
    if (next === activeRef.current) return;
    playerRef.current?.pauseVideo();
    setPlaying(false);
    activeRef.current = next;
    setIndex(next);
    setCue(next < reels.length && passesRef.current[next] === 1);
  }, []);

  const onScroll = useCallback(() => {
    const el = containerRef.current;
    if (!el || !el.clientHeight) return;
    const position = el.scrollTop / el.clientHeight;
    const next = Math.max(0, Math.min(reels.length, Math.round(position)));
    // Stop sound as soon as the playing card is less than half visible.
    if (Math.abs(position - activeRef.current) >= 0.5) moveTo(next);
  }, [moveTo]);

  useEffect(() => {
    if (index >= reels.length || !mountRef.current) return;
    let cancelled = false;
    let player: Player | null = null;
    readyRef.current = false;
    setReady(false);
    setError(false);
    loadPlayerAPI().then((YT) => {
      if (cancelled || !mountRef.current) return;
      player = new YT.Player(mountRef.current, {
        videoId: reels[index].id,
        playerVars: { autoplay: 0, controls: 0, playsinline: 1, rel: 0, enablejsapi: 1, origin: window.location.origin },
        events: {
          onReady: (event) => {
            if (cancelled) return;
            playerRef.current = event.target;
            readyRef.current = true;
            setReady(true);
            if (pendingPlayRef.current) {
              pendingPlayRef.current = false;
              event.target.playVideo();
            }
          },
          onStateChange: (event) => {
            if (cancelled || activeRef.current !== index) return;
            if (event.data === YT.PlayerState.PLAYING) setPlaying(true);
            if (event.data === YT.PlayerState.PAUSED) setPlaying(false);
            if (event.data === YT.PlayerState.ENDED) {
              setPlaying(false);
              passesRef.current[index] += 1;
              if (passesRef.current[index] === 1) {
                setCue(true);
                event.target.seekTo(0, true);
                event.target.playVideo();
              } else {
                setCue(false);
                pendingPlayRef.current = index + 1 < reels.length;
                scrollTo(index + 1);
              }
            }
          },
        },
      });
      playerRef.current = player;
    }).catch(() => { if (!cancelled) setError(true); });
    return () => {
      cancelled = true;
      readyRef.current = false;
      player?.pauseVideo();
      player?.destroy();
      if (playerRef.current === player) playerRef.current = null;
    };
  }, [index, scrollTo]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (share.open || (e.target instanceof HTMLElement && e.target.closest("input, textarea, button, a, [role='dialog']"))) return;
      if (e.key === "ArrowDown") { e.preventDefault(); pendingPlayRef.current = false; scrollTo(activeRef.current + 1); }
      if (e.key === "ArrowUp") { e.preventDefault(); pendingPlayRef.current = false; scrollTo(activeRef.current - 1); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [scrollTo, share.open]);

  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden) { playerRef.current?.pauseVideo(); setPlaying(false); }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const togglePlayback = () => {
    if (!readyRef.current || !playerRef.current) return;
    if (playing) playerRef.current.pauseVideo();
    else playerRef.current.playVideo();
  };

  const replay = () => {
    passesRef.current = reels.map(() => 0);
    pendingPlayRef.current = false;
    setCue(false);
    scrollTo(0);
  };

  return (
    <div className="flex justify-center">
      <div
        ref={containerRef}
        onScroll={onScroll}
        tabIndex={0}
        aria-label="Reels feed"
        className="relative w-full max-w-[420px] h-[80vh] overflow-y-auto snap-y snap-mandatory rounded-lg bg-foreground shadow-xl outline-none focus-visible:ring-2 focus-visible:ring-ring [scrollbar-width:none]"
      >
        {reels.map((r, i) => (
          <div key={r.id} className="snap-start h-full w-full relative flex items-center justify-center">
            <div className="relative h-full aspect-[9/16] max-w-full bg-foreground">
              {i === index && <div ref={mountRef} className="absolute inset-0 w-full h-full" />}
            </div>
            {i === index && (
              <>
                <Button
                  size="icon"
                  type="button"
                  aria-label={playing ? "Pause reel" : "Play reel"}
                  title={playing ? "Pause reel" : "Play reel"}
                  disabled={!ready}
                  onClick={togglePlayback}
                  className={`absolute z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-16 w-16 rounded-full bg-primary/80 text-primary-foreground backdrop-blur-sm transition-opacity duration-300 hover:bg-primary ${playing ? "opacity-0 hover:opacity-100 focus-visible:opacity-100" : "opacity-100"}`}
                >
                  {playing ? <Pause className="!h-7 !w-7" fill="currentColor" /> : <Play className="!h-7 !w-7" fill="currentColor" />}
                </Button>
                {playing && <Button size="icon" variant="secondary" onClick={togglePlayback} aria-label="Pause reel" title="Pause reel" className="absolute top-4 right-4 z-10 h-11 w-11 rounded-full bg-background/70 backdrop-blur-sm opacity-50 hover:opacity-100 focus-visible:opacity-100"><Pause className="h-5 w-5" /></Button>}
                {error && <p className="absolute inset-x-6 top-1/2 -translate-y-1/2 text-center text-background">This video couldn't load. Please try again later.</p>}
                {cue && <div className="absolute left-1/2 bottom-24 z-10 -translate-x-1/2 rounded-full bg-primary/85 px-4 py-2 text-center text-sm font-medium text-primary-foreground shadow-lg animate-bounce motion-reduce:animate-none whitespace-nowrap pointer-events-none">Scroll down for more videos <ArrowDown className="inline h-4 w-4" /></div>}
              </>
            )}
            <div className="absolute right-3 bottom-32 z-10 flex flex-col gap-3">
              <Button size="icon" variant="secondary" aria-label="Share" title="Share" onClick={() => setShare({ open: true, id: r.id, title: r.title })} className="h-11 w-11 rounded-full bg-background/80 backdrop-blur hover:bg-background"><Share2 className="h-5 w-5" /></Button>
              <Button size="icon" variant="secondary" asChild className="h-11 w-11 rounded-full bg-background/80 backdrop-blur hover:bg-background"><a aria-label="Mercy Seat YouTube channel" title="Mercy Seat YouTube channel" href={YOUTUBE_CHANNEL} target="_blank" rel="noopener noreferrer"><Youtube className="h-5 w-5" /></a></Button>
            </div>
            <div className="absolute bottom-0 inset-x-0 p-4 pr-16 bg-gradient-to-t from-foreground/90 to-transparent pointer-events-none">
              <p className="text-background font-semibold">{r.title}</p>
            </div>
          </div>
        ))}
        <div className="snap-start h-full w-full flex items-center justify-center p-6">
          <div className="bg-background rounded-lg p-6 text-center space-y-4 max-w-full">
            <Youtube className="h-10 w-10 mx-auto text-primary" />
            <p className="text-foreground">You've reached the end of our videos! Check back soon or visit our YouTube Channel for more messages.</p>
            <div className="flex flex-col gap-2">
              <Button variant="outline" onClick={replay}><ArrowUp className="h-4 w-4" /> Replay from Top</Button>
              <Button asChild><a href={YOUTUBE_CHANNEL} target="_blank" rel="noopener noreferrer">Visit Mercy Seat YouTube Channel</a></Button>
            </div>
          </div>
        </div>
      </div>
      <SocialShareDialog isOpen={share.open} onClose={() => setShare((current) => ({ ...current, open: false }))} title={share.title} url={`https://youtube.com/shorts/${share.id}`} />
    </div>
  );
};