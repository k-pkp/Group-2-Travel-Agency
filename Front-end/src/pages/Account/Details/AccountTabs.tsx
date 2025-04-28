import React, { useState, useEffect, useRef } from "react";
import { useIsMobile } from "../../../hooks/use-mobile";

type Tab = "Account" | "History" | "Payment methods";

// Define the props that the AccountTabs component will receive
interface AccountTabsProps {
  activeTab?: Tab;
  onTabChange?: (tab: Tab) => void;
}

const AccountTabs: React.FC<AccountTabsProps> = ({
  activeTab = "Account",
  onTabChange = () => {},
}) => {
  const [currentTab, setCurrentTab] = useState<Tab>(activeTab);
  const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties>({});
  const isMobile = useIsMobile();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    setCurrentTab(activeTab);
  }, [activeTab]);

  useEffect(() => {
    if (!isMobile) {
      const activeTabElement = tabRefs.current[
        ["Account", "History", "Payment methods"].indexOf(currentTab)
      ];
      
      if (activeTabElement) {
        const tabRect = activeTabElement.getBoundingClientRect();
        const parentRect = activeTabElement.parentElement?.getBoundingClientRect();

        if (parentRect) {
          setIndicatorStyle({
            width: `${tabRect.width}px`,
            left: `${tabRect.left - parentRect.left}px`,
            transition: 'all 0.3s ease-in-out'
          });
        }
      }
    }
  }, [currentTab, isMobile]);

  const handleTabClick = (tab: Tab) => {
    setCurrentTab(tab);
    onTabChange(tab);
  };

  return (
    <nav className="items-center shadow-[0px_4px_16px_0px_rgba(17,34,17,0.05)] bg-white relative flex w-full max-w-[1232px] mx-auto gap-6 text-base text-[#121] font-semibold mt-8 px-6 py-4 rounded-xl max-md:px-5 max-md:flex-col max-md:gap-4">
      {(["Account", "History", "Payment methods"] as Tab[]).map((tab, index) => (
        <React.Fragment key={tab}>
          {index > 0 && !isMobile && (
            <div className="border self-stretch z-0 w-0 shrink-0 h-12 my-auto border-[rgba(215,226,238,1)] border-solid" />
          )}
          <button
            ref={(el) => {
              tabRefs.current[index] = el;
            }}
            className={`self-stretch z-0 flex-1 shrink basis-[0%] my-auto text-center ${
              currentTab === tab ? "font-semibold" : "font-medium opacity-80"
            } cursor-pointer`}
            onClick={() => handleTabClick(tab)}
            aria-selected={currentTab === tab}
          >
            {tab}
          </button>
        </React.Fragment>
      ))}
      
      {!isMobile && (
        <div
          className="bg-[#8DB1D3] absolute z-0 h-0 border-[rgba(141,177,211,1)] border-solid border-4 bottom-0"
          style={indicatorStyle}
        />
      )}
      
      {isMobile && (
        <div
          className={`bg-[#8DB1D3] w-full h-1 border-[rgba(141,177,211,1)] border-solid ${
            currentTab === "Account" 
              ? "mt-1 mb-3" 
              : "hidden"
          }`}
        />
      )}
      
      {isMobile && currentTab === "History" && (
        <div className="bg-[#8DB1D3] w-full h-1 border-[rgba(141,177,211,1)] border-solid mt-1 mb-3" />
      )}
      
      {isMobile && currentTab === "Payment methods" && (
        <div className="bg-[#8DB1D3] w-full h-1 border-[rgba(141,177,211,1)] border-solid mt-1 mb-3" />
      )}
    </nav>
  );
};

export default AccountTabs;
