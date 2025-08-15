import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Calendar, Check, Clock, Copy, Eye, Facebook, MessageCircle, Mic, Send, Share2, Users, Video } from "lucide-react";
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface LiveEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  isLive: boolean;
  viewers: number;
  duration: string;
  speaker: string;
  category: string;
}

const Live = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isLive, setIsLive] = useState(false);
  const [viewers, setViewers] = useState(1247);
  const [chatMessage, setChatMessage] = useState('');

  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetDate = new Date("2025-08-17T10:00:00"); // Future date for testing
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setCountdown({ days, hours, minutes, seconds });
        setIsLive(false);
      } else {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsLive(true);
      }
    };

    calculateTimeLeft();
    const intervalId = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (isLive) {
      const interval = setInterval(() => {
        setViewers((prev) => prev + Math.floor(Math.random() * 3) - 1);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isLive]);

  const liveEvents: LiveEvent[] = [
    {
      id: "1",
      title: "Sunday Morning Service",
      description: "Join us for our weekly Sunday service with worship, prayer, and biblical teaching.",
      date: "2025-08-17",
      time: "10:00 AM",
      isLive: isLive,
      viewers: viewers,
      duration: "1:30:00",
      speaker: "Pastor Gavu Nyirongo",
      category: "Sunday Service",
    },
    {
      id: "2",
      title: "Wednesday Bible Study",
      description: "Deep dive into God's Word with our midweek Bible study.",
      date: "2025-08-20",
      time: "7:00 PM",
      isLive: false,
      viewers: 0,
      duration: "1:00:00",
      speaker: "Pastor Gavu Nyirongo",
      category: "Bible Study",
    },
    {
      id: "3",
      title: "Youth Ministry Live",
      description: "Special youth service with contemporary worship and relevant teaching.",
      date: "2025-08-23",
      time: "6:30 PM",
      isLive: false,
      viewers: 0,
      duration: "1:15:00",
      speaker: "Pastor Gavu Nyirongo",
      category: "Youth Ministry",
    },
    {
      id: "4",
      title: "Youth Conference",
      description: "Annual youth conference with worship and teaching.",
      date: "2025-08-28",
      time: "2:00 PM",
      isLive: false,
      viewers: 0,
      duration: "3:00:00",
      speaker: "Pastor Gavu Nyirongo",
      category: "Youth Conference",
    },
    {
      id: "5",
      title: "Women's Meeting",
      description: "A gathering for women to connect and grow in faith.",
      date: "2025-09-05",
      time: "10:00 AM",
      isLive: false,
      viewers: 0,
      duration: "2:00:00",
      speaker: "Pastor Gavu Nyirongo",
      category: "Women's Ministry",
    },
  ];

  const [showSmallGroupDialog, setShowSmallGroupDialog] = useState(false);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [smallGroupEmail, setSmallGroupEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleSmallGroupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!smallGroupEmail.trim()) return;

    setIsSubmitting(true);
    
    try {
      // Simulate sending email to maronnyirongo@gmail.com
      // In production, this would be a real email service
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Thank you! We will contact you about joining a small group.');
      setSmallGroupEmail('');
      setShowSmallGroupDialog(false);
    } catch (error) {
      toast.error('Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleShareService = (platform: string) => {
    const url = window.location.href;
    const text = "Join us for our live service at Mercy Seat Ministries!";
    
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'instagram':
        // Instagram doesn't support direct sharing via URL, so we'll copy the link
        navigator.clipboard.writeText(url);
        toast.success('Link copied! You can paste it in Instagram.');
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        setCopiedLink(true);
        toast.success('Link copied to clipboard!');
        setTimeout(() => setCopiedLink(false), 2000);
        break;
    }
  };

  const handleFacebookLive = () => {
    window.open("https://www.facebook.com/share/1Agq7Kd1f1/?mibextid=qi2Omg", "_blank");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Mercy Seat Connect Live Stream",
        text: "Join us for our live service!",
        url: window.location.href,
      }).catch(() => {
        navigator.clipboard.writeText(window.location.href);
        alert("Live stream link copied to clipboard!");
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Live stream link copied to clipboard!");
    }
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (chatMessage.trim()) {
      console.log("Chat message:", chatMessage); // Replace with backend integration
      setChatMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <header className="container mx-auto px-4 mb-12">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4 flex items-center">
              <Video className="mr-2 h-6 w-6 text-blue-500" /> Live Stream
            </h1>
            <p className="text-gray-600">Join us for live worship services and special events</p>
          </div>
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Live Stream */}
          <div className="lg:col-span-2">
            <Card className="mb-8">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">{liveEvents[0].title}</CardTitle>
                    <CardDescription>{liveEvents[0].description}</CardDescription>
                  </div>
                  {isLive && (
                    <Badge className="bg-red-500 text-white animate-pulse">
                      <div className="w-2 h-2 bg-white rounded-full mr-2" />
                      LIVE
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="grid gap-4">
                {/* Countdown or Live Status */}
                {!isLive ? (
                  <div className="text-center">
                    <h3 className="text-lg font-semibold mb-4">Next Service Starts In:</h3>
                    <div className="grid grid-flow-col gap-5 text-center auto-cols-max mx-auto">
                      <div className="flex flex-col p-2 bg-gray-100 rounded-lg">
                        <span className="font-mono text-3xl font-bold text-gray-800">{countdown.days}</span>
                        <span className="text-sm text-gray-600">Days</span>
                      </div>
                      <div className="flex flex-col p-2 bg-gray-100 rounded-lg">
                        <span className="font-mono text-3xl font-bold text-gray-800">{countdown.hours}</span>
                        <span className="text-sm text-gray-600">Hours</span>
                      </div>
                      <div className="flex flex-col p-2 bg-gray-100 rounded-lg">
                        <span className="font-mono text-3xl font-bold text-gray-800">{countdown.minutes}</span>
                        <span className="text-sm text-gray-600">Minutes</span>
                      </div>
                      <div className="flex flex-col p-2 bg-gray-100 rounded-lg">
                        <span className="font-mono text-3xl font-bold text-gray-800">{countdown.seconds}</span>
                        <span className="text-sm text-gray-600">Seconds</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <Eye className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{viewers.toLocaleString()} watching</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{liveEvents[0].duration}</span>
                      </div>
                    </div>
                    <Button onClick={handleShare} variant="outline" size="sm">
                      <Share2 className="mr-2 h-4 w-4" /> Share
                    </Button>
                  </div>
                )}
                {/* Video Player */}
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ" // Replace with your live stream URL
                    title="Live Stream"
                    allowFullScreen
                    className="rounded-lg"
                  ></iframe>
                </div>
                {/* Service Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Mic className="h-4 w-4 text-gray-600" />
                    <span className="text-gray-600">{liveEvents[0].speaker}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-600" />
                    <span className="text-gray-600">{new Date(liveEvents[0].date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-600" />
                    <span className="text-gray-600">{liveEvents[0].time}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* Live Chat */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageCircle className="h-5 w-5" />
                  <span>Live Chat</span>
                  {isLive && <Badge variant="secondary">Active</Badge>}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gray-50 rounded-lg p-4 mb-4 overflow-y-auto">
                  {isLive ? (
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-bold">J</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium">John D.</p>
                          <p className="text-sm text-gray-600">Praise God! This service is amazing 🙏</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-bold">S</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Sarah M.</p>
                          <p className="text-sm text-gray-600">Thank you for this message, Pastor!</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-bold">M</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Mike R.</p>
                          <p className="text-sm text-gray-600">Praying for everyone watching today ❤️</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-gray-500 py-8">
                      <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p>Chat will be available during live services</p>
                    </div>
                  )}
                </div>
                <form onSubmit={handleChatSubmit} className="flex space-x-2">
                  <Input
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    placeholder="Type your message..."
                    disabled={!isLive}
                  />
                  <Button type="submit" disabled={!isLive || !chatMessage.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Upcoming Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {liveEvents.filter((event) => !event.isLive).map((event) => (
                    <div key={event.id} className="border-l-4 border-blue-500 pl-4">
                      <h4 className="font-semibold text-gray-800">{event.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{new Date(event.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{event.time}</span>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="mt-2">
                        Set Reminder
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={handleFacebookLive}
                >
                  <Facebook className="h-4 w-4 mr-2" /> Watch on Facebook
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => setShowShareDialog(true)}>
                  <Share2 className="h-4 w-4 mr-2" /> Share Service
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => setShowSmallGroupDialog(true)}>
                  <Users className="h-4 w-4 mr-2" /> Join Small Group
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Service Times</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Sunday Morning</span>
                    <span className="text-gray-600">10:00 AM to 1:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Wednesday Cell Meetings </span>
                    <span className="text-gray-600">5:00 PM to 6:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Friday Afternoon </span>
                    <span className="text-gray-600">4:00 PM to 6:00 PM</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Small Group Join Dialog */}
      <Dialog open={showSmallGroupDialog} onOpenChange={setShowSmallGroupDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Join a Small Group</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSmallGroupSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="smallGroupEmail" className="text-sm font-medium">
                  Email Address
                </label>
                <Input
                  id="smallGroupEmail"
                  value={smallGroupEmail}
                  onChange={(e) => setSmallGroupEmail(e.target.value)}
                  placeholder="Enter your email"
                  type="email"
                  required
                />
              </div>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Joining...' : 'Join Small Group'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Share Service Dialog */}
      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share Service</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="sharePlatform" className="text-sm font-medium">
                Share on:
              </label>
              <div className="grid gap-3">
                <Button onClick={() => handleShareService('facebook')} className="w-full bg-blue-600 hover:bg-blue-700">
                  <Facebook className="h-4 w-4 mr-2" />
                  Share on Facebook
                </Button>
                <Button onClick={() => handleShareService('instagram')} className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share on Instagram
                </Button>
                <Button onClick={() => handleShareService('whatsapp')} className="w-full bg-green-600 hover:bg-green-700">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share on WhatsApp
                </Button>
                <Button onClick={() => handleShareService('twitter')} className="w-full bg-black hover:bg-gray-800">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share on X (Twitter)
                </Button>
                <Button 
                  onClick={() => handleShareService('copy')} 
                  variant="outline" 
                  className="w-full"
                >
                  {copiedLink ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                  {copiedLink ? 'Link Copied!' : 'Copy Link'}
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Live;