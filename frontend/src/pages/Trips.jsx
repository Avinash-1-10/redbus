import axios from "axios";
import React, { useEffect, useState } from "react";
import Filters from "../components/Filters";
import AllTrips from "../components/AllTrips";

const Trips = ({ filters }) => {
  const [trips, setTrips] = useState([]);

  const apiCall = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/trips", {
        params: filters,
      });
      const data = response.data;
      setTrips(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching trips", error);
    }
  };

  useEffect(() => {
    apiCall();
  }, [filters]);

  return (
    <div className="px-[25px] my-[20px] w-full flex justify-between">
      <div className="w-[20%]">
        <Filters />
      </div>
      <div className="w-[75%]">
        <AllTrips trips={trips}/>
      </div>
    </div>
  );
};

export default Trips;
