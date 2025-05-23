
import { useEffect } from 'react'; // Added useEffect
import { useQuery, useQueryClient } from "@tanstack/react-query"; // Added useQueryClient
import { supabase } from "@/integrations/supabase/client"; // Added supabase import
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Star, AlertTriangle, Loader2 } from "lucide-react"; // Added AlertTriangle and Loader2

// Interface for a listing, matching the Supabase table structure
interface Listing {
  id: number;
  title: string;
  category: string;
  location: string;
  zip_code: string; // Changed from zipCode to zip_code to match Supabase
  price: number;
  rating: number;
  reviews: number;
  image_url: string; // Changed from image to image_url
  category_color: string; // Changed from categoryColor to category_color
  created_at?: string; // Optional, as it's managed by Supabase
}

interface FeaturedListingsProps {
  searchTerm?: string;
  onClearSearch: () => void;
}

// Function to fetch listings from Supabase
const fetchListings = async (): Promise<Listing[]> => {
  const { data, error } = await supabase.from("listings").select("*");
  if (error) {
    console.error("Error fetching listings:", error);
    throw new Error(error.message);
  }
  // console.log("Fetched listings:", data);
  return data || [];
};

const FeaturedListings = ({ searchTerm, onClearSearch }: FeaturedListingsProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient(); // Get query client instance

  const { data: allFeaturedListings = [], isLoading, error } = useQuery<Listing[], Error>({
    queryKey: ['listings'],
    queryFn: fetchListings,
  });

  // Effect for real-time subscriptions
  useEffect(() => {
    // console.log("Setting up Supabase real-time subscription for listings table...");
    const channel = supabase
      .channel('listings-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'listings' },
        (payload) => {
          // console.log('Change received!', payload);
          toast({
            title: "Listings Updated!",
            description: "The rental listings have been updated in real-time.",
          });
          queryClient.invalidateQueries({ queryKey: ['listings'] }); // Invalidate and refetch
        }
      )
      .subscribe((status, err) => {
        if (status === 'SUBSCRIBED') {
          // console.log('Successfully subscribed to listings changes!');
        }
        if (status === 'CHANNEL_ERROR') {
          console.error('Subscription error:', err);
          toast({
            title: "Real-time Error",
            description: "Could not connect to real-time updates. Please refresh.",
            variant: "destructive",
          });
        }
        if (status === 'TIMED_OUT') {
          console.warn('Subscription timed out.');
           toast({
            title: "Real-time Timeout",
            description: "Connection for real-time updates timed out. Please refresh.",
            variant: "destructive",
          });
        }
      });

    // Cleanup subscription on component unmount
    return () => {
      // console.log("Unsubscribing from listings changes.");
      supabase.removeChannel(channel);
    };
  }, [queryClient, toast]); // Added toast to dependency array

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
          (listing.zip_code && listing.zip_code.includes(term)) // Use zip_code
        );
      })
    : allFeaturedListings;

  if (isLoading) {
    return (
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-xl text-gray-600">Loading awesome rentals...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-red-600 mb-2">Oops! Something went wrong.</h2>
          <p className="text-gray-600 mb-4">
            We couldn't fetch the rental listings. Please try refreshing the page.
          </p>
          <p className="text-sm text-gray-500">Error: {error.message}</p>
        </div>
      </div>
    );
  }
  
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
                    src={listing.image_url} // Use image_url
                    alt={listing.title}
                    className="w-full h-full object-cover"
                  />
                  <Badge 
                    className={`absolute top-3 left-3`}
                    style={{ 
                      backgroundColor: `var(--${listing.category_color}, #9b87f5)` // Use category_color
                    }}
                  >
                    {listing.category}
                  </Badge>
                </div>
                
                <CardContent className="pt-4">
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <MapPin size={14} className="mr-1" />
                    <span>{listing.location} ({listing.zip_code})</span> {/* Display zip_code */}
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
                          src={listing.image_url} // Use image_url
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
            <h3 className="text-2xl font-semibold mb-2">
              {searchTerm ? 'No Rentals Found for your Search' : 'No Rentals Available Yet'}
            </h3>
            <p className="text-gray-600 mb-4">
              {searchTerm 
                ? `We couldn't find any rentals matching "${searchTerm}". Try a different search term or view all rentals.`
                : "Check back soon or be the first to list an item!"}
            </p>
            <Button variant="outline" onClick={handleViewAllClick}>
              {searchTerm ? 'View All Rentals' : 'Refresh Listings'}
            </Button>
          </div>
        )}
        
        <div className="mt-8 text-center md:hidden">
          <Button variant="outline" onClick={handleViewAllClick}>
            {filteredListings.length > 0 || searchTerm ? 'View All Rentals' : 'Refresh Listings'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedListings;
