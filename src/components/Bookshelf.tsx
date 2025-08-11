import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Heart, 
  Users, 
  Calendar, 
  MessageCircle, 
  Video, 
  HandHeart, 
  Phone, 
  Globe, 
  Facebook, 
  Instagram, 
  Youtube,
  ChevronRight,
  X
} from 'lucide-react';

interface BookShelfItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  path: string;
  badge?: string;
  features: string[];
}

const bookshelfItems: BookShelfItem[] = [
  {
    id: 'sermons',
    title: 'Sermon Archive',
    description: 'Access our complete collection of past sermons with audio and video recordings.',
    icon: <BookOpen className="w-8 h-8" />,
    color: 'bg-gradient-to-br from-blue-500 to-purple-600',
    path: '/sermons',
    badge: 'New',
    features: ['Audio & Video Sermons', 'Search by Topic', 'Download Options', 'Sermon Notes']
  },
  {
    id: 'live',
    title: 'Live Stream',
    description: 'Join us for live worship services and special events.',
    icon: <Video className="w-8 h-8" />,
    color: 'bg-gradient-to-br from-red-500 to-pink-600',
    path: '/live',
    badge: 'Live',
    features: ['Sunday Services', 'Special Events', 'Real-time Chat', 'Prayer Requests']
  },
  {
    id: 'give',
    title: 'Online Giving',
    description: 'Support our ministry through secure online donations and tithing.',
    icon: <Heart className="w-8 h-8" />,
    color: 'bg-gradient-to-br from-green-500 to-emerald-600',
    path: '/give',
    features: ['Secure Donations', 'Recurring Gifts', 'Tithe Tracking', 'Ministry Support']
  },
  {
    id: 'connect',
    title: 'Community Forum',
    description: 'Connect with fellow members, share prayer requests, and discuss topics.',
    icon: <MessageCircle className="w-8 h-8" />,
    color: 'bg-gradient-to-br from-orange-500 to-yellow-600',
    path: '/connect',
    features: ['Discussion Boards', 'Prayer Requests', 'Small Groups', 'Member Directory']
  },
  {
    id: 'events',
    title: 'Events & Ministries',
    description: 'Discover upcoming events and explore our various ministries and programs.',
    icon: <Calendar className="w-8 h-8" />,
    color: 'bg-gradient-to-br from-purple-500 to-indigo-600',
    path: '/events',
    features: ['Youth Ministry', 'Bible Studies', 'Community Service', 'Children\'s Ministry']
  },
  {
    id: 'volunteer',
    title: 'Volunteer Opportunities',
    description: 'Find ways to serve and get involved in our church community.',
    icon: <HandHeart className="w-8 h-8" />,
    color: 'bg-gradient-to-br from-teal-500 to-cyan-600',
    path: '/volunteer',
    features: ['Service Opportunities', 'Ministry Teams', 'Training Programs', 'Impact Stories']
  },
  {
    id: 'contact',
    title: 'Contact & Prayer',
    description: 'Get in touch with church leaders and submit prayer requests.',
    icon: <Phone className="w-8 h-8" />,
    color: 'bg-gradient-to-br from-indigo-500 to-blue-600',
    path: '/contact',
    features: ['Contact Form', 'Prayer Requests', 'Pastoral Care', 'Office Hours']
  },
  {
    id: 'about',
    title: 'About Our Church',
    description: 'Learn about our mission, values, and the story of our congregation.',
    icon: <Users className="w-8 h-8" />,
    color: 'bg-gradient-to-br from-pink-500 to-rose-600',
    path: '/about',
    features: ['Our Mission', 'Church History', 'Leadership Team', 'Core Values']
  }
];

interface BookshelfProps {
  onBookSelect: (path: string) => void;
}

export const Bookshelf: React.FC<BookshelfProps> = ({ onBookSelect }) => {
  const [selectedBook, setSelectedBook] = useState<BookShelfItem | null>(null);

  const handleBookClick = (book: BookShelfItem) => {
    setSelectedBook(book);
  };

  const handleCloseModal = () => {
    setSelectedBook(null);
  };

  const handleNavigate = (path: string) => {
    onBookSelect(path);
    setSelectedBook(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-4 md:p-8">
      {/* Bookshelf Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold text-amber-800 mb-4">
          Mercy Seat Connect
        </h1>
        <p className="text-xl text-amber-700 max-w-2xl mx-auto">
          Welcome to our digital library. Choose a book to explore our church community and resources.
        </p>
      </div>

      {/* Bookshelf */}
      <div className="max-w-7xl mx-auto">
        {/* Shelf */}
        <div className="bg-gradient-to-b from-amber-600 to-amber-800 h-8 rounded-lg mb-8 shadow-lg"></div>
        
        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {bookshelfItems.map((book, index) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="cursor-pointer"
              onClick={() => handleBookClick(book)}
            >
              <Card className="h-full bg-white shadow-xl hover:shadow-2xl transition-all duration-300 border-0">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-lg ${book.color} text-white`}>
                      {book.icon}
                    </div>
                    {book.badge && (
                      <Badge variant="secondary" className="bg-red-100 text-red-800">
                        {book.badge}
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg font-bold text-gray-800 mt-3">
                    {book.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {book.description}
                  </p>
                  <div className="mt-4 flex items-center text-amber-600 font-medium text-sm">
                    <span>Tap to explore</span>
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom Shelf */}
        <div className="bg-gradient-to-b from-amber-600 to-amber-800 h-8 rounded-lg mt-8 shadow-lg"></div>
      </div>

      {/* Book Detail Modal */}
      <AnimatePresence>
        {selectedBook && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className={`p-4 rounded-xl ${selectedBook.color} text-white`}>
                    {selectedBook.icon}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">{selectedBook.title}</h2>
                    {selectedBook.badge && (
                      <Badge variant="secondary" className="bg-red-100 text-red-800 mt-2">
                        {selectedBook.badge}
                      </Badge>
                    )}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleCloseModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </Button>
              </div>

              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                {selectedBook.description}
              </p>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">What you'll find:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {selectedBook.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2 text-gray-600">
                      <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex space-x-3">
                <Button
                  onClick={() => handleNavigate(selectedBook.path)}
                  className="flex-1 bg-amber-600 hover:bg-amber-700 text-white"
                >
                  Explore {selectedBook.title}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleCloseModal}
                >
                  Back to Shelf
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Social Media Links */}
      <div className="max-w-7xl mx-auto mt-16 text-center">
        <h3 className="text-2xl font-bold text-amber-800 mb-6">Connect With Us</h3>
        <div className="flex justify-center space-x-6">
          <Button variant="ghost" size="icon" className="text-blue-600 hover:text-blue-700">
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