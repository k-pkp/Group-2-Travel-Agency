import { useState } from "react";
import PaymentCard from "./PaymentCard";
import AddCard from "./AddCard";
import { toast } from "@/components/ui/use-toast";

// Defining the CreditCardType interface to define the structure of a credit card object
interface CreditCardType {
  id: string;
  lastFour: string;
  expiryDate: string;
  cardHolder: string;
  cardType: "visa" | "mastercard" | "amex" | "other";
  country?: string;
}

const PaymentMethodsSection = () => {
  const [cards] = useState<CreditCardType[]>([
    {
      id: "1",
      lastFour: "4321",
      expiryDate: "02/27",
      cardHolder: "John Doe",
      cardType: "visa",
    },
  ]);
  
// Function to handle a card click (to select and display a message)
  const handleCardClick = (card: CreditCardType) => {
    toast({
      title: "Card selected",
      description: `You selected the card ending in ${card.lastFour}`,
    });
  };

  return (
    <section aria-labelledby="payment-methods-heading">
      <h2 id="payment-methods-heading" className="text-black text-[32px] font-normal">
        Payment methods
      </h2>

      <div className="items-stretch shadow-[0px_4px_16px_0px_rgba(17,34,17,0.05)] bg-white min-h-[260px] w-full gap-6 text-[#121] flex-wrap grid grid-cols-3 mt-4 p-6 rounded-3xl max-md:max-w-full max-md:px-5">
        {cards.map((card) => (
          <PaymentCard
            key={card.id}
            lastFourDigits={card.lastFour}
            expiryDate={card.expiryDate}
            cardType={card.cardType}
            onClick={() => handleCardClick(card)}
          />
        ))}

        <AddCard />
      </div>
    </section>
  );
};

export default PaymentMethodsSection;