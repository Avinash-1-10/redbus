// components/Trips.js

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Filters from "../components/Filters";
import AllTrips from "../components/AllTrips";
import { fetchTrips } from "../redux/actionCreators/trip";

const Trips = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filter);
  const trips = useSelector((state) => state.trips.trips);

  useEffect(() => {
    dispatch(fetchTrips());
  }, [dispatch, filter]);

  return (
    <div className="px-[25px] my-[20px] w-full flex justify-between">
      <div className="w-[20%]">
        <Filters />
      </div>
      <div className="w-[75%]">
        <AllTrips trips={trips} />
      </div>
    </div>
  );
};

export default Trips;
