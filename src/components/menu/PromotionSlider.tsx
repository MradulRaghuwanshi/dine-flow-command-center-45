
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

// Accept promotions as props for dynamic updates!
export type Promotion = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  linkUrl: string;
};

type PromotionSliderProps = {
  promotions: Promotion[];
};

export default function PromotionSlider({ promotions }: PromotionSliderProps) {
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
