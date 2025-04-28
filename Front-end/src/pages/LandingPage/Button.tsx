import React from "react";
import { useNavigate } from "react-router-dom";

// Defining the interface for Button component props
interface ButtonProps {
  children: React.ReactNode;
  icon?: string;
  className?: string;
  path?: string;
  onClick?: () => void;
}
// Button component definition
const Button: React.FC<ButtonProps> = ({
  children,
  icon,
  className = "",
  path = "",
}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(path);
  }
  return (
    <div className="self-stretch my-auto">
      <button
        className={`flex gap-1 justify-center items-center p-4 rounded min-h-12 ${className}`}
        onClick={handleClick}
      >
        {icon && (
          <img
            src={icon}
            className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square"
            alt=""
          />
        )}
        <span className="self-stretch my-auto">{children}</span>
      </button>
    </div>
  );
};

export default Button;
