import { useNavigate } from "react-router-dom";


interface DestinationCardProps {
  city: string;
  description: string;
  price: number;
  imageUrl: string;
}

// DestinationCard component definition
function DestinationCard({
  city,
  description,
  price,
  imageUrl,
}: DestinationCardProps) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/search?destination=" + city);
  };

  return (
    <article
      className="overflow-hidden relative rounded-xl h-[400px] text-white 2xl:h-[800px] drop-shadow-xl"
      style={{
        backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 50%), url(${imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-x-0 bottom-0 p-6">
        <h3 className="mb-1 text-2xl font-semibold">{city}</h3>
        <p className="mb-3 text-sm">{description}</p>
        <p className="mb-4 text-xl font-semibold">$ {price}</p>
        <button className="px-6 py-3 w-full bg-[#8DB1D3] transition duration-500 hover:bg-[#6c9bc7] hover:text-[#112211] rounded cursor-pointer border-none text-zinc-900" onClick={handleClick}>
          Book a Hotel
        </button>
      </div>
    </article>
  );
}

export default DestinationCard;
