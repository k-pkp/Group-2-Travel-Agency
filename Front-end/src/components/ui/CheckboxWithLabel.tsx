import { ChangeEvent } from 'react'; // Import the ChangeEvent type

// Define the props interface for CheckboxWithLabel component
interface CheckboxWithLabelProps {
  label: string;
  checked?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void; // Correct type definition
}

// Define and export the CheckboxWithLabel component
export const CheckboxWithLabel: React.FC<CheckboxWithLabelProps> = ({
  label,
  checked = false,
  onChange,
}) => (
  <label className="flex gap-2 items-center cursor-pointer">
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange} // The native input's onChange will pass the event
      className="hidden" // Assuming you're styling the SVG as the visible checkbox
    />
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[24px] h-[24px]"
    >
      <path
        d="M17.0922 8.74742L17.0924 8.74716C17.2208 8.5897 17.2821 8.38803 17.2631 8.18573C17.244 7.98343 17.1461 7.79676 16.9905 7.66607C16.8349 7.53538 16.6341 7.47116 16.4316 7.4873C16.229 7.50344 16.041 7.59864 15.9081 7.75232L15.9078 7.75258L10.1788 14.5715L8.07419 12.2332C8.07412 12.2331 8.07406 12.233 8.074 12.2329C8.00688 12.1548 7.92483 12.0909 7.83268 12.045C7.74044 11.9989 7.63993 11.9718 7.53707 11.9652C7.4342 11.9586 7.33105 11.9726 7.23367 12.0064C7.1363 12.0403 7.04667 12.0932 6.97004 12.1621C6.89342 12.2311 6.83136 12.3147 6.78749 12.408C6.74363 12.5012 6.71886 12.6023 6.71463 12.7053C6.7104 12.8083 6.72681 12.9111 6.76288 13.0077C6.79891 13.1042 6.85386 13.1925 6.92449 13.2675C6.92455 13.2675 6.92461 13.2676 6.92467 13.2676L9.62429 16.2672C9.69679 16.3478 9.78542 16.4123 9.88444 16.4564C9.98346 16.5006 10.0906 16.5234 10.1991 16.5234L10.2117 16.5234L10.2121 16.5234C10.3229 16.5217 10.4321 16.4961 10.5321 16.4485C10.6322 16.4009 10.7209 16.3323 10.7922 16.2474L17.0922 8.74742ZM3.14621 3.14621C3.70424 2.58818 4.46085 2.2743 5.25003 2.27344L18.75 2.27344C19.5392 2.2743 20.2958 2.58818 20.8538 3.14621C21.4118 3.70424 21.7257 4.46085 21.7266 5.25V18.75C21.7257 19.5392 21.4118 20.2958 20.8538 20.8538C20.2958 21.4118 19.5392 21.7257 18.75 21.7266H5.25003C4.46085 21.7257 3.70424 21.4118 3.14621 20.8538C2.58818 20.2958 2.2743 19.5392 2.27344 18.75L2.27344 5.25001C2.2743 4.46084 2.58818 3.70424 3.14621 3.14621Z"
        fill="black"
        stroke="#112211"
        strokeWidth="0.046875"
      />
    </svg>
    <span className="text-sm font-medium text-neutral-900">{label}</span>
  </label>
);