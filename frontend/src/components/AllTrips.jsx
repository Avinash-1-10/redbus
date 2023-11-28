import React from "react";
import Trip from "./Trip";

const AllTrips = ({ trips }) => {
  return (
    <div className="flex flex-col gap-3">
      {trips.map((trip) => (
        <Trip trip={trip} key={trip._id} />
      ))}
    </div>
  );
};

export default AllTrips;
