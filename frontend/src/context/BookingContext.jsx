import { createContext, useContext, useState } from "react";

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [selectedTour, setSelectedTour] = useState(null);

  return (
    <BookingContext.Provider value={{ selectedTour, setSelectedTour }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => useContext(BookingContext);
