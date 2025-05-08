
import { Search, MapPin, Calendar, CreditCard } from "lucide-react";

const steps = [
  {
    icon: <Search className="w-10 h-10 text-primary" />,
    title: "Search & Discover",
    description: "Browse thousands of rentable items across multiple categories."
  },
  {
    icon: <MapPin className="w-10 h-10 text-primary" />,
    title: "Find Nearby",
    description: "Use your location or ZIP code to find rentals in your area."
  },
  {
    icon: <Calendar className="w-10 h-10 text-primary" />,
    title: "Book & Schedule",
    description: "Choose your rental dates and make a reservation."
  },
  {
    icon: <CreditCard className="w-10 h-10 text-primary" />,
    title: "Pay & Enjoy",
    description: "Secure payment and enjoy your rental for as long as you need."
  }
];

const HowItWorks = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">How Rentiverse Works</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Renting has never been easier. Follow these simple steps to find and rent anything you need.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, index) => (
          <div 
            key={index} 
            className="flex flex-col items-center text-center p-6 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="mb-4 bg-primary/10 p-4 rounded-full">
              {step.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            <p className="text-gray-600">{step.description}</p>
            
            {index < steps.length - 1 && (
              <div className="hidden lg:block absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2">
                <div className="w-6 h-0.5 bg-gray-300"></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
