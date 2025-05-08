
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin } from "lucide-react";

const Header = () => {
  const [location, setLocation] = useState("");

  const handleUseMyLocation = () => {
    // In a real implementation, this would use the browser's geolocation API
    alert("This would use your device's geolocation to find rentals near you!");
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold mr-2">
            <span className="gradient-text">Rentiverse</span>
          </h1>
          <span className="text-xs bg-fashion/20 text-fashion px-2 py-1 rounded-full">
            beta
          </span>
        </div>
        
        <div className="hidden md:flex items-center space-x-4">
          <div className="relative flex items-center w-96">
            <div className="absolute left-3 text-gray-400">
              <MapPin size={18} />
            </div>
            <Input 
              type="text" 
              className="pl-10 pr-4 py-2" 
              placeholder="Enter ZIP code or city" 
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <Button size="sm" className="absolute right-1 bg-primary">
              <Search size={18} />
            </Button>
          </div>
          <Button variant="ghost" onClick={handleUseMyLocation}>
            Use My Location
          </Button>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="outline" className="hidden sm:flex">Sign In</Button>
          <Button className="bg-primary">List Your Rental</Button>
        </div>
      </div>

      {/* Mobile search - only visible on small screens */}
      <div className="md:hidden px-4 pb-3">
        <div className="relative flex items-center">
          <div className="absolute left-3 text-gray-400">
            <MapPin size={18} />
          </div>
          <Input 
            type="text" 
            className="pl-10 pr-4 py-2" 
            placeholder="Enter ZIP code or city" 
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <Button size="sm" className="absolute right-1 bg-primary">
            <Search size={18} />
          </Button>
        </div>
        <Button 
          variant="link" 
          className="text-sm mt-1 w-full justify-center"
          onClick={handleUseMyLocation}
        >
          Use My Location
        </Button>
      </div>
    </header>
  );
};

export default Header;
