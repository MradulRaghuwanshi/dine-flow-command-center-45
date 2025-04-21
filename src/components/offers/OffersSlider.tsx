
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Offer = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  backgroundColor: string;
};

type OffersSliderProps = {
  offers: Offer[];
};

export function OffersSlider({ offers }: OffersSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === offers.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? offers.length - 1 : prevIndex - 1
    );
  };
  
  // Auto-advance slides every 5 seconds
  useEffect(() => {
    if (offers.length <= 1) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [offers.length]);
  
  if (offers.length === 0) return null;
  
  return (
    <div className="relative w-full overflow-hidden rounded-lg mb-6">
      <div 
        className="relative h-[200px] transition-all duration-500 ease-in-out"
        style={{ backgroundColor: offers[currentIndex].backgroundColor || "#f3f4f6" }}
      >
        <div className="absolute inset-0 flex items-center">
          {offers[currentIndex].imageUrl && (
            <img 
              src={offers[currentIndex].imageUrl} 
              alt={offers[currentIndex].title}
              className="h-full w-full object-cover absolute inset-0 opacity-20"
            />
          )}
          <div className="relative z-10 p-6 max-w-lg mx-auto text-center">
            <h3 className="text-2xl font-bold mb-2">{offers[currentIndex].title}</h3>
            <p className="text-lg">{offers[currentIndex].description}</p>
          </div>
        </div>
      </div>
      
      {offers.length > 1 && (
        <>
          <Button 
            variant="outline" 
            size="icon" 
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full"
            onClick={nextSlide}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1">
            {offers.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentIndex ? "bg-primary" : "bg-gray-300"
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
