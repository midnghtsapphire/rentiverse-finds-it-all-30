
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Star } from "lucide-react";

// Mock data for featured listings with added zipCode
const allFeaturedListings = [
  {
    id: 1,
    title: "Professional DSLR Camera Kit",
    category: "Media Gear",
    location: "Seattle, WA",
    zipCode: "98101", // Added zipCode
    price: 75,
    rating: 4.9,
    reviews: 128,
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=500&q=60",
    categoryColor: "media"
  },
  {
    id: 2,
    title: "Vintage Wood Farmhouse Table",
    category: "Furniture & Decor",
    location: "Portland, OR",
    zipCode: "97204", // Added zipCode
    price: 45,
    rating: 4.7,
    reviews: 84,
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=500&q=60",
    categoryColor: "furniture"
  },
  {
    id: 3,
    title: "Designer Evening Gown",
    category: "Fashion & Beauty",
    location: "Los Angeles, CA",
    zipCode: "90012", // Added zipCode
    price: 120,
    rating: 4.8,
    reviews: 57,
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=500&q=60",
    categoryColor: "fashion"
  },
  {
    id: 4,
    title: "Friendly Bengal Cat (Per Day)",
    category: "Pets & Animals",
    location: "San Francisco, CA",
    zipCode: "94102", // Added zipCode
    price: 60,
    rating: 5.0,
    reviews: 42,
    image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=500&q=60",
    categoryColor: "pets"
  }
];

interface FeaturedListingsProps {
  searchTerm?: string;
  onClearSearch: () => void;
}

const FeaturedListings = ({ searchTerm, onClearSearch }: FeaturedListingsProps) => {
  const { toast } = useToast();
  
  const handleRentNow = (title: string) => {
    toast({
      title: "Rental Request Sent!",
      description: `You've requested to rent: ${title}. The owner will contact you soon.`,
    });
  };

  const handleViewAllClick = () => {
    onClearSearch();
    toast({
      title: "Showing All Rentals",
      description: "Displaying all featured rentals.",
    });
  };

  const filteredListings = searchTerm && searchTerm.trim() !== "" 
    ? allFeaturedListings.filter(listing => {
        const term = searchTerm.toLowerCase();
        return (
          listing.title.toLowerCase().includes(term) || 
          listing.location.toLowerCase().includes(term) ||
          (listing.zipCode && listing.zipCode.includes(term)) // Updated filter logic
        );
      })
    : allFeaturedListings;

  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">Featured Rentals</h2>
            <p className="text-gray-600 mt-2">
              {searchTerm ? `Showing results for "${searchTerm}"` : "Popular items people are renting right now"}
            </p>
          </div>
          <Button variant="outline" className="hidden md:flex" onClick={handleViewAllClick}>View All</Button>
        </div>

        {filteredListings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredListings.map((listing) => (
              <Card key={listing.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={listing.image} 
                    alt={listing.title}
                    className="w-full h-full object-cover"
                  />
                  <Badge 
                    className={`absolute top-3 left-3`}
                    style={{ 
                      backgroundColor: `var(--${listing.categoryColor}, #9b87f5)`
                    }}
                  >
                    {listing.category}
                  </Badge>
                </div>
                
                <CardContent className="pt-4">
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <MapPin size={14} className="mr-1" />
                    <span>{listing.location}</span>
                  </div>
                  
                  <h3 className="font-semibold text-lg mb-1 line-clamp-1">{listing.title}</h3>
                  
                  <div className="flex items-center text-sm mb-2">
                    <Star size={14} className="text-yellow-500 mr-1" />
                    <span className="font-medium">{listing.rating}</span>
                    <span className="text-gray-500 ml-1">({listing.reviews} reviews)</span>
                  </div>
                  
                  <div className="font-bold text-lg">${listing.price}<span className="text-sm font-normal text-gray-500">/day</span></div>
                </CardContent>
                
                <CardFooter className="pt-0">
                  <Button 
                    onClick={() => handleRentNow(listing.title)}
                    className="w-full bg-primary hover:bg-primary/90"
                  >
                    <div className="flex items-center justify-center w-full">
                      <div className="h-5 w-5 rounded-full overflow-hidden mr-2">
                        <img 
                          src={listing.image} 
                          alt="Thumbnail" 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <span>Rent Now</span>
                    </div>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <h3 className="text-2xl font-semibold mb-2">No Rentals Found</h3>
            <p className="text-gray-600 mb-4">
              We couldn't find any rentals matching "{searchTerm}". Try a different search term or view all rentals.
            </p>
            <Button variant="outline" onClick={handleViewAllClick}>View All Rentals</Button>
          </div>
        )}
        
        <div className="mt-8 text-center md:hidden">
          <Button variant="outline" onClick={handleViewAllClick}>View All Rentals</Button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedListings;

