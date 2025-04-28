import React from "react";

// Define the RatingProps interface, which describes the props the Rating component will accept.
interface RatingProps {
  score: number;
  text?: string;
  reviews?: string;
  className?: string;
}

// Define the Rating component, using the RatingProps interface for type checking of the props.
const Rating: React.FC<RatingProps> = ({ score, text, reviews, className }) => {
  return (
    <div className={`flex items-center gap-1 text-xs ${className}`}>
      <div className="self-stretch whitespace-nowrap w-10 my-auto">
        <div className="self-stretch rounded border border-[color:var(--Mint-Green,#8DB1D3)] min-h-8 w-full gap-1 px-[11px] py-[9px] border-solid text-center">
          {score.toFixed(1)}
        </div>
      </div>
      <div className="self-stretch my-auto">
        {text && <span className="font-bold">{text}</span>}{" "}
        {reviews && <span>{reviews} reviews</span>}
      </div>
    </div>
  );
};

export default Rating;
