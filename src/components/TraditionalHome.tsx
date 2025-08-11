import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    BookOpen,
    Calendar,
    ChevronRight,
    Facebook,
    Globe,
    HandHeart,
    Heart,
    Image,
    Instagram,
    MessageCircle,
    Phone,
    Trophy,
    Users,
    Video,
    Youtube
} from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface NavigationCard {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  path: string;
  badge?: string;
}

const TraditionalHome = () => {
  const navigate = useNavigate();

  const navigationCards: NavigationCard[] = [
    {
      id: 'sermons',
      title: 'Sermon Archive',
      description: 'Access our complete collection of past sermons with audio and video recordings.',
      icon: <BookOpen className="w-8 h-8" />,
      color: 'bg-gradient-to-br from-blue-500 to-purple-600',
      path: '/sermons',
      badge: 'New'
    },
    {
      id: 'live',
      title: 'Live Stream',
      description: 'Join us for live worship services and special events.',
      icon: <Video className="w-8 h-8" />,
      color: 'bg-gradient-to-br from-red-500 to-pink-600',
      path: '/live',
      badge: 'Live'
    },
    {
      id: 'give',
      title: 'Online Giving',
      description: 'Support our ministry through secure online donations and tithing.',
      icon: <Heart className="w-8 h-8" />,
      color: 'bg-gradient-to-br from-green-500 to-emerald-600',
      path: '/give'
    },
    {
      id: 'connect',
      title: 'Community Forum',
      description: 'Connect with fellow members, share prayer requests, and discuss topics.',
      icon: <MessageCircle className="w-8 h-8" />,
      color: 'bg-gradient-to-br from-orange-500 to-yellow-600',
      path: '/connect'
    },
    {
      id: 'events',
      title: 'Events & Ministries',
      description: 'Discover upcoming events and explore our various ministries and programs.',
      icon: <Calendar className="w-8 h-8" />,
      color: 'bg-gradient-to-br from-purple-500 to-indigo-600',
      path: '/events'
    },
    {
      id: 'volunteer',
      title: 'Volunteer Opportunities',
      description: 'Find ways to serve and get involved in our church community.',
      icon: <HandHeart className="w-8 h-8" />,
      color: 'bg-gradient-to-br from-teal-500 to-cyan-600',
      path: '/volunteer'
    },
    {
      id: 'gallery',
      title: 'Church Gallery',
      description: 'Explore photos from our church events, ministries, and community.',
      icon: <Image className="w-8 h-8" />,
      color: 'bg-gradient-to-br from-pink-500 to-rose-600',
      path: '/gallery'
    },
    {
      id: 'bible-quiz',
      title: 'Bible Quiz',
      description: 'Test your knowledge of God\'s Word with our interactive quiz.',
      icon: <Trophy className="w-8 h-8" />,
      color: 'bg-gradient-to-br from-yellow-500 to-orange-600',
      path: '/bible-quiz',
      badge: 'Fun'
    },
    {
      id: 'contact',
      title: 'Contact & Prayer',
      description: 'Get in touch with church leaders and submit prayer requests.',
      icon: <Phone className="w-8 h-8" />,
      color: 'bg-gradient-to-br from-indigo-500 to-blue-600',
      path: '/contact'
    },
    {
      id: 'about',
      title: 'About Our Church',
      description: 'Learn about our mission, values, and the story of our congregation.',
      icon: <Users className="w-8 h-8" />,
      color: 'bg-gradient-to-br from-emerald-500 to-green-600',
      path: '/about'
    }
  ];

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-amber-500 to-orange-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Mercy Seat Connect
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Welcome to our church family. Connect, grow, and serve with us as we journey together in faith.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" variant="secondary" onClick={() => navigate('/learn-more')}>
          Learn More About Us
        </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-amber-600">
              Watch Live Service
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Cards */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Explore Our Church
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover all the ways you can connect, grow, and serve in our church community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {navigationCards.map((card, index) => (
            <Card 
              key={card.id} 
              className="hover:shadow-xl transition-all duration-300 cursor-pointer group"
              onClick={() => handleNavigate(card.path)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-lg ${card.color} text-white`}>
                    {card.icon}
                  </div>
                  {card.badge && (
                    <Badge variant="secondary" className="bg-red-100 text-red-800">
                      {card.badge}
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-lg font-bold text-gray-800 mt-3">
                  {card.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {card.description}
                </p>
                <div className="flex items-center text-amber-600 font-medium text-sm group-hover:text-amber-700">
                  <span>Explore</span>
                  <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-amber-600 mb-2">500+</div>
              <div className="text-gray-600">Church Members</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-amber-600 mb-2">25+</div>
              <div className="text-gray-600">Ministries</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-amber-600 mb-2">35+</div>
              <div className="text-gray-600">Years of Service</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-amber-600 mb-2">1000+</div>
              <div className="text-gray-600">Lives Touched</div>
            </div>
          </div>
        </div>
      </div>

      {/* Social Media Links */}
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h3 className="text-2xl font-bold text-amber-800 mb-6">Connect With Us</h3>
        <div className="flex justify-center space-x-6">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-blue-600 hover:text-blue-700"
            onClick={() => window.open('https://www.facebook.com/share/17BxUm2Cwy/?mibextid=qi2Omg', '_blank')}
          >
            <Facebook className="w-6 h-6" />
          </Button>
          <Button variant="ghost" size="icon" className="text-pink-600 hover:text-pink-700">
            <Instagram className="w-6 h-6" />
          </Button>
          <Button variant="ghost" size="icon" className="text-red-600 hover:text-red-700">
            <Youtube className="w-6 h-6" />
          </Button>
          <Button variant="ghost" size="icon" className="text-blue-500 hover:text-blue-600">
            <Globe className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TraditionalHome; 