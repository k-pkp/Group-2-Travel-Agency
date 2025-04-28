interface HotelInfoProps {
  hotelName: string;
  hotelAddress: string;
  hotelImage: string;
  roomType: string;
  pricePerNight: number;
}

export function HotelInfo({
  hotelName,
  hotelAddress,
  hotelImage,
  roomType,
  pricePerNight,
}: HotelInfoProps) {
  return (
    <div className="w-full">
      <div className="flex w-full items-center gap-[40px_100px] justify-between flex-wrap max-md:max-w-full">
        <div className="self-stretch min-w-60 text-2xl text-[#121] font-normal w-[491px] my-auto max-md:max-w-full">
          <div className="self-stretch flex-1 shrink basis-[0%] max-w-full w-[491px] gap-4 max-md:max-w-full">
            {roomType}
          </div>
        </div>
        <div className="self-stretch text-[32px] text-[#FF8682] font-bold text-right my-auto">
          ${pricePerNight}
          <span className="text-sm leading-[17px]">/night</span>
        </div>
      </div>
      <div className="w-full mt-6 max-md:max-w-full">
        <div className="flex w-full items-center text-[#121] max-md:max-w-full">
          <div className="items-center border-[color:var(--Mint-Green,#8DB1D3)] bg-white self-stretch flex min-w-60 w-full gap-6 flex-wrap flex-1 shrink basis-[0%] my-auto px-8 py-4 rounded-lg border-[0.5px] border-solid max-md:max-w-full max-md:px-5">
            <img
              src={hotelImage}
              alt={hotelName}
              className="aspect-[1] object-contain w-[63px] self-stretch shrink-0 my-auto rounded-xl"
            />
            <div className="self-stretch flex min-w-60 flex-col items-stretch my-auto max-md:max-w-full">
              <div className="text-2xl font-semibold max-md:max-w-full">
                {hotelName}
              </div>
              <div className="flex gap-0.5 text-sm font-medium mt-2">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/8671db91b3d64fe09e949cebc9364f9c/ba0ec444df9651256f8776f62042ea567918ae2b?placeholderIfAbsent=true"
                  alt="Location"
                  className="aspect-[1] object-contain w-[18px] shrink-0"
                />
                <div className="opacity-75">{hotelAddress}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
