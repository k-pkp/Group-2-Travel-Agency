import React from "react";

// Define the types for the props the AccountButton component will receive
interface AccountButtonProps {
  icon: string;
  label: string;
  onClick?: () => void;
  className?: string;
}

// Define the AccountButton component using React's functional component syntax
const AccountButton: React.FC<AccountButtonProps> = ({
  icon,
  label,
  onClick = () => {},
  className = "",
}) => {
  return (
    <button
      className={`justify-center items-center rounded border border-[color:var(--Mint-Green,#8DB1D3)] flex min-h-12 w-full gap-1 p-4 border-solid ${className} cursor-pointer hover:bg-[color:var(--Mint-Green,#8DB1D3)] hover:bg-opacity-10 active:bg-[color:var(--Mint-Green,#8DB1D3)] active:bg-opacity-20`}
      onClick={onClick}
    >
      <img
        src={icon}
        alt={`${label} icon`}
        className="aspect-[1] object-contain w-4 self-stretch shrink-0 my-auto"
      />
      <span className="self-stretch my-auto">{label}</span>
    </button>
  );
};

export default AccountButton;
