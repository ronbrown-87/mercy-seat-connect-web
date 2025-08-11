import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, BookOpen, User, LogOut, Settings } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { LoginDialog } from './LoginDialog';
import { ProfileEditDialog } from './ProfileEditDialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [showProfileEditDialog, setShowProfileEditDialog] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

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

  const handleLogout = async () => {
    await logout();
    navigate('/');
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
            {/* Login Button on Far Left */}
            <div className="flex items-center space-x-4">
              {!isAuthenticated ? (
                <Button
                  onClick={() => setShowLoginDialog(true)}
                  variant="outline"
                  className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                >
                  Login / Sign Up
                </Button>
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-2">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={user?.avatarUrl} alt={user?.name} />
                        <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="hidden md:block">{user?.name}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-56">
                    <DropdownMenuItem onClick={() => setShowProfileEditDialog(true)}>
                      <Settings className="w-4 h-4 mr-2" />
                      Edit Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>

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
                onClick={() => scrollToSection('contact')}
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
                
                {/* Mobile Auth */}
                {!isAuthenticated ? (
                  <div className="px-3 py-2">
                    <Button
                      onClick={() => {
                        setShowLoginDialog(true);
                        setIsOpen(false);
                      }}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Login / Sign Up
                    </Button>
                  </div>
                ) : (
                  <div className="px-3 py-2">
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-md">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={user?.avatarUrl} alt={user?.name} />
                        <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{user?.name}</span>
                    </div>
                    <Button
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                      variant="outline"
                      className="w-full mt-2 text-red-600 hover:text-red-700"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                )}

                <div className="px-3 py-2">
                  <Button
                    onClick={() => scrollToSection('contact')}
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

      {/* Login Dialog */}
      <LoginDialog
        open={showLoginDialog}
        onOpenChange={setShowLoginDialog}
        reason="Please sign up or log in to access all features"
      />

      {/* Profile Edit Dialog */}
      <ProfileEditDialog
        open={showProfileEditDialog}
        onOpenChange={setShowProfileEditDialog}
      />
    </>
  );
};