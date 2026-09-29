import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LayoutGrid, List, Phone, Megaphone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

type Leader = { name: string; role: string; photo: string; bio: string; focus: string[] };

const leaders: Leader[] = [
  {
    name: "Pastor Gavu Nyirongo",
    role: "Senior Pastor & Founder",
    photo: "/images/gavuoff.jpg",
    bio: "The founding pastor of Mercy Seat Ministries, with over 20 years of ministry experience and a heart for evangelism, discipleship, and community transformation.",
    focus: ["Expository preaching and teaching", "Leadership development and mentoring", "Community outreach and evangelism", "Marriage and family counseling"],
  },
  { name: "Pastor Maston Musowoya", role: "Pastor", photo: "/images/maston.jpg", bio: "Serves the congregation through pastoral care, teaching, and supporting the ministries of the church.", focus: ["Pastoral care", "Teaching", "Ministry support"] },
  { name: "Pastor Catherine Chewe", role: "Pastor", photo: "/images/catherine.jpg", bio: "Ministers with compassion, caring for members and encouraging growth in faith.", focus: ["Pastoral care", "Women's ministry", "Prayer"] },
  { name: "Pastor Eric Tady", role: "Pastor", photo: "/images/taddy.jpg", bio: "Committed to shepherding members and helping them grow in God's Word.", focus: ["Pastoral care", "Discipleship", "Teaching"] },
  { name: "Pastor Eric Nyundi", role: "Pastor", photo: "/images/nyundi.jpg", bio: "Serves the church family through teaching, counsel, and outreach.", focus: ["Teaching", "Counsel", "Outreach"] },
  { name: "Pastor Emmanuel Chindawi", role: "Pastor", photo: "/images/chindawi.jpg", bio: "Dedicated to building up believers and reaching the community with the Gospel.", focus: ["Evangelism", "Discipleship", "Pastoral care"] },
];

const Photo = ({ l, className }: { l: Leader; className: string }) => (
  <img
    src={l.photo}
    alt={l.name}
    className={`object-cover bg-muted ${className}`}
    onError={(e) => ((e.currentTarget as HTMLImageElement).src = "/placeholder.svg")}
  />
);

export const LeadershipSection = () => {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [active, setActive] = useState<Leader | null>(null);
  const navigate = useNavigate();

  return (
    <section>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <h2 className="text-3xl font-bold text-foreground">Our Leadership</h2>
        <div className="inline-flex rounded-lg border border-border bg-card p-1">
          <Button size="sm" variant={view === "grid" ? "default" : "ghost"} onClick={() => setView("grid")} aria-label="Grid view">
            <LayoutGrid className="h-4 w-4 mr-1" /> Grid
          </Button>
          <Button size="sm" variant={view === "list" ? "default" : "ghost"} onClick={() => setView("list")} aria-label="List view">
            <List className="h-4 w-4 mr-1" /> List
          </Button>
        </div>
      </div>

      {view === "grid" ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {leaders.map((l) => (
            <button
              key={l.name}
              onClick={() => setActive(l)}
              className="group rounded-2xl border border-border bg-card p-5 text-center transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg"
            >
              <Photo l={l} className="w-24 h-24 md:w-28 md:h-28 rounded-full mx-auto mb-4 ring-4 ring-primary/15 group-hover:ring-primary/40 transition" />
              <div className="font-semibold text-foreground">{l.name}</div>
              <div className="text-sm text-primary">{l.role}</div>
            </button>
          ))}
        </div>
      ) : (
        <div className="divide-y divide-border rounded-2xl border border-border bg-card">
          {leaders.map((l) => (
            <button
              key={l.name}
              onClick={() => setActive(l)}
              className="flex w-full items-center gap-4 p-4 text-left transition-colors hover:bg-muted/60"
            >
              <Photo l={l} className="w-16 h-16 rounded-full shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-foreground">{l.name}</div>
                <div className="text-sm text-primary">{l.role}</div>
                <p className="text-sm text-muted-foreground line-clamp-1">{l.bio}</p>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </button>
          ))}
        </div>
      )}

      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          {active && (
            <>
              <DialogHeader className="items-center text-center">
                <Photo l={active} className="w-28 h-28 rounded-full ring-4 ring-primary/20 mb-2" />
                <DialogTitle>{active.name}</DialogTitle>
                <DialogDescription className="text-primary font-medium">{active.role}</DialogDescription>
              </DialogHeader>
              <p className="text-muted-foreground leading-relaxed">{active.bio}</p>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Ministry Responsibilities</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {active.focus.map((f) => <li key={f}>• {f}</li>)}
                </ul>
              </div>
              <Button variant="outline" asChild>
                <a href="tel:0975448759"><Phone className="h-4 w-4 mr-2" /> Contact the church office</a>
              </Button>
              <div className="rounded-xl border border-accent/40 bg-accent/10 p-4">
                <p className="text-sm text-foreground mb-3 flex gap-2">
                  <Megaphone className="h-5 w-5 shrink-0 text-accent" />
                  <span><strong>Upcoming Event:</strong> Our Church Conference is coming up soon! For details and registration, please visit our Announcements page.</span>
                </p>
                <Button className="w-full" onClick={() => { setActive(null); navigate("/announcements"); }}>
                  Go to Announcements <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};
