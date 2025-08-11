
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

export const Hero = () => {
  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 text-white overflow-hidden">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/40"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating circles with gentle movement */}
        <div className="absolute top-20 left-20 w-32 h-32 border border-white/20 rounded-full animate-float-slow"></div>
        <div className="absolute bottom-40 right-32 w-24 h-24 border border-white/15 rounded-full animate-float-medium"></div>
        <div className="absolute top-1/2 right-20 w-16 h-16 border border-white/10 rounded-full animate-float-fast"></div>
        <div className="absolute top-32 right-1/3 w-20 h-20 border border-white/12 rounded-full animate-float-reverse"></div>
        <div className="absolute bottom-20 left-1/4 w-28 h-28 border border-white/8 rounded-full animate-float-slow"></div>

        {/* Gentle wave animations */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-blue-800/30 to-transparent animate-wave-slow"></div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-blue-700/20 to-transparent animate-wave-medium"></div>

        {/* Subtle light rays */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-radial from-yellow-400/5 via-transparent to-transparent animate-pulse-gentle"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-radial from-blue-300/5 via-transparent to-transparent animate-pulse-gentle-delayed"></div>

        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/30 rounded-full animate-float-particle"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-white/40 rounded-full animate-float-particle-delayed"></div>
        <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-white/25 rounded-full animate-float-particle-slow"></div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-fade-in">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Welcome to
          <span className="block text-yellow-400">Mercy Seat</span>
          <span className="block">Ministries</span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-2xl mx-auto leading-relaxed">
          A place of worship, fellowship, and spiritual growth in the heart of Kitwe
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Button 
            size="lg" 
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-4 text-lg transition-all duration-300 hover:scale-105"
            onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Join Us This Sunday
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 text-lg transition-all duration-300 hover:scale-105"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Contact Us
          </Button>
        </div>

        <div className="flex justify-center mb-12">
          <Button 
            size="lg" 
            variant="outline" 
            className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-blue-900 px-6 py-3 transition-all duration-300 hover:scale-105"
            onClick={() => window.open('https://www.facebook.com/share/1Agq7Kd1f1/?mibextid=qi2Omg','_blank')}
          >
            Watch Live on Facebook
          </Button>
        </div>

        <div className="text-center">
          <p className="text-lg mb-4">Sunday Service: 10:00 AM - 1:00 PM</p>
          <p className="text-sm text-blue-200">Chamboli, R12 Kalukungu Street, Kitwe</p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={scrollToAbout}
          className="text-white hover:text-yellow-400 transition-colors"
        >
          <ArrowDown className="h-6 w-6" />
        </Button>
      </div>
    </section>
  );
};
