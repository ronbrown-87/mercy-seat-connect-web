
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Facebook } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. We'll get back to you soon.",
    });
    setFormData({ name: '', email: '', message: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const openGoogleMaps = () => {
    const address = "Chamboli, R12 Kalukungu Street, Kitwe, Zambia";
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
  };

  const openWhatsApp = () => {
    const phoneNumber = "260972601568";
    const message = "Hello, I would like to know more about Mercy Seat Ministries.";
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  const openFacebook = () => {
    window.open('https://www.facebook.com/share/1Agq7Kd1f1/?mibextid=qi2Omg', '_blank');
  };

  const callPhone = () => {
    window.open('tel:+260972601568', '_self');
  };

  const sendEmail = () => {
    window.open('mailto:maronnyirongo@gmail.com?subject=Inquiry about Mercy Seat Ministries', '_self');
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Get In <span className="text-blue-600">Touch</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We'd love to hear from you! Reach out to us for any questions, prayer requests, or to learn more about our ministry.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center text-xl font-bold text-gray-800">
                  <MapPin className="h-6 w-6 mr-3 text-blue-600" />
                  Our Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Chamboli, R12 Kalukungu Street<br />
                  Kitwe, Zambia
                </p>
                <Button 
                  onClick={openGoogleMaps}
                  className="bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                  View on Google Maps
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center text-xl font-bold text-gray-800">
                  <Phone className="h-6 w-6 mr-3 text-green-600" />
                  Contact Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-gray-600 mb-2">Phone:</p>
                  <Button 
                    variant="outline" 
                    onClick={callPhone}
                    className="w-full justify-start hover:bg-green-50"
                  >
                    +260 972 601 568
                  </Button>
                </div>
                <div>
                  <p className="text-gray-600 mb-2">Email:</p>
                  <Button 
                    variant="outline" 
                    onClick={sendEmail}
                    className="w-full justify-start hover:bg-blue-50"
                  >
                    maronnyirongo@gmail.com
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-800">
                  Connect With Us
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  onClick={openWhatsApp}
                  className="w-full bg-green-500 hover:bg-green-600 transition-colors"
                >
                  WhatsApp Us
                </Button>
                <Button 
                  onClick={openFacebook}
                  variant="outline"
                  className="w-full border-blue-500 text-blue-500 hover:bg-blue-50 transition-colors"
                >
                  <Facebook className="h-4 w-4 mr-2" />
                  Follow us on Facebook
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-800">
                Send Us a Message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    required
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                    required
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Share your message, prayer request, or questions..."
                    required
                    className="w-full min-h-[120px]"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700 transition-colors text-lg py-3"
                >
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
