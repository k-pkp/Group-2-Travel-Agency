import React from "react";

interface DividerProps {
  text: string;
}

export const Divider: React.FC<DividerProps> = ({ text }) => {
  return (
    <div className="flex w-full items-center gap-4 text-sm text-[#121] font-normal">
      <div className="bg-[rgba(17,34,17,0.25)] self-stretch flex w-[194px] shrink h-px flex-1 basis-[0%]" />
      <div className="opacity-50">{text}</div>
      <div className="bg-[rgba(17,34,17,0.25)] self-stretch flex w-[194px] shrink h-px flex-1 basis-[0%]" />
    </div>
  );
};