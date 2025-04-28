// Define a TypeScript interface for the props that the BackButton component will receive
interface BackButtonProps {
  onClick: () => void;
}

// Define and export the BackButton React functional component
export const BackButton: React.FC<BackButtonProps> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="flex gap-1 items-center cursor-pointer"
    aria-label="Go back"
  >
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[24px] h-[24px]"
    >
      <path
        d="M15.75 18.75L9 12L15.75 5.25"
        stroke="#112211"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
    <span className="text-sm font-medium text-neutral-900">Back</span>
  </button>
);
