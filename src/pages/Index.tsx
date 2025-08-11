
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { UpcomingEvents } from "@/components/UpcomingEvents";
import { About } from "@/components/About";
import { Gallery } from "@/components/Gallery";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <About />
      <Services />
      <UpcomingEvents />
      <Gallery />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
