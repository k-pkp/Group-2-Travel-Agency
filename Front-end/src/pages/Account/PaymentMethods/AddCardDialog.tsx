import * as React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Define the props for AddCardDialog component
interface AddCardDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddCard: (card: CreditCardType) => void;
}
// Define the structure of a CreditCardType object
interface CreditCardType {
  id: string;
  lastFour: string;
  expiryDate: string;
  cardHolder: string;
  cardType: "visa" | "mastercard" | "amex" | "other";
  country?: string;
}

  // State hooks for managing form inputs and selections
export function AddCardDialog({ open, onOpenChange, onAddCard }: AddCardDialogProps) {
  const [cardNumber, setCardNumber] = React.useState("");
  const [expiryDate, setExpiryDate] = React.useState("");
  const [cvc, setCvc] = React.useState("");
  const [nameOnCard, setNameOnCard] = React.useState("");
  const [country, setCountry] = React.useState("US");
  const [saveInfo, setSaveInfo] = React.useState(false);

  const countries = [
    { code: "US", name: "United States" },
    { code: "CA", name: "Canada" },
    { code: "UK", name: "United Kingdom" },
    { code: "AU", name: "Australia" },
    { code: "FR", name: "France" },
    { code: "DE", name: "Germany" },
    { code: "IT", name: "Italy" },
    { code: "ES", name: "Spain" },
    { code: "JP", name: "Japan" },
    { code: "CN", name: "China" },
    { code: "TH", name: "Thailand" },
    { code: "IN", name: "India" },
    { code: "BR", name: "Brazil" },
    { code: "MX", name: "Mexico" },
  ];

   // Function to handle adding a new credit card after validation
  const handleAddCard = () => {
    if (!cardNumber || !expiryDate || !cvc || !nameOnCard) return;

    const lastFour = cardNumber.slice(-4);
    const cardType = detectCardType(cardNumber);
    const selectedCountry = countries.find(c => c.code === country)?.name || country;

    const newCard: CreditCardType = {
      id: Date.now().toString(),
      lastFour,
      expiryDate,
      cardHolder: nameOnCard,
      cardType,
      country: selectedCountry
    };

    onAddCard(newCard);
    onOpenChange(false);
    resetForm();
  };

  // Function to reset all form fields to their default values
  const resetForm = () => {
    setCardNumber("");
    setExpiryDate("");
    setCvc("");
    setNameOnCard("");
    setCountry("US");
    setSaveInfo(false);
  };

   // Function to detect the type of card (Visa, Mastercard, Amex, etc.)
  const detectCardType = (number: string): CreditCardType["cardType"] => {
    if (number.startsWith("4")) return "visa";
    if (number.startsWith("5")) return "mastercard";
    if (number.startsWith("3")) return "amex";
    return "other";
  };

  // Function to format the card number input into groups of four digits
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    return parts.length ? parts.join(" ") : value;
  };

   // Handle card number input changes
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCardNumber(e.target.value);
    setCardNumber(formattedValue);
  };

    // Function to format the expiry date input into MM/YY format
  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    return v;
  };

  // Handle expiry date input changes
  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatExpiryDate(e.target.value);
    setExpiryDate(formattedValue);
  };
   // Get the logo for the card type (Visa, Mastercard, Amex, etc.)
  const getCardLogo = (cardType: string) => {
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <div className="space-y-6">
          <div className="space-y-1">
            <label htmlFor="cardNumber" className="text-sm font-medium">Card Number</label>
            <div className="relative">
              <Input 
                id="cardNumber" 
                value={cardNumber} 
                onChange={handleCardNumberChange} 
                placeholder="Your card number here"
                maxLength={19}
              />
              {cardNumber.startsWith("4") && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <img 
                    src={getCardLogo('visa')}
                    alt="Visa" 
                    className="h-6 w-auto" 
                  />
                </div>
              ) ||
                (cardNumber.startsWith("34") || cardNumber.startsWith("37")) && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <img 
                        src={getCardLogo('amex')}
                        alt="Visa" 
                        className="h-6 w-auto" 
                      />
                    </div>
                  ) ||
                  (cardNumber.startsWith("51") || cardNumber.startsWith("52") || cardNumber.startsWith("53") || cardNumber.startsWith("54") || cardNumber.startsWith("55")) && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <img 
                        src={getCardLogo('mastercard')}
                        alt="Visa" 
                        className="h-6 w-auto" 
                      />
                    </div>
                  ) ||
                  (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <img 
                        src={getCardLogo('other')}
                        alt="Visa" 
                        className="h-6 w-auto" 
                      />
                    </div>
                  )
              }
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label htmlFor="expiryDate" className="text-sm font-medium">Exp. Date</label>
              <Input 
                id="expiryDate" 
                value={expiryDate} 
                onChange={handleExpiryDateChange} 
                placeholder="MM/YY"
                maxLength={5}
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="cvc" className="text-sm font-medium">CVC</label>
              <Input 
                id="cvc" 
                value={cvc} 
                onChange={(e) => setCvc(e.target.value)} 
                placeholder="CVV"
                maxLength={4}
                type="password"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label htmlFor="nameOnCard" className="text-sm font-medium">Name on Card</label>
            <Input 
              id="nameOnCard" 
              value={nameOnCard} 
              onChange={(e) => setNameOnCard(e.target.value)} 
              placeholder="Your name here"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="country" className="text-sm font-medium">Country or Region</label>
            <Select value={country} onValueChange={setCountry}>
              <SelectTrigger id="country" className="w-full">
                <SelectValue placeholder="Select a country" />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country.code} value={country.code}>
                    {country.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="saveInfo" checked={saveInfo} onCheckedChange={(checked) => setSaveInfo(checked as boolean)} />
            <label htmlFor="saveInfo" className="text-sm font-medium leading-none">
              Securely save my information for 1-click checkout
            </label>
          </div>

          <Button 
            className="w-full bg-[#8DB1D3] text-[#112211] transition duration-500 hover:bg-[#6c9bc7] hover:text-[#112211] cursor-pointer"
            onClick={handleAddCard}
          >
            Add Card
          </Button>

          <p className="text-xs text-gray-500 text-center">
            By confirming your subscription, you allow The Outdoor Inn Crowd Limited to charge your card for this payment and future payments in accordance with their terms. You can always cancel your subscription.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}