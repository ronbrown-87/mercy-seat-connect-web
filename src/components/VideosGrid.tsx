import { Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { YOUTUBE_CHANNEL } from "@/data/reelsData";

const videos = [{ id: "2uAWjMMR_Qw", title: "Mercy Seat Ministries – Service & Teaching" }];

export const VideosGrid = () => (
  <div className="grid gap-6 md:grid-cols-2">
    {videos.map((v) => (
      <div key={v.id} className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <div className="relative aspect-video bg-muted">
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube.com/embed/${v.id}?rel=0`}
            title={v.title}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 p-4">
          <h3 className="font-semibold text-foreground">{v.title}</h3>
          <Button asChild size="sm">
            <a href={YOUTUBE_CHANNEL} target="_blank" rel="noopener noreferrer">
              <Youtube className="mr-2 h-4 w-4" /> Watch on YouTube
            </a>
          </Button>
        </div>
      </div>
    ))}
  </div>
);
