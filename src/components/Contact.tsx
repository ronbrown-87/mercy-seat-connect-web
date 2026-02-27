
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Facebook, MessageSquare } from "lucide-react";

export const Contact = () => {
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
    window.open('mailto:mercyseatkit@gmail.com?subject=Inquiry about Mercy Seat Ministries', '_self');
  };

  const whatsappQRUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent('https://wa.me/260972601568?text=Hello, I would like to know more about Mercy Seat Ministries.')}`;

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Get In <span className="text-blue-600">Touch</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We'd love to hear from you! Reach out to us through any of the channels below.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Location */}
          <Card className="hover:shadow-lg transition-shadow duration-300 text-center">
            <CardHeader>
              <div className="w-14 h-14 mx-auto bg-blue-100 rounded-2xl flex items-center justify-center mb-3">
                <MapPin className="h-7 w-7 text-blue-600" />
              </div>
              <CardTitle className="text-xl font-bold text-gray-800">
                Our Location
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-gray-600 leading-relaxed">
                R12 Kalukungu Street, Chamboli<br />
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

          {/* Phone */}
          <Card className="hover:shadow-lg transition-shadow duration-300 text-center">
            <CardHeader>
              <div className="w-14 h-14 mx-auto bg-green-100 rounded-2xl flex items-center justify-center mb-3">
                <Phone className="h-7 w-7 text-green-600" />
              </div>
              <CardTitle className="text-xl font-bold text-gray-800">
                Call Us
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-gray-600">+260 972 601 568</p>
              <Button 
                onClick={callPhone}
                className="bg-green-600 hover:bg-green-700 transition-colors"
              >
                Call Now
              </Button>
            </CardContent>
          </Card>

          {/* WhatsApp */}
          <Card className="hover:shadow-lg transition-shadow duration-300 text-center">
            <CardHeader>
              <div className="w-14 h-14 mx-auto bg-green-100 rounded-2xl flex items-center justify-center mb-3">
                <MessageSquare className="h-7 w-7 text-green-500" />
              </div>
              <CardTitle className="text-xl font-bold text-gray-800">
                WhatsApp
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="bg-white p-2 rounded-xl inline-block border">
                <img src={whatsappQRUrl} alt="WhatsApp QR Code" className="w-32 h-32 rounded" />
              </div>
              <Button 
                onClick={openWhatsApp}
                className="w-full bg-green-500 hover:bg-green-600 transition-colors"
              >
                Chat on WhatsApp
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Social Connect */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={openWhatsApp}
            className="bg-green-500 hover:bg-green-600 text-lg py-6 px-8 rounded-xl"
          >
            <MessageSquare className="h-5 w-5 mr-2" />
            WhatsApp Us
          </Button>
          <Button 
            onClick={openFacebook}
            variant="outline"
            className="border-blue-500 text-blue-600 hover:bg-blue-50 text-lg py-6 px-8 rounded-xl"
          >
            <Facebook className="h-5 w-5 mr-2" />
            Follow on Facebook
          </Button>
          <Button 
            onClick={sendEmail}
            variant="outline"
            className="border-purple-500 text-purple-600 hover:bg-purple-50 text-lg py-6 px-8 rounded-xl"
          >
            Email Us
          </Button>
        </div>
      </div>
    </section>
  );
};