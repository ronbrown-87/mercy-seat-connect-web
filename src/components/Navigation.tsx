import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, BookOpen, MapPin, Phone } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

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

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-md' : 'bg-white/90 backdrop-blur-sm shadow-sm'
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
                <h1 className={`font-bold text-lg ${isScrolled ? 'text-gray-800' : 'text-gray-800'}`}>
                  Mercy Seat
                </h1>
                <p className={`text-xs ${isScrolled ? 'text-gray-600' : 'text-gray-600'}`}>
                  Connect
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6">
              {navItems.map((item, index) =>
                item.to ? (
                  <Link
                    key={index}
                    to={item.to}
                    className={`hover:text-blue-600 transition-colors font-medium text-gray-700 ${
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
                    className={`hover:text-blue-600 transition-colors font-medium text-gray-700`}
                  >
                    {item.label}
                  </button>
                )
              )}
              
              <Button
                onClick={() => setShowVisitDialog(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white"
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
                className="text-gray-800"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="lg:hidden bg-white border-t shadow-lg">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navItems.map((item, index) =>
                  item.to ? (
                      <Link
                        key={index}
                        to={item.to}
                        className={`block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md font-medium ${
                          location.pathname === item.to ? 'page-glow bg-blue-50' : ''
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.label}
                      </Link>
                  ) : (
                    <button
                      key={index}
                      onClick={item.action}
                      className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md font-medium w-full text-left"
                    >
                      {item.label}
                    </button>
                  )
                )}

                <div className="px-3 py-2">
                  <Button
                    onClick={() => setShowVisitDialog(true)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Visit Us
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Visit Us Dialog */}
      <Dialog open={showVisitDialog} onOpenChange={setShowVisitDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Visit Us</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <Button
              className="w-full"
              onClick={() => window.open('https://www.google.com/maps/search/?api=1&query=Mercy+Seat+Ministries+R12+Kalukungu+Street+Kitwe', '_blank')}
            >
              <MapPin className="w-4 h-4 mr-2" /> Get Directions
            </Button>
            <Button className="w-full" variant="outline" onClick={() => (window.location.href = 'tel:0975448759')}>
              <Phone className="w-4 h-4 mr-2" /> Call Us: 0975448759
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};