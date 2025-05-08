
import { 
  Dog, Purse, Couch, Plant, Trailer, ConcreteMixer,
  Excavator, Camera, PodcastIcon, Surfboard,
  BounceHouse, PhotoBooth, KaraokeMachine,
  Compass, Surprise
} from "lucide-react";

const categoryGroups = [
  {
    name: "Fashion & Beauty",
    color: "fashion",
    items: [
      { name: "Dresses", icon: <Purse size={36} /> },
      { name: "Purses", icon: <Purse size={36} /> },
      { name: "Glasses", icon: <Purse size={36} /> },
      { name: "Jewelry", icon: <Purse size={36} /> },
    ]
  },
  {
    name: "Pets & Animals",
    color: "pets",
    items: [
      { name: "Goats", icon: <Dog size={36} /> },
      { name: "Mini Pigs", icon: <Dog size={36} /> },
      { name: "Therapy Dogs", icon: <Dog size={36} /> },
      { name: "Parrots", icon: <Dog size={36} /> },
    ]
  },
  {
    name: "Furniture & Decor",
    color: "furniture",
    items: [
      { name: "Couches", icon: <Couch size={36} /> },
      { name: "Art", icon: <Couch size={36} /> },
      { name: "Plants", icon: <Plant size={36} /> },
      { name: "Chandeliers", icon: <Couch size={36} /> },
    ]
  },
  {
    name: "Heavy Equipment",
    color: "equipment",
    items: [
      { name: "Excavators", icon: <Excavator size={36} /> },
      { name: "Trailers", icon: <Trailer size={36} /> },
      { name: "Augers", icon: <Excavator size={36} /> },
      { name: "Concrete Mixers", icon: <ConcreteMixer size={36} /> },
    ]
  },
  {
    name: "Events & Entertainment",
    color: "events",
    items: [
      { name: "Bounce Houses", icon: <BounceHouse size={36} /> },
      { name: "Photo Booths", icon: <PhotoBooth size={36} /> },
      { name: "Karaoke Machines", icon: <KaraokeMachine size={36} /> },
      { name: "Party Equipment", icon: <Compass size={36} /> },
    ]
  },
  {
    name: "Media Gear",
    color: "media",
    items: [
      { name: "DSLRs", icon: <Camera size={36} /> },
      { name: "Ring Lights", icon: <Camera size={36} /> },
      { name: "Podcast Kits", icon: <PodcastIcon size={36} /> },
      { name: "Green Screens", icon: <Camera size={36} /> },
    ]
  },
  {
    name: "Lifestyle",
    color: "lifestyle",
    items: [
      { name: "Surfboards", icon: <Surfboard size={36} /> },
      { name: "Hot Tubs", icon: <Compass size={36} /> },
      { name: "Tiny Cabins", icon: <Compass size={36} /> },
      { name: "Glamping Gear", icon: <Compass size={36} /> },
    ]
  },
  {
    name: "Unique Experiences",
    color: "unique",
    items: [
      { name: "Beekeeper for a Day", icon: <Surprise size={36} /> },
      { name: "UFO Detectors", icon: <Surprise size={36} /> },
      { name: "Psychic Reading", icon: <Surprise size={36} /> },
      { name: "Unusual Rentals", icon: <Surprise size={36} /> },
    ]
  },
];

const Categories = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center">Browse by Category</h2>
      <p className="text-gray-600 text-center mb-12">Discover thousands of unique items available for rent</p>
      
      <div className="space-y-12">
        {categoryGroups.map((group) => (
          <div key={group.name} className="animate-fade-in">
            <h3 className="text-2xl font-semibold mb-6 flex items-center">
              <span 
                className={`w-4 h-4 mr-2 rounded-full bg-${group.color}`} 
                style={{ backgroundColor: `var(--${group.color}, #9b87f5)` }} 
              />
              {group.name}
            </h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {group.items.map((item) => (
                <a 
                  href="#" 
                  key={item.name} 
                  className={`category-card bg-${group.color}/10 hover:bg-${group.color}/20 border-2 border-${group.color}/30 hover:border-${group.color}`}
                  style={{ 
                    backgroundColor: `var(--${group.color}, #9b87f5)10`,
                    borderColor: `var(--${group.color}, #9b87f5)30`,
                    "&:hover": {
                      backgroundColor: `var(--${group.color}, #9b87f5)20`,
                      borderColor: `var(--${group.color}, #9b87f5)`
                    }
                  }}
                >
                  <div 
                    className={`absolute inset-0 flex items-center justify-center text-${group.color}`}
                    style={{ color: `var(--${group.color}, #9b87f5)` }}
                  >
                    {item.icon}
                  </div>
                  <div className="mt-auto backdrop-blur-sm bg-white/80 -mx-6 -mb-6 px-6 py-3 border-t border-gray-200">
                    <h4 className="font-semibold">{item.name}</h4>
                  </div>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
