import * as React from "react";

// Define the RadioButtonProps interface, extending from standard input HTML attributes and adding an optional "checked" prop 
interface RadioButtonProps extends React.InputHTMLAttributes<HTMLInputElement> {
  checked?: boolean;
}

// Create the RadioButton component using React.forwardRef to forward the ref to the actual input element
const RadioButton = React.forwardRef<HTMLInputElement, RadioButtonProps>(
  ({ checked = false, className, ...props }, ref) => {
    return (
      <div
        className="flex min-h-12 items-center justify-center w-12"
        data-radio-button
      >
        <div className="self-stretch flex w-10 items-center overflow-hidden justify-center my-auto rounded-[100px]">
          <div className="self-stretch flex w-10 items-center justify-center my-auto p-2">
            <input
              type="radio"
              ref={ref}
              checked={checked}
              className="sr-only"
              {...props}
            />
            <img
              src={checked ? "https://cdn.builder.io/api/v1/image/assets/8671db91b3d64fe09e949cebc9364f9c/411c1344e58bb583900def47aee05484068bd392?placeholderIfAbsent=true" : "https://cdn.builder.io/api/v1/image/assets/8671db91b3d64fe09e949cebc9364f9c/411c1344e58bb583900def47aee05484068bd392?placeholderIfAbsent=true"}
              alt="Radio button"
              className="aspect-[1] object-contain w-6 self-stretch my-auto"
            />
          </div>
        </div>
      </div>
    );
  },
);

RadioButton.displayName = "RadioButton";

export { RadioButton };
