"use client";

import { ChangeEvent } from "react";

// Define the props interface for the InputField component
interface InputFieldProps {
  label: string;
  value: string;
  name: string;
  type?: string;
  icon?: React.ReactNode;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
}

// The InputField component accepts the defined props and renders the corresponding JSX
export const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  name,
  type = "text",
  icon,
  onChange,
  placeholder = "",
  required = false,
  disabled = false,
  minLength,
  maxLength,
  pattern,
}) => (
  <div className="flex flex-col items-start w-full bg-white rounded border border-zinc-500">
    <div className="flex items-center px-4 py-2 w-full">
      <div className="flex relative flex-col flex-1 justify-center items-start h-10">
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          minLength={minLength}
          maxLength={maxLength}
          pattern={pattern}
          className="w-full h-full text-base text-zinc-900 bg-transparent outline-none"
          aria-label={label}
        />
        <label
          className={`absolute -left-1 -top-4 px-1 py-0 text-sm bg-white text-neutral-900 transition-all
            ${value ? "transform" : "cursor-text"}`}
        >
          {label}
        </label>
      </div>
      {icon && (
        <div className="flex justify-center items-center p-3 w-12 h-12">
          {icon}
        </div>
      )}
    </div>
  </div>
);
