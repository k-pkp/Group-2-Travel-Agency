import React from "react";

interface SocialLoginProps {
  icons: string[];
}

export const SocialLogin: React.FC<SocialLoginProps> = ({ icons }) => {
  return (
    <div className="flex w-full gap-4 flex-wrap">
      {icons.map((icon, index) => (
        <button
          key={index}
          className="justify-center items-center rounded border border-[#8DB1D3] flex flex-col flex-1 shrink basis-[0%] px-6 py-4 border-solid hover:bg-gray-50 transition-colors"
          >
          <img
            src={icon}
            className="aspect-[1] object-contain w-6"
            alt="Social login"
          />
        </button>
      ))}
    </div>
  );
};
