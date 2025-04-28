import React from "react";
import { Trash2 } from "lucide-react";

// Define the TypeScript interface for the component's props
interface PaymentCardProps {
  lastFourDigits: string;
  expiryDate: string;
  cardType?: "visa" | "mastercard" | "amex" | "other";
  onClick?: () => void;
}

// Define the PaymentCard functional component
const PaymentCard: React.FC<PaymentCardProps> = ({
  lastFourDigits,
  expiryDate,
  cardType = "",
  onClick,
}) => {
   // Function to return the appropriate logo URL based on the card type
  const getCardLogo = () => {
    switch (cardType) {
      case "visa":
        return "https://cdn.creazilla.com/icons/3235140/visa-icon-lg.png";
      case "mastercard":
        return "https://cdn.creazilla.com/icons/3235136/mastercard-icon-lg.png";
      case "amex":
        return "https://cdn.creazilla.com/icons/3235127/american-express-icon-lg.png";
      default:
        return "https://cdn.creazilla.com/icons/3235130/dinners-club-icon-lg.png";
    }
  };

  return (
    <div
      className="bg-[#8DB1D3] min-w-60 w-[378px] p-6 rounded-2xl cursor-pointer hover:shadow-md transition-shadow text-white"
      onClick={onClick}
      role="button"
      aria-label={`Credit card ending in ${lastFourDigits}`}
    >
      <div className="flex justify-between items-start w-full">
        <div>
          <div className="text-2xl">**** **** ****</div>
          <div className="text-[32px]">{lastFourDigits}</div>
        </div>
        <button className="" onClick={onClick}>
        <Trash2 className="text-black h-6 w-6" />
        </button>
      </div>
      
      <div className="flex justify-between items-end mt-12">
        <div>
          <div className="text-xs font-light">Valid Thru</div>
          <div className="text-xl font-medium">{expiryDate}</div>
        </div>
        <img
          src={getCardLogo()}
          alt={`${cardType} logo`}
          className="h-10"
        />
      </div>
    </div>
  );
};

export default PaymentCard;
