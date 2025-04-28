import React, { useState } from "react";

// Interface for defining the structure of a single tab
interface AccommodationTab {
  name: string;
  count: string;
  isActive?: boolean;
}

// Interface for defining the props for the AccommodationTabs component
interface hotelLeft {
  hotel: number;
  motel?: number;
  resort?: number;
}

// AccommodationTabs component
const AccommodationTabs: React.FC<hotelLeft> = (
  {
    hotel=0,
    motel=0,
    resort=0,
  }
) => {
  const [activeTab, setActiveTab] = useState("Hotels");

  const tabs: AccommodationTab[] = [
    { name: "Hotels", count: `${hotel} places`, isActive: true },
    { name: "Motels", count: `${motel} places` },
    { name: "Resorts", count: `${resort} places` },
  ];

  return (
    <div className="items-center self-stretch shadow-[0px_4px_16px_0px_rgba(17,34,17,0.05)] bg-white relative flex w-full gap-6 text-[#121] px-6 py-4 rounded-xl max-md:max-w-full max-md:px-5">
      {tabs.map((tab, index) => (
        <React.Fragment key={tab.name}>
          <div
            className="self-stretch z-0 flex flex-col items-stretch justify-center flex-1 shrink basis-[0%] my-auto cursor-pointer"
            onClick={() => setActiveTab(tab.name)}
          >
            <div className="gap-2 text-base font-semibold whitespace-nowrap">
              {tab.name}
            </div>
            <div className="text-sm font-normal opacity-40 mt-2">
              {tab.count}
            </div>
          </div>

          {index < tabs.length - 1 && (
            <div className="border self-stretch z-0 w-0 shrink-0 h-12 my-auto border-[rgba(215,226,238,1)] border-solid" />
          )}
        </React.Fragment>
      ))}

      <div
        className="bg-[#8DB1D3] absolute z-0 min-w-60 w-[248px] shrink-0 h-0 border-[rgba(141,177,211,1)] border-solid border-4 left-[18px] bottom-0"
        style={{
          left:
            activeTab === "Hotels"
              ? "18px"
              : activeTab === "Motels"
                ? "33%"
                : "66%",
          width: activeTab === "Hotels" ? "248px" : "248px",
          transition: "left 0.3s ease",
        }}
      />
    </div>
  );
};

export default AccommodationTabs;