import React, { useState, useEffect } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ImageIcon } from "lucide-react";
import { useLocation } from "react-router-dom";

// Define types for the image response from the API
interface ImageApiResponse {
  image_id: number;
  url1: string;
  url2?: string;
  url3?: string;
  url4?: string;
  url5?: string;
  HotelID: number;
}

// Define the structure of an image object with src and alt properties
interface Image {
  src: string;
  alt: string;
}

// HotelGallery component to display the images
const HotelGallery: React.FC = () => {
  const location = useLocation();
  const [openDialog, setOpenDialog] = useState(false);
  const [img, setImg] = useState<Image[]>([]);

  const queryParams = new URLSearchParams(location.search);
  const hotelIdParam = queryParams.get("id");
  const hotelId = hotelIdParam ? Number(hotelIdParam) : null;

  useEffect(() => {
    fetch("http://localhost:8081/image")
      .then((res) => res.json())
      .then((json: ImageApiResponse[]) => {
        let mappedImages: Image[] = [];
        if (hotelId !== null) {
          // Find the row matching the hotel id
          const matchingRow = json.find(item => item.HotelID === hotelId);
          if (matchingRow) {
            // For each URL field, if present, push an object into the array.
            if (matchingRow.url1) {
              mappedImages.push({ 
                src: matchingRow.url1, 
                alt: `Image 1 for HotelID ${matchingRow.HotelID}` 
              });
            }
            if (matchingRow.url2) {
              mappedImages.push({ 
                src: matchingRow.url2, 
                alt: `Image 2 for HotelID ${matchingRow.HotelID}` 
              });
            }
            if (matchingRow.url3) {
              mappedImages.push({ 
                src: matchingRow.url3, 
                alt: `Image 3 for HotelID ${matchingRow.HotelID}` 
              });
            }
            if (matchingRow.url4) {
              mappedImages.push({ 
                src: matchingRow.url4, 
                alt: `Image 4 for HotelID ${matchingRow.HotelID}` 
              });
            }
            if (matchingRow.url5) {
              mappedImages.push({ 
                src: matchingRow.url5, 
                alt: `Image 5 for HotelID ${matchingRow.HotelID}` 
              });
            }
          }
        }
        setImg(mappedImages);
      })
      .catch((error) => console.error("Error fetching images:", error));
  }, [hotelId]);

  
  if (!img.length) {
    return <p>No images available for this hotel.</p>;
  }

  // Create the gallery layout with the fetched images
  const previewGallery = (
    <div className="min-h-[550px] gap-2 flex-wrap mt-[33px] max-md:max-w-full grid grid-cols-2">
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger asChild>
          <button className="aspect-[1.11] object-contain w-full min-w-60 flex-1 shrink basis-[0%] rounded-[12px_0px_0px_12px] max-md:max-w-full relative group cursor-pointer overflow-hidden">
            <img
              src={img[0].src}
              alt={img[0].alt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <ImageIcon className="w-10 h-10 text-white" />
            </div>
          </button>
        </DialogTrigger>
        
        <div className="min-w-60 flex-1 shrink basis-[0%] max-md:max-w-full">
          <div className="grid grid-cols-2 gap-2">
            {img.slice(1).map((image, index) => (
              <DialogTrigger asChild key={index}>
                <button className="aspect-[1.11] object-contain w-full min-w-60 flex-1 shrink basis-[0%] relative group cursor-pointer overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <ImageIcon className="w-8 h-8 text-white" />
                  </div>
                </button>
              </DialogTrigger>
            ))}
          </div>
        </div>

        <DialogContent className="max-w-7xl w-[90vw]">
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-4">Hotel Photos</h3>
            <Carousel className="w-full">
              <CarouselContent>
                {img.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="flex items-center justify-center p-1">
                      <img 
                        src={image.src}
                        alt={image.alt}
                        className="max-h-[80vh] object-contain mx-auto"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4" />
              <CarouselNext className="right-4" />
            </Carousel>
            <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
              {img.map((image, index) => (
                <img 
                  key={index}
                  src={image.src}
                  alt={`Thumbnail ${index + 1}`}
                  className="h-20 w-32 object-cover rounded cursor-pointer"
                />
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );

  return previewGallery;
};

// Export the HotelGallery component for use in other parts of the application
export default HotelGallery;