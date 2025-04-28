"use client";

import { FormPageHeader } from "./FormPageHeader";
import { InputField } from "./InputField";
import { ChevronDownIcon } from "./ChevronDownIcon";
import { useState, FormEvent, ChangeEvent } from "react";
import { Checkbox } from "@/components/ui/checkbox";

// Define the shape of the form data
interface FormState {
  cardNumber: string;
  expiryDate: string;
  cvc: string;
  nameOnCard: string;
  country: string;
}

// The main PaymentForm component
export const PaymentForm = () => {
  const [formData, setFormData] = useState<FormState>({
    cardNumber: "",
    expiryDate: "",
    cvc: "",
    nameOnCard: "",
    country: "",
  });

  const handleBack = () => {
    
  };


  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    console.log("Form submitted:", formData);
  };

  return (
    <main className="flex flex-col gap-12 items-start p-6 mx-auto w-full max-w-screen-sm max-sm:p-4">
      <FormPageHeader
        title="Add a payment method"
        description="Let's get you all st up so you can access your personal account."
        onBackClick={handleBack}
      
      />

      <section className="flex flex-col gap-10 items-start w-full">
        
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 items-start w-full"
        >
          <InputField
            label="Card Number"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleInputChange}
            pattern="\d*"
            maxLength={19}
            placeholder="Enter card number"
            required
          />

          <div className="flex gap-6 items-start w-full max-sm:flex-col">
            <div className="flex flex-col flex-1 items-start h-14">
              <InputField
                label="Exp. Date"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleInputChange}
                placeholder="MM/YY"
                pattern="\d{2}/\d{2}"
                maxLength={5}
                required
              />
            </div>
            <div className="flex flex-col flex-1 items-start h-14">
              <InputField
                label="CVC"
                name="cvc"
                value={formData.cvc}
                onChange={handleInputChange}
                type="password"
                pattern="\d*"
                maxLength={4}
                required
              />
            </div>
          </div>

          <div className="flex flex-col items-start w-full h-14">
            <InputField
              label="Name on Card"
              name="nameOnCard"
              value={formData.nameOnCard}
              onChange={handleInputChange}
              placeholder="Enter name as shown on card"
              required
            />
          </div>

          <div className="flex flex-col items-start w-full h-14">
            <InputField
              label="Country or Region"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              icon={<ChevronDownIcon />}
              required
            />
          </div>

          <div className="flex items-center justify-between text-sm font-medium mt-6">
          <div className="flex items-center gap-2 text-[#121]">
            <Checkbox id="check" />
            <label htmlFor="check" className="cursor-pointer">
                Securely save my information for 1-click checkout
            </label>
          </div>
        </div>
          <button
            type="submit"
            className="px-4 py-2 w-full h-12 text-sm font-semibold rounded cursor-pointer bg-slate-400 text-neutral-900 hover:bg-slate-500 transition-colors"
          >
            Add payment method
          </button>
        </form>
        
        <p className="text-xs text-center opacity-75 max-w-[532px] text-neutral-900">
          By confirming your subscription, you allow The Outdoor Inn Crowd
          Limited to charge your card for this payment and future payments in
          accordance with their terms. You can always cancel your subscription.
        </p>
      </section>
    </main>
  );
};

export default PaymentForm;
            
