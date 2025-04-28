import React from "react";

// Define the AddCard component, which accepts the onClick prop
const AddCard: React.FC = () => {
  return (
    <button
      className="justify-center items-center border-[color:var(--Mint-Green,#8DB1D3)] flex min-w-60 flex-col text-xs font-medium w-[378px] p-4 rounded-2xl border-2 border-dashed hover:bg-slate-50 transition-colors cursor-pointer"
      aria-label="Add a new card"
    >
      <img
        src="https://cdn.builder.io/api/v1/image/assets/8671db91b3d64fe09e949cebc9364f9c/566596606b919c37dd61d363e84373e4dd0527e6?placeholderIfAbsent=true"
        className="aspect-[1] object-contain w-16"
        alt="Add card icon"
      />
      <div className="opacity-75 mt-2.5">Add a new card</div>
    </button>
  );
};

export default AddCard;
