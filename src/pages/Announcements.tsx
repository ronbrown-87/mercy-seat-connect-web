import { Megaphone, CalendarHeart, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";

const FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfHaD0UW0mwFINfWLRirofKR-hfsFflJEF3lR_6bHYiH_aAJA/viewform";

const Announcements = () => (
  <div className="min-h-screen bg-background">
    <main className="container mx-auto px-4 pt-28 pb-16 max-w-4xl">
      <div className="text-center mb-10">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-semibold uppercase tracking-wide mb-4">
          <Megaphone className="h-4 w-4" /> Announcements
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground">What's Happening</h1>
        <p className="text-muted-foreground mt-3">Stay up to date with news and upcoming events at Mercy Seat Ministries.</p>
      </div>

      <article className="relative overflow-hidden rounded-3xl bg-primary text-primary-foreground p-8 md:p-12 shadow-xl">
        <div className="absolute -top-16 -right-16 h-56 w-56 rounded-full bg-accent/40 blur-3xl" />
        <div className="relative">
          <span className="inline-block rounded-full bg-accent text-accent-foreground px-3 py-1 text-xs font-bold uppercase mb-5">Featured</span>
          <CalendarHeart className="h-12 w-12 mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Church Conference Coming Soon!</h2>
          <p className="text-primary-foreground/90 text-lg leading-relaxed mb-8 max-w-2xl">
            We are excited to gather as one family for a time of powerful worship, teaching from God's Word, prayer,
            and fellowship. Every member is encouraged to register early so we can prepare well for you. Invite your
            family and friends to come along!
          </p>
          <Button size="lg" variant="secondary" asChild className="h-14 px-8 text-base font-semibold">
            <a href={FORM_URL} target="_blank" rel="noopener noreferrer">
              Register for Conference <ExternalLink className="h-4 w-4 ml-2" />
            </a>
          </Button>
        </div>
      </article>
    </main>
    <Footer />
  </div>
);

export default Announcements;
