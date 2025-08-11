import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.394a78b577824e618c249ade10916272',
  appName: 'mercy-seat-connect-web',
  webDir: 'dist',
  server: {
    url: 'https://394a78b5-7782-4e61-8c24-9ade10916272.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#1e40af',
      showSpinner: false
    }
  }
};

export default config;