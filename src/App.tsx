import { Navigation } from "@/components/Navigation";
import TraditionalHome from "@/components/TraditionalHome";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ScrollToTop } from "@/components/ScrollToTop";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BibleQuiz from "./pages/BibleQuiz";
import Contact from "./pages/Contact";
import Events from "./pages/Events";
import Gallery from "./pages/Gallery";
import Give from "./pages/Give";
import Index from "./pages/Index";
import Live from "./pages/Live";
import NewAbout from "./pages/NewAbout";
import NotFound from "./pages/NotFound";
import Sermons from "./pages/Sermons";
import Volunteer from "./pages/Volunteer";

const AppContent = () => {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<TraditionalHome />} />
        <Route path="/home" element={<Index />} />
        <Route path="/events" element={<Events />} />
        <Route path="/sermons" element={<Sermons />} />
        <Route path="/give" element={<Give />} />
        <Route path="/live" element={<Live />} />
        <Route path="/learn-more" element={<NewAbout />} />
        <Route path="/volunteer" element={<Volunteer />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/bible-quiz" element={<BibleQuiz />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ScrollToTop />
    </>
  );
};

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
