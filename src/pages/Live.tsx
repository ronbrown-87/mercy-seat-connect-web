import { Footer } from "@/components/Footer";
import { UpcomingEvents } from "@/components/UpcomingEvents";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ArrowLeft, Calendar, Check, Clock, Copy, Eye, Facebook, Maximize2, Mic, Minimize2, Play, Share2, Users, Video, X } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const FACEBOOK_VIDEO_EMBED = "https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2F100068315346662%2Fvideos%2F2413507769084446%2F&show_text=false&width=560&t=0";

const Live = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isLive, setIsLive] = useState(false);
  const [viewers, setViewers] = useState(1247);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const playerContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetDate = new Date("2025-08-17T10:00:00");
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      if (difference > 0) {
        setCountdown({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
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

  const toggleFullscreen = useCallback(() => {
    if (!isFullscreen) {
      if (playerContainerRef.current?.requestFullscreen) {
        playerContainerRef.current.requestFullscreen().catch(() => {
          // Fallback: use CSS fullscreen
          setIsFullscreen(true);
        });
      } else {
        setIsFullscreen(true);
      }
    } else {
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => setIsFullscreen(false));
      } else {
        setIsFullscreen(false);
      }
    }
  }, [isFullscreen]);

  useEffect(() => {
    const handler = () => {
      if (!document.fullscreenElement) setIsFullscreen(false);
      else setIsFullscreen(true);
    };
    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, []);

  const [showSmallGroupDialog, setShowSmallGroupDialog] = useState(false);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleShareService = (platform: string) => {
    const url = window.location.href;
    const text = "Join us for our live service at Mercy Seat Ministries!";
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
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
        toast.success("Live stream link copied to clipboard!");
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Live stream link copied to clipboard!");
    }
  };


  const liveEvents = [
    { id: "2", title: "Cell Meetings / Bible Study", description: "Deep dive into God's Word with our midweek Bible study.", date: "2025-08-20", time: "Contact us for details" },
    { id: "3", title: "Youth Ministry Live", description: "Special youth service with contemporary worship.", date: "2025-08-23", time: "6:30 PM" },
    { id: "4", title: "Youth Conference", description: "Annual youth conference with worship and teaching.", date: "2025-08-28", time: "2:00 PM" },
    { id: "5", title: "Women's Meeting", description: "A gathering for women to connect and grow in faith.", date: "2025-09-05", time: "10:00 AM" },
  ];

  return (
    <div className="min-h-screen bg-background pt-20">
      <header className="container mx-auto px-4 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2 flex items-center">
              <Video className="mr-3 h-7 w-7 text-primary" /> Mercy Seat Media
            </h1>
            <p className="text-muted-foreground">Live worship services and on-demand content</p>
          </div>
          <Button variant="ghost" onClick={() => navigate("/")} className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Video Player Area */}
          <div className="lg:col-span-2">
            {/* Immersive Video Player */}
            <div
              ref={playerContainerRef}
              className={`relative rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 ${
                isFullscreen ? 'fixed inset-0 z-[100] rounded-none' : ''
              }`}
              style={{ background: 'linear-gradient(145deg, #0a0a0f 0%, #111827 50%, #0a0a0f 100%)' }}
            >
              {/* Preview Card (before playing) */}
              {!isPlaying ? (
                <div className="relative cursor-pointer group" onClick={() => setIsPlaying(true)}>
                  {/* Thumbnail with dark overlay */}
                  <div className="relative aspect-video">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 z-10" />
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-950/30 to-transparent z-10" />
                    
                    {/* Animated background pattern */}
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute inset-0" style={{
                        backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
                      }} />
                    </div>

                    {/* Church branding placeholder */}
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                      <div className="text-center space-y-4">
                        {/* Play Button */}
                        <div className="mx-auto w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center shadow-lg shadow-primary/30 group-hover:scale-110 group-hover:bg-primary transition-all duration-300">
                          <Play className="w-8 h-8 md:w-10 md:h-10 text-primary-foreground ml-1" fill="currentColor" />
                        </div>
                        <div className="space-y-2 pt-2">
                          <h2 className="text-white text-xl md:text-2xl font-bold tracking-wide">
                            Sunday Morning Service
                          </h2>
                          <p className="text-white/70 text-sm md:text-base">
                            Pastor Gavu Nyirongo • Mercy Seat Ministries
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Live indicator */}
                    {isLive && (
                      <div className="absolute top-4 left-4 z-20 flex items-center space-x-2">
                        <Badge className="bg-red-600 text-white border-0 px-3 py-1 text-sm font-semibold animate-pulse shadow-lg shadow-red-600/40">
                          <div className="w-2 h-2 bg-white rounded-full mr-2 animate-ping" />
                          LIVE
                        </Badge>
                        <Badge className="bg-black/60 backdrop-blur-sm text-white border-0 px-3 py-1 text-sm">
                          <Eye className="w-3 h-3 mr-1.5" />
                          {viewers.toLocaleString()}
                        </Badge>
                      </div>
                    )}

                    {/* Bottom info bar */}
                    <div className="absolute bottom-0 left-0 right-0 z-20 p-4 md:p-6">
                      <div className="flex items-end justify-between">
                        <div className="flex items-center space-x-3 text-white/60 text-xs md:text-sm">
                          <span className="flex items-center"><Calendar className="w-3.5 h-3.5 mr-1" /> Aug 17, 2025</span>
                          <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1" /> 10:00 AM</span>
                        </div>
                        <span className="text-white/40 text-xs tracking-widest uppercase">Tap to play</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Active Video Player */
                <div className={`relative ${isFullscreen ? 'h-full flex flex-col' : ''}`}>
                  {/* Player Controls Bar */}
                  <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between p-3 md:p-4 bg-gradient-to-b from-black/80 to-transparent">
                    <div className="flex items-center space-x-3">
                      {isLive && (
                        <Badge className="bg-red-600 text-white border-0 px-2.5 py-0.5 text-xs font-semibold animate-pulse">
                          <div className="w-1.5 h-1.5 bg-white rounded-full mr-1.5" />
                          LIVE
                        </Badge>
                      )}
                      <span className="text-white/80 text-sm font-medium hidden md:inline">Sunday Morning Service</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {isLive && (
                        <span className="text-white/60 text-xs flex items-center mr-2">
                          <Eye className="w-3 h-3 mr-1" /> {viewers.toLocaleString()}
                        </span>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-white/70 hover:text-white hover:bg-white/10 h-8 w-8 p-0"
                        onClick={handleShare}
                      >
                        <Share2 className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-white/70 hover:text-white hover:bg-white/10 h-8 w-8 p-0"
                        onClick={toggleFullscreen}
                      >
                        {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                      </Button>
                      {isFullscreen && (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-white/70 hover:text-white hover:bg-white/10 h-8 w-8 p-0"
                          onClick={() => {
                            if (document.fullscreenElement) document.exitFullscreen();
                            setIsFullscreen(false);
                            setIsPlaying(false);
                          }}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Embedded Facebook Video - Clean, no social noise */}
                  <div className={`${isFullscreen ? 'flex-1' : 'aspect-video'} relative`}>
                    <iframe
                      src={FACEBOOK_VIDEO_EMBED}
                      className="absolute inset-0 w-full h-full border-0"
                      scrolling="no"
                      frameBorder="0"
                      allowFullScreen
                      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Countdown - Below Player */}
            {!isLive && (
              <Card className="mt-6 border-0 shadow-lg bg-card">
                <CardContent className="py-6">
                  <h3 className="text-center text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">Next Service Starts In</h3>
                  <div className="grid grid-flow-col gap-3 md:gap-5 text-center auto-cols-max mx-auto">
                    {[
                      { val: countdown.days, label: 'Days' },
                      { val: countdown.hours, label: 'Hours' },
                      { val: countdown.minutes, label: 'Minutes' },
                      { val: countdown.seconds, label: 'Seconds' },
                    ].map((item) => (
                      <div key={item.label} className="flex flex-col p-3 rounded-xl bg-muted/50 min-w-[60px]">
                        <span className="font-mono text-2xl md:text-3xl font-bold text-foreground">{item.val}</span>
                        <span className="text-xs text-muted-foreground mt-1">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Service Info */}
            <Card className="mt-4 border-0 shadow-sm">
              <CardContent className="py-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Mic className="h-4 w-4 text-primary" />
                    <span>Pastor Gavu Nyirongo</span>
                  </div>
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span>Sundays</span>
                  </div>
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Clock className="h-4 w-4 text-primary" />
                    <span>10:00 AM</span>
                  </div>
                </div>
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
                  {liveEvents.map((event) => (
                    <div key={event.id} className="border-l-4 border-primary pl-4">
                      <h4 className="font-semibold text-foreground">{event.title}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{event.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <span className="flex items-center space-x-1"><Calendar className="h-3 w-3" /><span>{new Date(event.date).toLocaleDateString()}</span></span>
                        <span className="flex items-center space-x-1"><Clock className="h-3 w-3" /><span>{event.time}</span></span>
                      </div>
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
                <Button variant="outline" className="w-full justify-start" onClick={handleFacebookLive}>
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
                    <span className="font-medium text-foreground">Sunday Morning</span>
                    <span className="text-muted-foreground">10:00 AM to 1:00 PM</span>
                  </div>
                  <div>
                    <span className="font-medium text-foreground">Cell Meetings</span>
                    <p className="text-xs text-muted-foreground mt-1">Contact us for Cell Meetings</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-foreground">Friday Afternoon</span>
                    <span className="text-muted-foreground">4:00 PM to 6:00 PM</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Upcoming Events Section */}
        <div className="mt-12">
          <UpcomingEvents />
        </div>
      </main>

      {/* Small Group Dialog */}
      <Dialog open={showSmallGroupDialog} onOpenChange={setShowSmallGroupDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold bg-gradient-to-r from-primary to-blue-800 bg-clip-text text-transparent">
              Join a Small Group
            </DialogTitle>
            <DialogDescription className="text-center">Small group feature coming soon</DialogDescription>
          </DialogHeader>
          <div className="text-center py-8 space-y-4">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center">
              <Users className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">Please be patient</h3>
            <p className="text-muted-foreground leading-relaxed max-w-sm mx-auto">
              This feature will soon be available. Thank you for your interest in joining a small group!
            </p>
            <div className="pt-4">
              <Button onClick={() => setShowSmallGroupDialog(false)} className="bg-primary hover:bg-primary/90">
                Got it, thank you!
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Share Dialog */}
      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share Service</DialogTitle>
          </DialogHeader>
          <div className="grid gap-3 py-4">
            <Button onClick={() => handleShareService('facebook')} className="w-full bg-blue-600 hover:bg-blue-700">
              <Facebook className="h-4 w-4 mr-2" /> Share on Facebook
            </Button>
            <Button onClick={() => handleShareService('whatsapp')} className="w-full bg-green-600 hover:bg-green-700">
              <Share2 className="h-4 w-4 mr-2" /> Share on WhatsApp
            </Button>
            <Button onClick={() => handleShareService('twitter')} className="w-full bg-black hover:bg-gray-800">
              <Share2 className="h-4 w-4 mr-2" /> Share on X (Twitter)
            </Button>
            <Button onClick={() => handleShareService('copy')} variant="outline" className="w-full">
              {copiedLink ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
              {copiedLink ? 'Link Copied!' : 'Copy Link'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Live;
