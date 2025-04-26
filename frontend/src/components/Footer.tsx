
import { CloudMoon } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-sleep-dark-purple/80 backdrop-blur-md border-t border-sleep-purple/20 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <CloudMoon className="h-6 w-6 text-sleep-purple" />
            <span className="font-bold text-lg text-white">SleepyCloud</span>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6 mb-4 md:mb-0 items-center">
            <Link to="/" className="text-white/70 hover:text-white transition-colors">
              Home
            </Link>
            <Link to="/dashboard" className="text-white/70 hover:text-white transition-colors">
              Dashboard
            </Link>
            <Link to="/upload" className="text-white/70 hover:text-white transition-colors">
              Upload
            </Link>
          </div>
          
          <div className="text-white/50 text-sm">
            &copy; {year} SleepyCloud. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
