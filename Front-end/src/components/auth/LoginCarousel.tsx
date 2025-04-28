import React, { useState, useCallback, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel.tsx";

const images = [
  "https://images.unsplash.com/photo-1739793669651-3274b0768492?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1679621776695-80b6de22ce28?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzM3x8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1741705877378-124c4c259e30?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzOXx8fGVufDB8fHx8fA%3D%3D",
];

export const LoginCarousel: React.FC = () => {
  const [api, setApi] = useState<any>(null);
  const [current, setCurrent] = useState(0);

  const onSelect = useCallback(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
  }, [api]);

  useEffect(() => {
    if (!api) return;
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api, onSelect]);

  return (
    <div className="relative w-full h-full">
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          {images.map((src, index) => (
            <CarouselItem key={index} className="pl-0">
              <img
                src={src}
                alt={`Login illustration ${index + 1}`}
                className="aspect-[0.76] object-contain w-full rounded-[0px_0px_0px_0px]"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 mt-4">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className="focus:outline-none"
            >
              {index === current ? (
                <div
                  className="h-2 bg-[#8DB1D3] rounded-full"
                  style={{ width: '40px' }}
                />
              ) : (
                <div className="w-2 h-2 rounded-full bg-white opacity-60" />
              )}
            </button>
          ))}
        </div>
      </Carousel>
    </div>
  );
};
