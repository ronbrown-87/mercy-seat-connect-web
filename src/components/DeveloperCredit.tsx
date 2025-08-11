import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Code, Phone, Mail } from 'lucide-react';

export const DeveloperCredit = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button className="developer-credit rounded-full p-4 shadow-lg hover:shadow-xl">
            <Code className="h-5 w-5 text-white" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <Code className="h-5 w-5" />
              Website Developer
            </DialogTitle>
            <DialogDescription>
              This website was crafted with passion and dedication
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">MN</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">Maron Nyirongo</h3>
              <p className="text-muted-foreground">Full Stack Developer</p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <Phone className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Primary Contact</p>
                  <a href="tel:+260972601568" className="text-primary hover:underline">
                    +260 972 601 568
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <Phone className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Alternative Contact</p>
                  <a href="tel:+260763011947" className="text-primary hover:underline">
                    +260 763 011 947
                  </a>
                </div>
              </div>
            </div>
            
            <div className="text-center text-sm text-muted-foreground">
              <p>Built with ❤️ for Mercy Seat Ministries</p>
              <p className="mt-2">React • TypeScript • Tailwind CSS</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};