import { useEffect, useRef, useState } from "react";
import { Share2, Youtube, ExternalLink, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SocialShareDialog } from "@/components/SocialShareDialog";
import { reels, YOUTUBE_CHANNEL } from "@/data/reelsData";

export const ReelsFeed = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [share, setShare] = useState<{ open: boolean; id: string; title: string }>({ open: false, id: "", title: "" });
  const total = reels.length + 1; // + end card
  const iframeRefs = useRef<(HTMLIFrameElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const pauseAllExcept = (active: number) => {
    iframeRefs.current.forEach((f, i) => {
      if (f && i !== active) {
        f.contentWindow?.postMessage(JSON.stringify({ event: "command", func: "pauseVideo", args: [] }), "*");
      }
    });
  };

  useEffect(() => { pauseAllExcept(index); }, [index]);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const i = Number((e.target as HTMLElement).dataset.idx);
          if (e.intersectionRatio < 0.5) {
            iframeRefs.current[i]?.contentWindow?.postMessage(JSON.stringify({ event: "command", func: "pauseVideo", args: [] }), "*");
          } else {
            setIndex(i);
          }
        });
      },
      { root, threshold: [0, 0.5, 1] }
    );
    cardRefs.current.forEach((c) => c && obs.observe(c));
    return () => obs.disconnect();
  }, []);

  const scrollTo = (i: number) => {
    const el = containerRef.current;
    if (!el) return;
    const c = Math.max(0, Math.min(total - 1, i));
    el.scrollTo({ top: c * el.clientHeight, behavior: "smooth" });
  };

  const onScroll = () => {
    const el = containerRef.current;
    if (el) setIndex(Math.round(el.scrollTop / el.clientHeight));
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") { e.preventDefault(); scrollTo(index + 1); }
      if (e.key === "ArrowUp") { e.preventDefault(); scrollTo(index - 1); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return (
    <div className="flex justify-center">
      <div
        ref={containerRef}
        onScroll={onScroll}
        tabIndex={0}
        className="relative w-full max-w-[420px] h-[80vh] overflow-y-auto snap-y snap-mandatory rounded-2xl bg-foreground/95 shadow-xl outline-none [scrollbar-width:none]"
      >
        {reels.map((r, i) => (
          <div key={r.id} ref={(el) => (cardRefs.current[i] = el)} data-idx={i} className="snap-start h-full w-full relative flex items-center justify-center">
            <div className="relative h-full aspect-[9/16] max-w-full">
              {Math.abs(i - index) <= 1 && (
                <iframe
                  ref={(el) => (iframeRefs.current[i] = el)}
                  src={`https://www.youtube.com/embed/${r.id}?autoplay=0&rel=0&enablejsapi=1&playsinline=1&origin=${encodeURIComponent(window.location.origin)}`}
                  title={r.title}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                  allowFullScreen
                />
              )}
            </div>
            <div className="absolute right-3 bottom-32 flex flex-col gap-3">
              <button aria-label="Share" onClick={() => setShare({ open: true, id: r.id, title: r.title })} className="h-11 w-11 rounded-full bg-background/20 backdrop-blur text-background flex items-center justify-center hover:bg-background/40">
                <Share2 className="h-5 w-5" />
              </button>
              <a aria-label="Channel" href={YOUTUBE_CHANNEL} target="_blank" rel="noreferrer" className="h-11 w-11 rounded-full bg-background/20 backdrop-blur text-background flex items-center justify-center hover:bg-background/40">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
            <div className="absolute bottom-0 inset-x-0 p-4 pr-16 bg-gradient-to-t from-foreground/90 to-transparent pointer-events-none">
              <p className="text-background font-semibold mb-2">{r.title}</p>
              <a href={`https://youtube.com/shorts/${r.id}`} target="_blank" rel="noreferrer" className="pointer-events-auto inline-flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-full bg-primary text-primary-foreground">
                Watch on YouTube <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        ))}
        <div className="snap-start h-full w-full flex items-center justify-center p-6">
          <div className="bg-background rounded-2xl p-6 text-center space-y-4">
            <Youtube className="h-10 w-10 mx-auto text-primary" />
            <p className="text-foreground">
              You have reached the end of our videos! Check back soon for new content, or visit our official YouTube Channel for more messages.
            </p>
            <div className="flex flex-col gap-2">
              <Button variant="outline" onClick={() => scrollTo(0)}><ArrowUp className="h-4 w-4 mr-1" /> Back to Top</Button>
              <Button asChild><a href={`${YOUTUBE_CHANNEL}?sub_confirmation=1`} target="_blank" rel="noreferrer">Subscribe on YouTube</a></Button>
            </div>
          </div>
        </div>
      </div>
      <SocialShareDialog
        isOpen={share.open}
        onClose={() => setShare({ ...share, open: false })}
        title={share.title}
        url={`https://youtube.com/shorts/${share.id}`}
      />
    </div>
  );
};
