import axios from "axios";
import { useState, useEffect } from "react";

const useDistrict = (id) => {
  const [district, setDistrict] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const result = await axios.get(
            `http://localhost:4000/api/state_districts/district?id=${id}`
          );
          const districtName = result.data.name;
          setDistrict(districtName);
        }
      } catch (error) {
        console.error("Error fetching district:", error);
      }
    };

    fetchData();
  }, [id]);
  return district;
};

export default useDistrict;
