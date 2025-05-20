import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface HeaderProps {
  onSearch: (term: string) => void;
}

const Header = ({ onSearch }: HeaderProps) => {
  const [location, setLocation] = useState("");
  const [activeTab, setActiveTab] = useState("search");
  const { toast } = useToast();

  const handleSearchSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (location.trim().length === 0) {
      toast({
        title: "Please enter a location",
        description: "Enter a ZIP code or city to continue",
      });
      return;
    }
    onSearch(location);
    toast({
      title: "Searching for rentals",
      description: `Finding rentals near ${location}...`
    });
  };

  const handleUseMyLocation = () => {
    toast({
      title: "Using your location",
      description: "Finding rentals near your current location..."
    });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          toast({
            title: "Location detected",
            description: `Latitude: ${position.coords.latitude.toFixed(2)}, Longitude: ${position.coords.longitude.toFixed(2)}`,
          });
        },
        () => {
          toast({
            title: "Location access denied",
            description: "Please enable location services or enter your ZIP code manually",
            variant: "destructive"
          });
        }
      );
    } else {
      toast({
        title: "Geolocation not supported",
        description: "Your browser doesn't support geolocation. Please enter your ZIP code manually",
        variant: "destructive"
      });
    }
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
          <Tabs defaultValue="search" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="bg-muted/50 p-1 rounded-lg mb-2">
              <TabsTrigger 
                value="search" 
                className="data-[state=active]:bg-white data-[state=active]:shadow-sm px-4 py-2 rounded-md"
              >
                Search
              </TabsTrigger>
              <TabsTrigger 
                value="browse" 
                className="data-[state=active]:bg-white data-[state=active]:shadow-sm px-4 py-2 rounded-md"
              >
                Browse
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <form className="relative flex items-center w-96" onSubmit={handleSearchSubmit}>
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
            <Button size="sm" type="submit" className="absolute right-1 bg-primary">
              <Search size={18} />
            </Button>
          </form>
          <Button variant="ghost" onClick={handleUseMyLocation}>
            <MapPin className="mr-2" /> {/* Added MapPin icon */}
            Use My Location
          </Button>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="outline" className="hidden sm:flex"
            onClick={() => {
              toast({
                title: "Sign In",
                description: "Sign in functionality would open here"
              });
            }}
          >
            Sign In
          </Button>
          <Button className="bg-primary" 
            onClick={() => {
              toast({
                title: "List Your Rental",
                description: "The rental listing form would open here"
              });
            }}
          >
            List Your Rental
          </Button>
        </div>
      </div>

      {/* Mobile view - with proper horizontal tabs */}
      <div className="md:hidden px-4 pb-3">
        <Tabs defaultValue="search" value={activeTab} onValueChange={setActiveTab} className="w-full mb-2">
          <TabsList className="w-full bg-muted/50 p-1 rounded-lg flex justify-evenly">
            <TabsTrigger 
              value="search" 
              className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm px-4 py-2 rounded-md"
            >
              Search
            </TabsTrigger>
            <TabsTrigger 
              value="browse" 
              className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm px-4 py-2 rounded-md"
            >
              Browse
            </TabsTrigger>
          </TabsList>
        </Tabs>
        
        <form className="relative flex items-center" onSubmit={handleSearchSubmit}>
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
          <Button size="sm" type="submit" className="absolute right-1 bg-primary">
            <Search size={18} />
          </Button>
        </form>
        <Button 
          variant="link" 
          className="text-sm mt-1 w-full justify-center"
          onClick={handleUseMyLocation}
        >
          <MapPin className="mr-2" /> {/* Added MapPin icon */}
          Use My Location
        </Button>
      </div>
    </header>
  );
};

export default Header;
