import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Heart, 
  MessageCircle,
  ArrowLeft,
  Send,
  CheckCircle,
  Navigation,
  MessageSquare,
  QrCode
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const Contact = () => {
  const navigate = useNavigate();
  const [contactForm, setContactForm] = useState<ContactForm>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showVisitUsDialog, setShowVisitUsDialog] = useState(false);
  const [visitorEmail, setVisitorEmail] = useState('');

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Create email content
      const emailContent = `
New Contact Form Submission from Church Website

Name: ${contactForm.name}
Email: ${contactForm.email}
Phone: ${contactForm.phone}
Subject: ${contactForm.subject}

Message:
${contactForm.message}

Sent from: Church Website Contact Form
Date: ${new Date().toLocaleString()}
      `;

      // Create mailto link to open in user's email client
      const mailtoLink = `mailto:maronnyirongo@gmail.com?subject=Contact Form: ${encodeURIComponent(contactForm.subject)}&body=${encodeURIComponent(emailContent)}`;
      
      // Open email client
      window.location.href = mailtoLink;
      
      setIsSubmitted(true);
      toast.success('Opening your email client to send the message...');
      
      setTimeout(() => {
        setIsSubmitted(false);
        setContactForm({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      }, 3000);
    } catch (error) {
      toast.error('Failed to open email client. Please try again.');
    }
  };

  const handleVisitUsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitorEmail.trim()) return;

    try {
      // Simulate sending visitor info to maronnyirongo@gmail.com
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Thank you! We will contact you with more information.');
      setVisitorEmail('');
      setShowVisitUsDialog(false);
    } catch (error) {
      toast.error('Failed to submit. Please try again.');
    }
  };

  const handleGetDirections = () => {
    // Open Google Maps with the church location
    const address = "R12 Kalukungu Street, Chamboli, Kitwe, Zambia";
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    window.open(googleMapsUrl, '_blank');
  };

  const handleCall = () => {
    window.open('tel:0975448759', '_self');
  };

  const handleWhatsApp = () => {
    const message = "Hello, I'm interested in learning more about Mercy Seat Ministries.";
    const whatsappUrl = `https://wa.me/260975448759?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleQRCode = () => {
    // Generate QR code for contact information
    const contactInfo = "Mercy Seat Ministries\nPhone: 0975448759\nEmail: maronnyirongo@gmail.com\nAddress: R12 Kalukungu Street, Chamboli, Kitwe, Zambia";
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(contactInfo)}`;
    window.open(qrCodeUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="text-amber-600 hover:text-amber-700"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Shelf
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Contact Us</h1>
              <p className="text-gray-600">Get in touch with church leaders</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Get in Touch</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-amber-600 mt-1" />
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-gray-600">R12 Kalukungu Street, Chamboli<br />Kitwe, Zambia</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-amber-600" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-gray-600">0975448759</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-amber-600" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-gray-600">maronnyirongo@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-amber-600" />
                  <div>
                    <p className="font-medium">Office Hours</p>
                    <p className="text-gray-600">Monday - Friday<br />9:00 AM - 5:00 PM</p>
                  </div>
                </div>

                <Dialog open={showVisitUsDialog} onOpenChange={setShowVisitUsDialog}>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-amber-600 hover:bg-amber-700">
                      <Navigation className="w-4 h-4 mr-2" />
                      Visit Us
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Visit Us</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="text-center space-y-4">
                        <div className="flex items-center justify-center space-x-2 text-lg font-medium">
                          <MapPin className="w-5 h-5 text-amber-600" />
                          <span>R12 Kalukungu Street, Chamboli, Kitwe</span>
                        </div>
                        
                        <div className="space-y-3">
                          <Button onClick={handleGetDirections} className="w-full bg-blue-600 hover:bg-blue-700">
                            <Navigation className="w-4 h-4 mr-2" />
                            Get Directions
                          </Button>
                          
                          <Button onClick={handleCall} className="w-full bg-green-600 hover:bg-green-700">
                            <Phone className="w-4 h-4 mr-2" />
                            Call 0975448759
                          </Button>

                          <Button onClick={handleWhatsApp} className="w-full bg-green-500 hover:bg-green-600">
                            <MessageSquare className="w-4 h-4 mr-2" />
                            WhatsApp 0975448759
                          </Button>

                          <Button onClick={handleQRCode} className="w-full bg-gray-600 hover:bg-gray-700">
                            <QrCode className="w-4 h-4 mr-2" />
                            QR Code
                          </Button>
                        </div>

                        <div className="border-t pt-4">
                          <p className="text-sm text-gray-600 mb-2">Enter your email for more information:</p>
                          <form onSubmit={handleVisitUsSubmit} className="space-y-3">
                            <Input
                              type="email"
                              placeholder="your@email.com"
                              value={visitorEmail}
                              onChange={(e) => setVisitorEmail(e.target.value)}
                              required
                            />
                            <Button type="submit" className="w-full">
                              Send Information
                            </Button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-2xl">Pastoral Care</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Our pastoral team is here to support you through life's challenges and celebrations.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Heart className="w-4 h-4 text-amber-600" />
                    <span className="text-sm text-gray-600">Counseling appointments</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Heart className="w-4 h-4 text-amber-600" />
                    <span className="text-sm text-gray-600">Hospital visits</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Heart className="w-4 h-4 text-amber-600" />
                    <span className="text-sm text-gray-600">Wedding ceremonies</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Heart className="w-4 h-4 text-amber-600" />
                    <span className="text-sm text-gray-600">Funeral services</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageCircle className="w-5 h-5" />
                  <span>Contact Form</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isSubmitted ? (
                  <div className="text-center py-8">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Message Sent!</h3>
                    <p className="text-gray-600">Thank you for contacting us. We'll get back to you soon.</p>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={contactForm.name}
                          onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                          placeholder="Your full name"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={contactForm.email}
                          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          value={contactForm.phone}
                          onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                          placeholder="Your phone number"
                        />
                      </div>
                      <div>
                        <Label htmlFor="subject">Subject</Label>
                        <Input
                          id="subject"
                          value={contactForm.subject}
                          onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                          placeholder="What is this about?"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        placeholder="Tell us how we can help you..."
                        rows={5}
                        required
                      />
                    </div>
                    
                    <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700">
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 