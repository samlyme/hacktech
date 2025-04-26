
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CloudMoon } from "lucide-react";

const Navbar: React.FC = () => {
  return (
    <nav className="w-full backdrop-blur-md bg-sleep-dark-purple/70 sticky top-0 z-50 px-4 py-3">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <CloudMoon className="h-8 w-8 text-sleep-purple" />
          <span className="font-bold text-xl text-white">SleepyCloud</span>
        </Link>
        
        <div className="hidden md:flex gap-6 items-center">
          <Link to="/" className="text-white/80 hover:text-white transition-colors">
            Home
          </Link>
          <Link to="/dashboard" className="text-white/80 hover:text-white transition-colors">
            Dashboard
          </Link>
          <Link to="/upload" className="text-white/80 hover:text-white transition-colors">
            Upload
          </Link>
        </div>
        
        <div className="flex items-center gap-3">
          <Link to="/upload">
            <Button className="bg-sleep-purple hover:bg-sleep-light-purple text-white">
              Upload Recording
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
