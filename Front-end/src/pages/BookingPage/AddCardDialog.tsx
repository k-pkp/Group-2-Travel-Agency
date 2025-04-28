import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { X } from "lucide-react";

// Define props expected by the AddCardDialog component
interface AddCardDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddCard: (formValues: {
    UserID: number;
    cardHolder: string;
    cardNumber: string;
    expiryDate: string;
    billingAddress: string;
  }) => void;
}
// Define CreditCardType interface
interface CreditCardType {
  id: string;
  cardNumber: string;
  expiryDate: string;
  cardHolder: string;
  cardType: "visa" | "mastercard" | "amex" | "other";
  country?: string;
}

// Define AddCardDialog functional component
export function AddCardDialog({ open, onOpenChange, onAddCard }: AddCardDialogProps) {
  const [cardNumber, setCardNumber] = React.useState("");
  const [expiryDate, setExpiryDate] = React.useState("");
  const [cvc, setCvc] = React.useState("");
  const [nameOnCard, setNameOnCard] = React.useState("");
  const [country, setCountry] = React.useState("US");
  const [saveInfo, setSaveInfo] = React.useState(false);
  const [billingAddress, setBillingAddress] = React.useState("");


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
    { code: "IN", name: "India" },
    { code: "BR", name: "Brazil" },
    { code: "MX", name: "Mexico" },
  ];

  // Function to handle adding a card
  const handleAddCard = () => {
    if (!cardNumber || !expiryDate || !cvc || !nameOnCard) return;

    const cardType = detectCardType(cardNumber);
    const selectedCountry = countries.find(c => c.code === country)?.name || country;

    const newCard = {
      UserID: 1,
      cardHolder: nameOnCard,
      cardNumber,
      expiryDate,
      billingAddress,
      cardType,
      country: selectedCountry
    };

    onAddCard(newCard);
    onOpenChange(false);
    resetForm();
  };

   // Function to reset form fields to default
  const resetForm = () => {
    setCardNumber("");
    setExpiryDate("");
    setCvc("");
    setNameOnCard("");
    setCountry("US");
    setSaveInfo(false);
  };

   // Function to detect card type based on number
  const detectCardType = (number: string): CreditCardType["cardType"] => {
    if (number.startsWith("4")) return "visa";
    if (number.startsWith("5")) return "mastercard";
    if (number.startsWith("3")) return "amex";
    return "other";
  };

   // Function to format card number with spaces
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

   
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCardNumber(e.target.value);
    setCardNumber(formattedValue);
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    return v;
  };
// Handler for expiry date input change
  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatExpiryDate(e.target.value);
    setExpiryDate(formattedValue);
  };

   // JSX returned by the component
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-center mb-6">Add a new Card</DialogTitle>
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-1">
            <label htmlFor="cardNumber" className="text-sm font-medium">Card Number</label>
            <div className="relative">
              <Input 
                id="cardNumber" 
                value={cardNumber} 
                onChange={handleCardNumberChange} 
                placeholder="Enter your card number"
                maxLength={19}
              />
              {cardNumber.startsWith("4") && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <img 
                    src="https://cdn.builder.io/api/v1/image/assets/8671db91b3d64fe09e949cebc9364f9c/ffd1612175e39e9f37dba9ea23d4c71f1c3a2bd2?placeholderIfAbsent=true" 
                    alt="Visa" 
                    className="h-6 w-auto" 
                  />
                </div>
              )}
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
              placeholder="Enter your name"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="country" className="text-sm font-medium">Billing address</label>
            <Input 
              id="billing" 
              value={billingAddress} 
              onChange={(e) => setBillingAddress(e.target.value)} 
              placeholder="Billing Address"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="saveInfo" checked={saveInfo} onCheckedChange={(checked) => setSaveInfo(checked as boolean)} />
            <label htmlFor="saveInfo" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Securely save my information for 1-click checkout
            </label>
          </div>

          <Button 
            className="w-full bg-[#8DB1D3] hover:bg-[#7A99B8]"
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