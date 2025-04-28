import RoomCard from "./RoomCard";

// Define the Room interface (shape of the room data)
interface Room {
  id: number;
  image: string;
  name: string;
  price: number;
  checkInDate: string;
  checkOutDate: string;
}

// Define the AvailableRooms component which accepts Room properties as props
const AvailableRooms = ({
  id,
  image,
  name,
  price,
  checkInDate,
  checkOutDate,
}: Room) => {

  return (
    <div className="w-full mt-16 max-md:mt-10">
      <h2 className="text-xl font-normal">Available Rooms</h2>
      <div className="w-full mt-8 max-md:max-w-full">
          <RoomCard
            id={id}
            image={image}
            name={name}
            price={price}
            checkInDate={checkInDate}
            checkOutDate={checkOutDate}
          />
      </div>
    </div>
  );
};

export default AvailableRooms;
