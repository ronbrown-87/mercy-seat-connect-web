import { Button } from '@/components/ui/button';
import { Facebook, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import FeatureNodeMap from '@/components/FeatureNodeMap';
import HeroSlideshow from '@/components/HeroSlideshow';
import logo from '@/assets/logo.png';

const TraditionalHome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroSlideshow>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3">
          <img src={logo} alt="Mercy Seat logo" className="h-12 w-12 rounded-full ring-2 ring-white/40" />
          <span className="rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-sm font-medium text-white">
            Welcome home to Kitwe's house of worship
          </span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="mt-6 text-4xl font-bold text-white drop-shadow-md md:text-6xl"
        >
          Mercy Seat <span className="text-orange-400">Connect</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-4 text-lg text-white drop-shadow-md md:text-xl"
        >
          Connect, grow, and serve with us as we journey together in faith.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mt-8 flex flex-col gap-3 sm:flex-row"
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-orange-500 to-orange-400 font-semibold text-white hover:opacity-90"
            onClick={() => navigate('/learn-more')}
          >
            Learn More About Us
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white/70 bg-white/10 text-white hover:bg-white hover:text-blue-800"
            onClick={() => navigate('/live')}
          >
            Watch Live Service
          </Button>
        </motion.div>
      </HeroSlideshow>

      {/* Interactive Feature Showcase */}
      <FeatureNodeMap />

      {/* Quick Stats */}
      <div className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3">
            <div>
              <div className="mb-2 text-3xl font-bold text-orange-500">500+</div>
              <div className="text-slate-600">Church Members</div>
            </div>
            <div>
              <div className="mb-2 text-3xl font-bold text-orange-500">25+</div>
              <div className="text-slate-600">Ministries</div>
            </div>
            <div>
              <div className="mb-2 text-3xl font-bold text-orange-500">35+</div>
              <div className="text-slate-600">Years of Service</div>
            </div>
          </div>
        </div>
      </div>

      {/* Social Media Links */}
      <div className="mx-auto max-w-7xl px-4 py-16 text-center">
        <h3 className="mb-6 text-2xl font-bold text-blue-800">Connect With Us</h3>
        <div className="flex justify-center space-x-6">
          <Button
            variant="ghost"
            size="icon"
            className="text-blue-600 hover:text-blue-700"
            onClick={() =>
              window.open(
                'https://www.facebook.com/profile.php?id=100068315346662',
                '_blank'
              )
            }
          >
            <Facebook className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-blue-500 hover:text-blue-600"
            onClick={() => window.open('https://www.youtube.com/@MercySeatTV', '_blank')}
          >
            <Globe className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TraditionalHome;
