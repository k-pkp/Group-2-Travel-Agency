import { RadioButton } from "@/components/ui/radio-button";

// Define the props interface for the PaymentOptions component
interface PaymentOptionsProps {
  selectedOption: "full" | "card";
  onOptionChange: (option: "full" | "card") => void;
}

// Define and export the PaymentOptions functional component
export function PaymentOptions({
  selectedOption,
  onOptionChange,
}: PaymentOptionsProps) {
  return (
    <div className="items-stretch shadow-[0px_4px_16px_0px_rgba(17,34,17,0.05)] bg-white flex w-full flex-col justify-center mt-10 p-4 rounded-xl max-md:max-w-full">
      <div className="justify-between bg-[#8DB1D3] flex w-full gap-[40px_100px] flex-wrap p-4 rounded-xl max-md:max-w-full">
        <div className="text-[#121] font-normal">
          <div className="text-base">Pay in full</div>
          <div className="text-sm mt-2">Pay the total and you are all set</div>
        </div>
        <RadioButton
          checked={selectedOption === "full"}
          onChange={() => onOptionChange("full")}
          name="payment-option"
          value="full"
        />
      </div>
    </div>
  );
}
