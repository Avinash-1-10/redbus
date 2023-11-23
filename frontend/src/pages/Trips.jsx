import axios from "axios";
import React, { useEffect, useState } from "react";

const Trips = ({ filters }) => {
  const [trips, setTrips] = useState([]);

  const apiCall = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/trips",
        {
          params: filters
        }
      );
      const data = response.data;
      setTrips(data);
      console.log(data)
    } catch (error) {
      console.error("Error fetching trips", error);
    }
  };

  useEffect(() => {
    apiCall();
  }, [filters]);

  return <div>Trips</div>;
};

export default Trips;

