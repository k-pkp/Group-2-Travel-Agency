import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Default styles

const CalendarComponent: React.FC = () => {
  const [date, setDate] = useState<Date | null>(new Date());

  return (
    <div className="p-4">
      <Calendar
        onChange={(newDate) => setDate(newDate as Date)}
      />
      <p className="mt-2">Selected Date: {date?.toDateString()}</p>
    </div>
  );
};

export default CalendarComponent;