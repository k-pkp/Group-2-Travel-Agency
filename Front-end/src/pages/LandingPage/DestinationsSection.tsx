
import DestinationCard from "./DestinationCard";

const destinations = [
  {
    id: 1,
    city: "Tokyo",
    description: "An amazing journey",
    price: 600,
    imageUrl:
      "https://images.unsplash.com/photo-1596713102414-4d0435fc5ba6?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    city: "Paris",
    description: "A Paris Adventure",
    price: 700,
    imageUrl:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1173&q=80",
  },
  {
    id: 3,
    city: "London",
    description: "London eye adventure",
    price: 750,
    imageUrl:
      "https://images.unsplash.com/photo-1547254002-e65e0179fe9f?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4,
    city: "Bangkok",
    description: "Amazing Thailand",
    price: 350,
    imageUrl:
      "https://images.unsplash.com/photo-1552550018-5253c1b171e1?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

function DestinationsSection() {
  return (
    <section className="px-10 pt-24 pb-10">
      <h2 className="mb-4 text-3xl font-semibold text-zinc-900">
        Fall into travel
      </h2>
      <p className="mb-10 max-w-[800px] text-zinc-500">
        Going somewhere to celebrate this season? Whether you're going home or
        somewhere to roam, we've got the travel tools to get you to your
        destination.
      </p>

      <div className="grid gap-6 grid-cols-[repeat(4,1fr)] max-md:grid-cols-[repeat(2,1fr)] max-sm:grid-cols-[1fr]">
        {destinations.map((destination) => (
          <DestinationCard
            key={destination.id}
            city={destination.city}
            description={destination.description}
            price={destination.price}
            imageUrl={destination.imageUrl}
          />
        ))}
      </div>
    </section>
  );
}

export default DestinationsSection;
