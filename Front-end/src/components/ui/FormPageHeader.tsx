"use client";

import { BackButton } from "./BackButton.tsx";
import { CheckboxWithLabel } from "./CheckboxWithLabel.tsx";

// Define the types for the props that FormPageHeader will receive
interface FormPageHeaderProps {
  title: string;
  description: string;
  showCheckbox?: boolean;
  checkboxLabel?: string;
  onBackClick: () => void;
  onCheckboxChange?: () => void;
}

// FormPageHeader component - renders a header with a back button, title, description, and optionally a checkbox.
export const FormPageHeader: React.FC<FormPageHeaderProps> = ({
  title,
  description,
  showCheckbox = false,
  checkboxLabel = "",
  onBackClick,
  onCheckboxChange,
}) => {
  return (
    <div className="flex flex-col gap-12 items-start w-full">
      <section className="flex flex-col gap-4 items-start w-full">
        <BackButton onClick={onBackClick} />
        <header className="flex flex-col gap-4 items-start w-full">
          <h1 className="text-4xl text-black max-md:text-3xl max-sm:text-3xl">
            {title}
          </h1>
          <p className="text-base opacity-75 text-neutral-900">{description}</p>
        </header>
      </section>
      {showCheckbox && checkboxLabel && (
        <CheckboxWithLabel label={checkboxLabel} onChange={onCheckboxChange} />
      )}
    </div>
  );
};
