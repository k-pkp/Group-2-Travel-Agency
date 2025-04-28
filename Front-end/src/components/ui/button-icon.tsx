import * as React from "react";
import { cn } from "@/lib/utils";

// Define the props for the ButtonIcon component
interface ButtonIconProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: string;
  className?: string;
}

// Create the ButtonIcon component using React.forwardRef to forward refs to the button element
const ButtonIcon = React.forwardRef<HTMLButtonElement, ButtonIconProps>(
  ({ icon, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "justify-center items-center rounded border border-[#8DB1D3] flex min-h-12 w-12 gap-1 h-12 px-3.5 border-solid",
          className,
        )}
        {...props}
      >
        <img
          src={icon}
          className="aspect-[1] object-contain w-5 self-stretch my-auto"
          alt=""
        />
      </button>
    );
  },
);

// Set the display name for debugging and React DevTools
ButtonIcon.displayName = "ButtonIcon";

export { ButtonIcon };
