import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Heart, 
  ArrowLeft,
  Navigation,
  MessageSquare,
  QrCode,
  Facebook
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const navigate = useNavigate();
  const [showVisitUsDialog, setShowVisitUsDialog] = useState(false);

  const handleGetDirections = () => {
    const address = "R12 Kalukungu Street, Chamboli, Kitwe, Zambia";
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    window.open(googleMapsUrl, '_blank');
  };

  const handleCall = () => {
    window.open('tel:+260972601568', '_self');
  };

  const handleWhatsApp = () => {
    const message = "Hello, I'm interested in learning more about Mercy Seat Ministries.";
    const whatsappUrl = `https://wa.me/260972601568?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleFacebook = () => {
    window.open('https://www.facebook.com/profile.php?id=100068315346662', '_blank');
  };

  const handleEmail = () => {
    window.open('mailto:mercyseatkit@gmail.com?subject=Inquiry about Mercy Seat Ministries', '_self');
  };

  const whatsappQRUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent('https://wa.me/260972601568?text=Hello, I would like to know more about Mercy Seat Ministries.')}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="text-blue-600 hover:text-blue-700"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Contact Us</h1>
              <p className="text-gray-600">Get in touch with our church family</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Get In Touch Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Get In <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Touch</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We'd love to hear from you! Reach out through any of the channels below.
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Location Card */}
          <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-md group">
            <CardContent className="p-6 text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <MapPin className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-800">Our Location</h3>
              <p className="text-gray-600">R12 Kalukungu Street, Chamboli<br />Kitwe, Zambia</p>
              <Button onClick={handleGetDirections} className="w-full bg-blue-600 hover:bg-blue-700">
                <Navigation className="w-4 h-4 mr-2" />
                Get Directions
              </Button>
            </CardContent>
          </Card>

          {/* Phone Card */}
          <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-md group">
            <CardContent className="p-6 text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Phone className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-800">Call Us</h3>
              <p className="text-gray-600">+260 972 601 568</p>
              <Button onClick={handleCall} className="w-full bg-green-600 hover:bg-green-700">
                <Phone className="w-4 h-4 mr-2" />
                Call Now
              </Button>
            </CardContent>
          </Card>

          {/* Email Card */}
          <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-md group">
            <CardContent className="p-6 text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Mail className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-800">Email Us</h3>
              <p className="text-gray-600">mercyseatkit@gmail.com</p>
              <Button onClick={handleEmail} className="w-full bg-purple-600 hover:bg-purple-700">
                <Mail className="w-4 h-4 mr-2" />
                Send Email
              </Button>
            </CardContent>
          </Card>

          {/* Service Hours Card */}
          <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-md group">
            <CardContent className="p-6 text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-amber-100 to-amber-200 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Clock className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-800">Service Times</h3>
              <div className="text-gray-600 text-sm space-y-1">
                <p>Sunday: 10:00 AM - 1:00 PM</p>
                <p>Friday: 4:00 PM - 6:00 PM</p>
                <p className="text-xs text-gray-500 mt-1">Contact us for Cell Meetings</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* WhatsApp QR Code & Social Section */}
        <Card className="border-0 shadow-lg mb-10 overflow-hidden">
          <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 text-white text-center">
            <h3 className="text-2xl font-bold mb-2">Connect on WhatsApp</h3>
            <p className="text-green-100">Scan the QR code or tap the button below</p>
          </div>
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              {/* QR Code */}
              <div className="bg-white p-4 rounded-2xl shadow-inner border-2 border-green-100">
                <img 
                  src={whatsappQRUrl} 
                  alt="WhatsApp QR Code" 
                  className="w-48 h-48 rounded-lg"
                />
              </div>
              {/* Action Buttons */}
              <div className="space-y-4 flex-1 max-w-sm">
                <Button 
                  onClick={handleWhatsApp} 
                  className="w-full bg-green-500 hover:bg-green-600 text-lg py-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Chat on WhatsApp
                </Button>
                <Button 
                  onClick={handleFacebook}
                  variant="outline"
                  className="w-full border-blue-500 text-blue-600 hover:bg-blue-50 text-lg py-6 rounded-xl"
                >
                  <Facebook className="w-5 h-5 mr-2" />
                  Follow on Facebook
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pastoral Care - Without funeral and counselling */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Pastoral Care</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4 text-center">
              Our pastoral team is here to support you through life's journey.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto">
              <div className="flex items-center space-x-2 p-3 bg-blue-50 rounded-lg">
                <Heart className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-gray-700">Hospital visits</span>
              </div>
              <div className="flex items-center space-x-2 p-3 bg-blue-50 rounded-lg">
                <Heart className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-gray-700">Wedding ceremonies</span>
              </div>
              <div className="flex items-center space-x-2 p-3 bg-blue-50 rounded-lg">
                <Heart className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-gray-700">Prayer support</span>
              </div>
              <div className="flex items-center space-x-2 p-3 bg-blue-50 rounded-lg">
                <Heart className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-gray-700">Home visits</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Contact;