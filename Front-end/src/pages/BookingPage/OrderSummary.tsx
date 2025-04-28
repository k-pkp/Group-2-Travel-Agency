import { Button } from "@/components/ui/button";

interface PriceDetail {
  label: string;
  amount: string;
}

interface OrderSummaryProps {
  hotelName: string;
  roomType: string;
  rating: string;
  reviews: string;
  hotelImage: string;
  priceDetails: PriceDetail[];
  totalAmount: string;
  onContinue: () => void;
}

export function OrderSummary({
  hotelName,
  roomType,
  rating,
  reviews,
  hotelImage,
  priceDetails,
  totalAmount,
  onContinue,
}: OrderSummaryProps) {
  return (
    <div className="relative item-center shadow-[0px_4px_16px_0px_rgba(17,34,17,0.05)] bg-white min-w-60 overflow-hidden text-[#121] flex-1 shrink basis-[0%] p-6 rounded-xl max-md:max-w-full max-md:px-5 flex flex-col">
      <div className="flex w-full items-stretch gap-6">
        <img
          src={hotelImage}
          alt={hotelName}
          className="aspect-[1.01] object-contain w-[121px] min-h-[120px] shrink-0 my-auto rounded-xl"
        />
        <div className="flex min-w-60 flex-col items-stretch justify-center w-[257px]">
          <div className="w-full">
            <div className="text-base font-medium opacity-75">{hotelName}</div>
            <div className="text-xl font-semibold mt-1">{roomType}</div>
          </div>
          <div className="flex w-full items-center gap-2 text-xs font-medium mt-4">
            <div className="self-stretch whitespace-nowrap w-10 my-auto">
              <div className="self-stretch rounded border border-[color:var(--Mint-Green,#8DB1D3)] min-h-8 w-full gap-1 px-[11px] py-[9px] border-solid">
                {rating}
              </div>
            </div>
            <div className="self-stretch my-auto">
              <span className="font-bold">Very Good</span> {reviews} reviews
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[rgba(17,34,17,0.25)] flex min-h-px w-full mt-4" />
      <div className="text-base font-medium mt-4">
        Your booking is protected by <span className="font-bold">Travelokè</span>
      </div>
      <div className="bg-[rgba(17,34,17,0.25)] flex min-h-0 w-full mt-4" />
      <div className="w-full text-base mt-4">
        <div className="font-semibold mb-2">Price Details</div>
        {priceDetails.map((detail, index) => (
          <div
            key={index}
            className="flex w-full gap-[40px_100px] justify-between mt-4"
          >
            <div className="font-medium">{detail.label}</div>
            <div className="font-semibold">{detail.amount}</div>
          </div>
        ))}
      </div>
      <div className="bg-[rgba(17,34,17,0.25)] flex min-h-px w-full mt-4" />
      <div className="flex w-full gap-[40px_100px] text-base justify-between mt-4">
        <div className="font-semibold">Total</div>
        <div className="font-semibold">{totalAmount}</div>
      </div>
      
      <Button 
        className="absolute bg-[#8DB1D3] text-[#112211] transition duration-500 hover:bg-[#6c9bc7] hover:text-[#112211] cursor-pointer font-medium py-3 mx-5 bottom-10 inset-x-0 text-lg"
        onClick={onContinue}
      >
        Continue
      </Button>
    </div>
  );
}