
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";

// Types for promotions
export type Promotion = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  linkUrl: string;
};

// Mock promotions data (in a real app, this would come from an API)
const mockPromotions: Promotion[] = [
  {
    id: "promo1",
    title: "50% Off on All Appetizers",
    description: "Valid on weekdays from 3 PM to 6 PM",
    imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000",
    linkUrl: "/online-menu#appetizers",
  },
  {
    id: "promo2",
    title: "Special Weekend Brunch",
    description: "Enjoy our special brunch menu with complimentary drinks",
    imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1000",
    linkUrl: "/online-menu#brunch",
  },
  {
    id: "promo3",
    title: "Buy 1 Get 1 Free Desserts",
    description: "Every Tuesday and Thursday",
    imageUrl: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=1000",
    linkUrl: "/online-menu#desserts",
  },
];

export default function PromotionSlider() {
  const [promotions, setPromotions] = useState<Promotion[]>(mockPromotions);

  // In a real app, fetch promotions from an API
  useEffect(() => {
    // This would be replaced with an actual API call
    // Example: fetchPromotions().then(data => setPromotions(data));
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto mb-8">
      <Carousel className="w-full">
        <CarouselContent>
          {promotions.map((promotion) => (
            <CarouselItem key={promotion.id}>
              <div className="relative h-[200px] md:h-[300px] w-full rounded-lg overflow-hidden group">
                <img
                  src={promotion.imageUrl}
                  alt={promotion.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 text-white">
                  <Badge className="self-start mb-2 bg-primary">{promotion.title}</Badge>
                  <p className="text-sm mb-3">{promotion.description}</p>
                  <Button
                    size="sm"
                    className="self-start"
                    onClick={() => window.location.href = promotion.linkUrl}
                  >
                    Learn More
                  </Button>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-center gap-2 mt-4">
          <CarouselPrevious className="static translate-y-0 h-8 w-8" />
          <CarouselNext className="static translate-y-0 h-8 w-8" />
        </div>
      </Carousel>
    </div>
  );
}
