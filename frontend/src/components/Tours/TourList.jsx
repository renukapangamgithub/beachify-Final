import React from "react";
import TourCard from "./TourCard";

const TourList = ({ tours }) => {
  return (
    <div className="flex flex-wrap justify-center gap-6">
      {tours.map((tour) => (
        <TourCard key={tour._id} tour={tour} />
      ))}
    </div>
  );
};

export default TourList;
