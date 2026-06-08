import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Menu,
  X,
  BookOpen,
  MapPin,
  Phone,
  Home,
  Calendar,
  Mic,
  HandHeart,
  Video,
  Image as ImageIcon,
  Trophy,
  Mail,
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showVisitDialog, setShowVisitDialog] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);

      // Hide nav on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Lock body scroll while the mobile grid menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const scrollToTop = () => {
    if (location.pathname !== '/') {
      navigate('/');
      return;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsOpen(false);
  };

  const navItems = [
    { label: 'Home', action: scrollToTop, isScroll: true },
    { label: 'Events', to: '/events' },
    { label: 'Sermons', to: '/sermons' },
    { label: 'Give', to: '/give' },
    { label: 'Live', to: '/live' },
    { label: 'Volunteer', to: '/volunteer' },
    { label: 'Gallery', to: '/gallery' },
    { label: 'Bible Quiz', to: '/bible-quiz' },
    { label: 'Contact', to: '/contact' },
  ];

  // Mobile grid menu items
  const gridItems = [
    { label: 'Home', to: '/', icon: Home },
    { label: 'Events', to: '/events', icon: Calendar },
    { label: 'Sermons', to: '/sermons', icon: Mic },
    { label: 'Give', to: '/give', icon: HandHeart },
    { label: 'Live Media', to: '/live', icon: Video },
    { label: 'Gallery', to: '/gallery', icon: ImageIcon },
    { label: 'Bible Quiz', to: '/bible-quiz', icon: Trophy },
    { label: 'Contact', to: '/contact', icon: Mail },
  ];

  const handleGridNavigate = (to: string) => {
    setIsOpen(false);
    navigate(to);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-header/95 backdrop-blur-sm shadow-md' : 'bg-header/90 backdrop-blur-sm shadow-sm'
        } ${isVisible ? 'nav-show' : 'nav-hide'}`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              to="/"
              onClick={scrollToTop}
              className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-lg text-header-foreground">Mercy Seat</h1>
                <p className="text-xs text-header-foreground/80">Connect</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6">
              {navItems.map((item, index) =>
                item.to ? (
                  <Link
                    key={index}
                    to={item.to}
                    className={`hover:text-blue-200 transition-colors font-medium text-header-foreground ${
                      location.pathname === item.to ? 'page-glow' : ''
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button
                    key={index}
                    onClick={item.action}
                    className={`hover:text-blue-200 transition-colors font-medium text-header-foreground`}
                  >
                    {item.label}
                  </button>
                )
              )}

              <Button
                onClick={() => setShowVisitDialog(true)}
                className="bg-white/20 hover:bg-white/30 text-header-foreground border-white/30"
                variant="outline"
              >
                Visit Us
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(!isOpen)}
                className="text-header-foreground"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Grid Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] lg:hidden"
          >
            {/* blurred backdrop */}
            <div
              className="absolute inset-0 bg-blue-950/70 backdrop-blur-xl"
              onClick={() => setIsOpen(false)}
            />

            {/* glow accents */}
            <div className="pointer-events-none absolute -top-10 right-0 h-72 w-72 rounded-full bg-orange-500/30 blur-3xl" />
            <div className="pointer-events-none absolute bottom-10 -left-10 h-72 w-72 rounded-full bg-blue-500/30 blur-3xl" />

            <div className="relative flex h-full flex-col px-6 pb-8 pt-20">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">Mercy Seat Connect</h2>
                  <p className="text-sm text-blue-200/80">Where would you like to go?</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* 2-column glass grid */}
              <div className="grid flex-1 grid-cols-2 content-start gap-4">
                {gridItems.map((item, index) => {
                  const Icon = item.icon;
                  const active = location.pathname === item.to;
                  return (
                    <motion.button
                      key={item.label}
                      onClick={() => handleGridNavigate(item.to)}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 12 }}
                      transition={{ delay: 0.05 + index * 0.05, duration: 0.3 }}
                      whileTap={{ scale: 0.95 }}
                      className={`group relative flex aspect-square flex-col items-center justify-center gap-3 overflow-hidden rounded-3xl border text-center shadow-lg transition-colors ${
                        active
                          ? 'border-orange-300/50 bg-gradient-to-br from-blue-600 to-blue-800'
                          : 'border-white/15 bg-gradient-to-br from-blue-700/60 to-blue-900/60'
                      }`}
                    >
                      {/* inner glass border */}
                      <span className="pointer-events-none absolute inset-[1px] rounded-3xl border border-white/10" />
                      {/* top sheen */}
                      <span className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-3xl bg-gradient-to-b from-white/15 to-transparent" />

                      <span
                        className={`relative flex h-14 w-14 items-center justify-center rounded-2xl shadow-inner transition-all ${
                          active
                            ? 'bg-gradient-to-br from-orange-400 to-orange-600 text-white shadow-orange-500/40'
                            : 'bg-white/10 text-orange-300 group-hover:from-orange-400 group-hover:to-orange-600 group-hover:bg-gradient-to-br group-hover:text-white'
                        }`}
                      >
                        <Icon className="h-7 w-7" />
                      </span>
                      <span className="relative text-sm font-semibold text-white">
                        {item.label}
                      </span>
                    </motion.button>
                  );
                })}
              </div>

              {/* Visit Us anchor */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + gridItems.length * 0.05, duration: 0.3 }}
                className="mt-6"
              >
                <Button
                  onClick={() => {
                    setIsOpen(false);
                    setShowVisitDialog(true);
                  }}
                  className="h-14 w-full rounded-2xl bg-gradient-to-r from-orange-500 to-orange-400 text-base font-semibold text-white shadow-lg shadow-orange-500/30 hover:opacity-90"
                >
                  <MapPin className="mr-2 h-5 w-5" /> Visit Us
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Visit Us Dialog */}
      <Dialog open={showVisitDialog} onOpenChange={setShowVisitDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Visit Us</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <Button
              className="w-full"
              onClick={() =>
                window.open(
                  'https://www.google.com/maps/search/?api=1&query=Mercy+Seat+Ministries+R12+Kalukungu+Street+Kitwe',
                  '_blank'
                )
              }
            >
              <MapPin className="mr-2 h-4 w-4" /> Get Directions
            </Button>
            <Button
              className="w-full"
              variant="outline"
              onClick={() => (window.location.href = 'tel:0975448759')}
            >
              <Phone className="mr-2 h-4 w-4" /> Call Us: 0975448759
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
