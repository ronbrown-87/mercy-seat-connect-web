
import { MapPin, Phone, Mail, Facebook, Instagram, Clock } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Church Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-blue-400">Mercy Seat Ministries</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-blue-400" />
                <span>R12 Kalukungu Street, Chamboli, Kitwe</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-blue-400" />
                <span>0972601568</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-blue-400" />
                <span>mercyseatkit@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-blue-400">Quick Links</h3>
            <div className="space-y-2">
              <a href="/" className="block text-sm hover:text-blue-400 transition-colors">Home</a>
              <a href="/events" className="block text-sm hover:text-blue-400 transition-colors">Events</a>
              <a href="/sermons" className="block text-sm hover:text-blue-400 transition-colors">Sermons</a>
              <a href="/give" className="block text-sm hover:text-blue-400 transition-colors">Give</a>
              <a href="/live" className="block text-sm hover:text-blue-400 transition-colors">Live Stream</a>
            </div>
          </div>

          {/* Service Times */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-blue-400">Service Times</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-blue-400" />
                <span>Sunday: 10:00 AM - 1:00 PM</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-blue-400" />
                <span>Tuesday: 5:00 PM - 6:30 PM</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-blue-400" />
                <span>Wednesday: 5:00 PM - 6:00 PM</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-blue-400" />
                <span>Friday: 6:00 PM - 8:00 PM</span>
              </div>
            </div>
          </div>

          {/* Follow Us & Developer Credit */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-blue-400">Follow Us</h3>
            <div className="flex gap-4 mb-4">
              <a 
                href="https://www.facebook.com/share/1Agq7Kd1f1/?mibextid=qi2Omg" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-blue-600 rounded-full hover:bg-blue-700 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="https://www.instagram.com/maronnorum?igsh=MTl5MjBkYWJ3bGtzdA==" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-pink-600 rounded-full hover:bg-pink-700 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
            
            {/* Developer Credit */}
            <div className="text-sm text-gray-400">
              <p>Website created by{" "}
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="text-blue-400 hover:text-blue-300 underline transition-colors font-medium">
                      Maron Nyirongo
                    </button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle className="text-center text-2xl font-bold text-blue-600">
                        Maron Nyirongo
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6 py-4">
                      <div className="text-center">
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                          <span className="text-2xl font-bold text-white">MN</span>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800">Web Developer</h3>
                        <p className="text-gray-600 text-sm">Creating digital experiences for churches</p>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <Phone className="h-5 w-5 text-blue-600" />
                          <div>
                            <p className="font-medium text-gray-800">Phone Numbers</p>
                            <p className="text-sm text-gray-600">0763011947 / 0972601568</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <Instagram className="h-5 w-5 text-pink-600" />
                          <div>
                            <p className="font-medium text-gray-800">Instagram</p>
                            <a 
                              href="https://www.instagram.com/maronnorum?igsh=MTl5MjBkYWJ3bGtzdA==" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-sm text-pink-600 hover:text-pink-700 underline"
                            >
                              @maronnorum
                            </a>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-center pt-4 border-t">
                        <p className="text-sm text-gray-500">
                          Thank you for visiting Mercy Seat Ministries
                        </p>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-slate-700 text-center text-sm">
          <p className="text-gray-400">
            © 2024 Mercy Seat Ministries. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
