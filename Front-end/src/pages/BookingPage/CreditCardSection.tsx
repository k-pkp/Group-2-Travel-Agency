import * as React from "react";
import { RadioButton } from "@/components/ui/radio-button";
import { AddCardDialog } from "./AddCardDialog";
import { CreditCard as CreditCardIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import dayjs from 'dayjs';

// Props interface for CreditCardSection component
interface CreditCardSectionProps {
  selectedOption: "full" | "card";
  onOptionChange: (option: "full" | "card") => void;
  userId: number;
}
// Structure of a CreditCard object
interface CreditCard {
    id: string;
    lastFour: string;
    expiryDate: string;
    cardHolder: string;
    cardType: "visa" | "mastercard" | "amex" | "other";
    country?: string;
}

export function CreditCardSection({
  selectedOption,
  onOptionChange,
  userId,
}: CreditCardSectionProps) {
 // Function to detect credit card type based on number pattern
  function detectCardType(number: string): "visa" | "mastercard" | "amex" | "other" {
    
    const sanitized = number.replace(/\D/g, "");
  
    
    if (/^4[0-9]{12}(?:[0-9]{3})?(?:[0-9]{3})?$/.test(sanitized)) {
      return "visa";
    }
  
    
    if (
      /^(?:5[1-5][0-9]{14}|2(?:2[2-9][0-9]{12}|[3-6][0-9]{13}|7(?:0[0-9]{12}|1[0-9]{12}|20[0-9]{12})))$/.test(
        sanitized
      )
    ) {
      return "mastercard";
    }
  
    
    if (/^3[47][0-9]{13}$/.test(sanitized)) {
      return "amex";
    }
  
    
    return "other";
  }

  const [creditCard, setCreditCard] = React.useState<CreditCard[]>([]);
  useEffect(() => {
    if (!userId) return;
  
    fetch("http://localhost:8081/paymentMethod")
      .then((res) => res.json())
      .then((json: any[]) => {
        
        const filteredCards = json.filter(item => item.UserID === userId);
  
        const mappedCards: CreditCard[] = filteredCards.map(item => ({
          id: String(item.PaymentMethodID),
          lastFour: item.CardNumber.slice(-4),
          expiryDate: dayjs(item.ExpirationDate).format("MM/YY"),
          cardHolder: item.HolderName,       
          cardType: detectCardType(item.CardNumber),
          country: item.Country             
        }));
  
         // Remove the card from state
        setCreditCard(mappedCards);
  
        
        if (mappedCards.length > 0) {
          setSelectedCardId(mappedCards[0].id);
        }
      })
      .catch((error) => console.error("Error fetching cards:", error));
  }, [userId]);
  console.log("creditCard=", creditCard);
  
  const [selectedCardId, setSelectedCardId] = React.useState<string>(creditCard[0]?.id || "");
  const [isAddCardDialogOpen, setIsAddCardDialogOpen] = React.useState(false);
  const { toast } = useToast();

  const handleCardSelection = (cardId: string) => {
    setSelectedCardId(cardId);
    onOptionChange("card");
    
    const selectedCard = creditCard.find(creditCard => creditCard.id === cardId);
    if (selectedCard) {
      toast({
        title: "Payment method selected",
        description: `Card ending in ${selectedCard.lastFour} will be used for payment`,
      });
    }
  };


  const handleDeleteCard = (cardId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (creditCard.length <= 1) {
      toast({
        title: "Cannot delete card",
        description: "You must have at least one payment method",
        variant: "destructive",
      });
      return;
    }
    
    setCreditCard(creditCard.filter(card => card.id !== cardId));
    
    
    if (selectedCardId === cardId) {
      const firstRemainingCard = creditCard.find(card => card.id !== cardId);
      if (firstRemainingCard) {
        setSelectedCardId(firstRemainingCard.id);
      }
    }
    
    toast({
      title: "Card deleted",
      description: "Your card has been removed",
    });
  };

   // Function to get credit card logo image URL based on card type
  const getCardTypeImage = (cardType: CreditCard["cardType"]) => {
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

  
  // Function to add new card into database
const addCardToDatabase = async (newCard: {
  UserID: number;
  cardHolder: string;
  cardNumber: string;
  expiryDate: string;      
  billingAddress: string;
}) => {
  try {
   
    const expiryDateTwoDigitYear = dayjs(newCard.expiryDate, 'MM/YY');
    const currentYearTwoDigit = dayjs().year() % 100;
    const cutoff = currentYearTwoDigit + 20; 

    let fullYear;
    const inputYearTwoDigit = parseInt(newCard.expiryDate.slice(-2), 10);

    if (inputYearTwoDigit <= cutoff) {
        fullYear = 2000 + inputYearTwoDigit;
    } else {
        fullYear = 1900 + inputYearTwoDigit; 
    }
    const expiryDate = expiryDateTwoDigitYear.year(fullYear).startOf('month').format('YYYY-MM-DD');
    console.log('expiryDate=', expiryDate);
    const response = await fetch("http://localhost:8081/paymentMethod", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        UserID: userId,
        HolderName: newCard.cardHolder,
        CardNumber: newCard.cardNumber,
        ExpirationDate: expiryDate, 
        BillingAddress: newCard.billingAddress,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error adding card:", errorData);
      throw new Error(`Failed to add card: ${errorData.message}`);
    }

    const cardData = await response.json();
    console.log("Card added successfully:", cardData);

    
    return cardData;
  } catch (error) {
    console.error("Error in addCardToDatabase:", error);
    throw error;
  }
};


// Handle logic after user adds a new card
const handleAddCard = async (formValues: {
  UserID: number;
  cardHolder: string;
  cardNumber: string;
  expiryDate: string; 
  billingAddress: string;
}) => {
  try {
    const newCardFromServer = await addCardToDatabase(formValues);

   
    setCreditCard((prev) => [
      ...prev,
      {
        id: newCardFromServer.PaymentMethodID.toString(),
        lastFour: newCardFromServer.CardNumber.slice(-4),
        expiryDate: dayjs(newCardFromServer.ExpirationDate).format("MM/YY"),
        cardHolder: newCardFromServer.HolderName,
        cardType: "visa", 
      },
    ]);

    toast({
      title: "Card added successfully",
      description: `Card ending in ${newCardFromServer.CardNumber.slice(-4)} has been added.`,
    });
  } catch (err) {
    toast({
      title: "Error adding card",
      description: String(err),
      variant: "destructive",
    });
  }
};

  return (
    <div className="shadow-[0px_4px_16px_0px_rgba(17,34,17,0.05)] bg-white w-full mt-10 p-4 rounded-xl max-md:max-w-full">
      {creditCard.map((card) => (
        <div 
          key={card.id}
          className={`justify-between items-center flex w-full gap-[40px_100px] flex-wrap p-4 rounded-xl mb-4 max-md:max-w-full cursor-pointer transition-colors ${
            selectedOption === "card" && selectedCardId === card.id 
              ? "bg-[#8DB1D3]" 
              : "bg-gray-100 hover:bg-gray-200"
          }`}
          onClick={() => handleCardSelection(card.id)}
        >
          <div className="self-stretch flex items-center gap-8 text-[#121] font-normal my-auto">
            <img
              src={getCardTypeImage(card.cardType)}
              alt="Credit card"
              className="aspect-[1] object-contain w-8 self-stretch shrink-0 my-auto"
            />
            <div className="self-stretch flex flex-col my-auto">
              <div className="flex items-center gap-2">
                <div className="text-base self-stretch my-auto">**** {card.lastFour}</div>
                <div className="text-sm self-stretch my-auto">{card.expiryDate}</div>
              </div>
              <div className="text-sm text-gray-600">{card.cardHolder}</div>
              {card.country && <div className="text-xs text-gray-500">{card.country}</div>}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button 
              className="text-red-500 hover:text-red-700 text-sm"
              onClick={(e) => handleDeleteCard(card.id, e)}
            >
              Delete
            </button>
            <RadioButton
              checked={selectedOption === "card" && selectedCardId === card.id}
              onChange={() => handleCardSelection(card.id)}
              name="payment-option"
              value={`card-${card.id}`}
            />
          </div>
        </div>
      ))}
      
      <div 
        className="justify-center items-center border-[color:var(--Mint-Green,#8DB1D3)] flex min-h-[189px] w-full flex-col text-xs text-[#121] font-medium mt-4 px-6 py-[50px] rounded-[15px] border-2 border-dashed max-md:max-w-full max-md:px-5 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setIsAddCardDialogOpen(true)}
      >
        <div className="bg-[#F4F5F6] rounded-full p-4">
          <CreditCardIcon className="w-8 h-8 text-[#8DB1D3]" />
        </div>
        <div className="opacity-75 mt-2.5">Add a new card</div>
      </div>

      <AddCardDialog 
        open={isAddCardDialogOpen} 
        onOpenChange={setIsAddCardDialogOpen} 
        onAddCard={handleAddCard}
      />
    </div>
  );
}
