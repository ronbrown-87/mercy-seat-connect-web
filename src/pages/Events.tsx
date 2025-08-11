import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, Filter, ArrowLeft, Search, Plus, Share2, Heart, Bookmark, Mail, X } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Footer } from "@/components/Footer";
import { useNavigate } from 'react-router-dom';

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  category: string;
  fullDescription: string;
  attendees: number;
  maxAttendees: number;
  isFeatured: boolean;
  isRecurring: boolean;
  image?: string;
}

const Events = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showJoinDialog, setShowJoinDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [joinEmail, setJoinEmail] = useState('');
  const [joinMessage, setJoinMessage] = useState('');

  const events: Event[] = [
    {
      id: 1,
      title: "Sunday Morning Service",
      date: "2025-08-17",
      time: "10:00 AM - 11:30 AM",
      location: "Mercy Seat Ministries",
      description: "Join us for a powerful time of worship and biblical teaching.",
      category: "Worship",
      fullDescription: "Our Sunday service includes contemporary worship music, powerful preaching from God's Word, and a time of fellowship. Children's ministry is available for ages 3-12. Come as you are and experience God's love in our welcoming community.",
      attendees: 245,
      maxAttendees: 300,
      isFeatured: true,
      isRecurring: true,
    },
    {
      id: 2,
      title: "Friday Prayer Meeting",
      date: "2025-08-15",
      time: "7:00 PM - 8:30 PM",
      location: "Mercy Seat Ministries",
      description: "Come and intercede with us for our community and nation.",
      category: "Prayer",
      fullDescription: "Join us for an intensive time of prayer and intercession. We pray for our community, nation, church members, and global missions. This is a powerful time of seeking God's face and experiencing His presence through corporate prayer.",
      attendees: 45,
      maxAttendees: 60,
      isFeatured: false,
      isRecurring: true,
    },
    {
      id: 3,
      title: "Youth Ministry Night",
      date: "2025-08-16",
      time: "6:30 PM - 8:30 PM",
      location: "Mercy Seat Ministries",
      description: "A time for the youth to connect, learn, and grow together.",
      category: "Youth",
      fullDescription: "Our youth ministry brings together teenagers ages 13-19 for fun activities, relevant Bible teaching, and meaningful fellowship. We focus on building character, developing leadership skills, and helping young people navigate the challenges of adolescence with biblical wisdom.",
      attendees: 28,
      maxAttendees: 40,
      isFeatured: false,
      isRecurring: true,
    },
    {
      id: 4,
      title: "Wednesday Bible Study",
      date: "2025-08-13",
      time: "7:00 PM - 8:30 PM",
      location: "Mercy Seat Ministries",
      description: "Delve deeper into the Word of God with us.",
      category: "Study",
      fullDescription: "Our midweek Bible study provides an opportunity for deeper exploration of Scripture. We study various books of the Bible, discuss practical application, and encourage one another in our faith journey. Light refreshments are provided.",
      attendees: 35,
      maxAttendees: 50,
      isFeatured: false,
      isRecurring: true,
    },
    {
      id: 5,
      title: "Community Outreach Program",
      date: "2025-08-23",
      time: "9:00 AM - 12:00 PM",
      location: "Various Locations in Chamboli",
      description: "Join us as we share the love of Christ in our community.",
      category: "Outreach",
      fullDescription: "Our community outreach includes visiting the elderly, distributing food to needy families, sharing the Gospel, and providing practical assistance where needed. We believe in being the hands and feet of Jesus in our neighborhood. Transportation will be provided.",
      attendees: 18,
      maxAttendees: 25,
      isFeatured: true,
      isRecurring: false,
    },
    {
      id: 6,
      title: "Christmas Eve Service",
      date: "2025-12-24",
      time: "6:00 PM - 7:30 PM",
      location: "Mercy Seat Ministries",
      description: "Celebrate the birth of our Savior with us.",
      category: "Special",
      fullDescription: "Join us for a special Christmas Eve service as we celebrate the birth of Jesus Christ. The service will include special music, dramatic presentations, and a message of hope and joy. All families are welcome to this blessed celebration.",
      attendees: 180,
      maxAttendees: 250,
      isFeatured: true,
      isRecurring: false,
    },
    {
      id: 7,
      title: "Women's Prayer Circle",
      date: "2025-08-31",
      time: "10:00 AM - 11:30 AM",
      location: "Mercy Seat Ministries",
      description: "Women gathering for prayer and encouragement.",
      category: "Women",
      fullDescription: "A special time for women to come together for prayer, encouragement, and fellowship. We support one another in our faith journey.",
      attendees: 15,
      maxAttendees: 20,
      isFeatured: false,
      isRecurring: true,
    },
  ];

  const categories = ['All', 'Worship', 'Prayer', 'Youth', 'Study', 'Outreach', 'Special', 'Women'];

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || selectedCategory === 'All' || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleJoinEvent = (event: Event) => {
    setSelectedEvent(event);
    setShowJoinDialog(true);
  };

  const handleShowDetails = (event: Event) => {
    setSelectedEvent(event);
    setShowDetailsDialog(true);
  };

  const handleSubmitJoin = () => {
    if (!joinEmail.trim()) {
      alert('Please enter your email address.');
      return;
    }
    
    // Here you would typically send the email to maronnyirongo@gmail.com
    // For now, we'll just show a success message
    alert(`Thank you for your interest in "${selectedEvent?.title}". Your request has been sent to our team. We'll contact you at ${joinEmail} with more details.`);
    
    setShowJoinDialog(false);
    setJoinEmail('');
    setJoinMessage('');
    setSelectedEvent(null);
  };

  const handleShareEvent = (event: Event) => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: event.description,
        url: window.location.href,
      }).catch(() => {
        navigator.clipboard.writeText(`${event.title} - ${event.description}`);
        alert('Event details copied to clipboard!');
      });
    } else {
      navigator.clipboard.writeText(`${event.title} - ${event.description}`);
      alert('Event details copied to clipboard!');
    }
  };

  const getProgressPercentage = (attendees: number, maxAttendees: number) => {
    return Math.min((attendees / maxAttendees) * 100, 100);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <header className="container mx-auto px-4 mb-12">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4 flex items-center">
              <Calendar className="mr-2 h-6 w-6 text-blue-500" /> Events & Ministries
            </h1>
            <p className="text-gray-600">Discover upcoming events and explore our various ministries and programs</p>
          </div>
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Featured Event */}
        {filteredEvents.filter((e) => e.isFeatured).length > 0 && (
          <Card className="mb-8 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Calendar className="h-6 w-6" />
                <Badge variant="secondary" className="bg-white text-blue-600">Featured Event</Badge>
              </div>
              <h2 className="text-2xl font-bold mb-2">{filteredEvents.filter((e) => e.isFeatured)[0]?.title}</h2>
              <p className="text-blue-100 mb-4">{filteredEvents.filter((e) => e.isFeatured)[0]?.description}</p>
              <div className="flex items-center space-x-4 text-sm text-blue-100 mb-4">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{filteredEvents.filter((e) => e.isFeatured)[0]?.date}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{filteredEvents.filter((e) => e.isFeatured)[0]?.time}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4" />
                  <span>{filteredEvents.filter((e) => e.isFeatured)[0]?.location}</span>
                </div>
              </div>
              <div className="flex space-x-3">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleJoinEvent(filteredEvents.filter((e) => e.isFeatured)[0])}
                  disabled={filteredEvents.filter((e) => e.isFeatured)[0].attendees >= filteredEvents.filter((e) => e.isFeatured)[0].maxAttendees}
                >
                  <Users className="h-4 w-4 mr-2" />
                  {filteredEvents.filter((e) => e.isFeatured)[0].attendees >= filteredEvents.filter((e) => e.isFeatured)[0].maxAttendees ? 'Event Full' : 'Join Event'}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-white text-white hover:bg-white hover:text-blue-600"
                  onClick={() => handleShowDetails(filteredEvents.filter((e) => e.isFeatured)[0])}
                >
                  <Bookmark className="h-4 w-4 mr-2" /> Details
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Search events..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="icon"
                  onClick={() => setViewMode('grid')}
                >
                  <div className="grid grid-cols-2 gap-1 h-4 w-4">
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                  </div>
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="icon"
                  onClick={() => setViewMode('list')}
                >
                  <div className="space-y-1 h-4 w-4">
                    <div className="bg-current rounded-sm h-1"></div>
                    <div className="bg-current rounded-sm h-1"></div>
                    <div className="bg-current rounded-sm h-1"></div>
                  </div>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Events Grid/List */}
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
          {filteredEvents.map((event) => (
            <Card key={event.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">{event.category}</Badge>
                  <div className="flex space-x-2">
                    {event.isFeatured && <Badge className="bg-blue-500 text-white">Featured</Badge>}
                    {event.isRecurring && <Badge variant="outline">Recurring</Badge>}
                  </div>
                </div>
                <CardTitle className="text-lg">{event.title}</CardTitle>
                <CardDescription className="text-gray-600">{event.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Calendar className="h-4 w-4" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Clock className="h-4 w-4" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <MapPin className="h-4 w-4" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Users className="h-4 w-4" />
                    <span>{event.attendees}/{event.maxAttendees} registered</span>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Registration</span>
                    <span>{getProgressPercentage(event.attendees, event.maxAttendees).toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${getProgressPercentage(event.attendees, event.maxAttendees)}%`,
                        backgroundColor: event.attendees >= event.maxAttendees ? '#ef4444' : '#10b981',
                      }}
                    ></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Button
                    onClick={() => handleJoinEvent(event)}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    disabled={event.attendees >= event.maxAttendees}
                  >
                    <Users className="h-4 w-4 mr-2" />
                    {event.attendees >= event.maxAttendees ? 'Event Full' : 'Join Event'}
                  </Button>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleShowDetails(event)}
                    >
                      <Bookmark className="h-4 w-4 mr-2" /> Details
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleShareEvent(event)}
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">No events found</h3>
              <p className="text-gray-500">Try adjusting your search criteria or filters.</p>
            </CardContent>
          </Card>
        )}
      </main>

      {/* Join Event Dialog */}
      <Dialog open={showJoinDialog} onOpenChange={setShowJoinDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold text-blue-600">
              Join Event
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{selectedEvent?.title}</h3>
              <p className="text-gray-600 text-sm">{selectedEvent?.description}</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={joinEmail}
                  onChange={(e) => setJoinEmail(e.target.value)}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message (Optional)
                </label>
                <Textarea
                  placeholder="Any additional information or questions..."
                  value={joinMessage}
                  onChange={(e) => setJoinMessage(e.target.value)}
                  rows={3}
                />
              </div>
            </div>
            
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowJoinDialog(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmitJoin}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                Submit Request
              </Button>
            </div>
            
            <div className="text-center text-sm text-gray-500">
              <p>Your request will be sent to our team at maronnyirongo@gmail.com</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Event Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold text-blue-600">
              Event Details
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">{selectedEvent?.title}</h3>
              <div className="flex items-center justify-center space-x-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{selectedEvent?.date}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{selectedEvent?.time}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4" />
                  <span>{selectedEvent?.location}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Description</h4>
                <p className="text-gray-600 leading-relaxed">{selectedEvent?.fullDescription}</p>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600">Registration</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {selectedEvent?.attendees}/{selectedEvent?.maxAttendees} registered
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Status</p>
                  <Badge 
                    variant={selectedEvent?.attendees && selectedEvent?.maxAttendees && selectedEvent.attendees >= selectedEvent.maxAttendees ? "destructive" : "default"}
                  >
                    {selectedEvent?.attendees && selectedEvent?.maxAttendees && selectedEvent.attendees >= selectedEvent.maxAttendees ? 'Full' : 'Open'}
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <Button
                onClick={() => {
                  setShowDetailsDialog(false);
                  handleJoinEvent(selectedEvent!);
                }}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
                disabled={selectedEvent?.attendees && selectedEvent?.maxAttendees && selectedEvent.attendees >= selectedEvent.maxAttendees}
              >
                <Users className="h-4 w-4 mr-2" />
                Join Event
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowDetailsDialog(false)}
                className="flex-1"
              >
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Events;