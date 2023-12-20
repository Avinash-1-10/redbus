import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editFilter } from "../redux/actionCreators/filter";
import { fetchTrips } from "../redux/actionCreators/trip";

const Filters = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filter);
  const [arrivalTime, setArrivalTime] = useState([]);
  const [departureTime, setDepartureTime] = useState([]);
  const [rating, setRating] = useState("");
  const [busOperator, setBusOperator] = useState([]);

  const handleApplyFilters = () => {
    const filters = {
      arrivalSessions: arrivalTime,
      departureSessions: departureTime,
      rating,
      busOperator,
    };
    dispatch(editFilter(filters));
    dispatch(fetchTrips());
    console.log(filters);
    console.log("filter", filter);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-xl overflow-hidden">
      <h2 className="text-2xl font-bold mb-4">Filters</h2>
      <div className="mb-4 flex flex-col space-y-4">
        <div className="border-b pb-2">
          <h3 className="text-lg font-semibold mb-2">Arrival Time</h3>
          <div className="flex flex-col space-y-2">
            {/* Checkbox for Morning Session */}
            <label className="flex items-center">
              <input
                type="checkbox"
                value="morning"
                checked={arrivalTime.includes("morning")}
                onChange={() =>
                  setArrivalTime((prev) =>
                    prev.includes("morning")
                      ? prev.filter((time) => time !== "morning")
                      : [...prev, "morning"]
                  )
                }
                className="form-checkbox h-4 w-4 text-blue-500"
              />
              <span className="ml-2">Morning Session</span>
            </label>
            {/* Checkbox for Afternoon Session */}
            <label className="flex items-center">
              <input
                type="checkbox"
                value="afternoon"
                checked={arrivalTime.includes("afternoon")}
                onChange={() =>
                  setArrivalTime((prev) =>
                    prev.includes("afternoon")
                      ? prev.filter((time) => time !== "afternoon")
                      : [...prev, "afternoon"]
                  )
                }
                className="form-checkbox h-4 w-4 text-blue-500"
              />
              <span className="ml-2">Afternoon Session</span>
            </label>
            {/* Checkbox for Evening Session */}
            <label className="flex items-center">
              <input
                type="checkbox"
                value="evening"
                checked={arrivalTime.includes("evening")}
                onChange={() =>
                  setArrivalTime((prev) =>
                    prev.includes("evening")
                      ? prev.filter((time) => time !== "evening")
                      : [...prev, "evening"]
                  )
                }
                className="form-checkbox h-4 w-4 text-blue-500"
              />
              <span className="ml-2">Evening Session</span>
            </label>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Departure Time</h3>
          <div className="flex flex-col space-y-2 border-b pb-2">
            {/* Similar structure as Arrival Time */}
            <label className="flex items-center">
              <input
                type="checkbox"
                value="morning"
                checked={departureTime.includes("morning")}
                onChange={() =>
                  setDepartureTime((prev) =>
                    prev.includes("morning")
                      ? prev.filter((time) => time !== "morning")
                      : [...prev, "morning"]
                  )
                }
                className="form-checkbox h-4 w-4 text-blue-500"
              />
              <span className="ml-2">Morning Session</span>
            </label>
            {/* Checkbox for Afternoon Session */}
            <label className="flex items-center">
              <input
                type="checkbox"
                value="afternoon"
                checked={departureTime.includes("afternoon")}
                onChange={() =>
                  setDepartureTime((prev) =>
                    prev.includes("afternoon")
                      ? prev.filter((time) => time !== "afternoon")
                      : [...prev, "afternoon"]
                  )
                }
                className="form-checkbox h-4 w-4 text-blue-500"
              />
              <span className="ml-2">Afternoon Session</span>
            </label>
            {/* Checkbox for Evening Session */}
            <label className="flex items-center">
              <input
                type="checkbox"
                value="evening"
                checked={departureTime.includes("evening")}
                onChange={() =>
                  setDepartureTime((prev) =>
                    prev.includes("evening")
                      ? prev.filter((time) => time !== "evening")
                      : [...prev, "evening"]
                  )
                }
                className="form-checkbox h-4 w-4 text-blue-500"
              />
              <span className="ml-2">Evening Session</span>
            </label>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Rating</h3>
          <div className="flex flex-col space-y-2 border-b pb-2">
            {/* Radio for 0-2 */}
            <label className="flex items-center">
              <input
                type="radio"
                value={0}
                checked={rating === 0}
                onChange={() => setRating(0)}
                className="form-radio h-4 w-4 text-blue-500"
              />
              <span className="ml-2">0-2</span>
            </label>
            {/* Radio for 2-4 */}
            <label className="flex items-center">
              <input
                type="radio"
                value={2}
                checked={rating === 2}
                onChange={() => setRating(2)}
                className="form-radio h-4 w-4 text-blue-500"
              />
              <span className="ml-2">2-4</span>
            </label>
            {/* Radio for 4+ */}
            <label className="flex items-center">
              <input
                type="radio"
                value={4}
                checked={rating === 4}
                onChange={() => setRating(4)}
                className="form-radio h-4 w-4 text-blue-500"
              />
              <span className="ml-2">4+</span>
            </label>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Bus Operator</h3>
          <div className="flex flex-col space-y-2 border-b pb-2">
            {/* Checkbox for Tata Motors */}
            <label className="flex items-center">
              <input
                type="checkbox"
                value="tataMotors"
                checked={busOperator.includes("tataMotors")}
                onChange={() =>
                  setBusOperator((prev) =>
                    prev.includes("tataMotors")
                      ? prev.filter((operator) => operator !== "tataMotors")
                      : [...prev, "tataMotors"]
                  )
                }
                className="form-checkbox h-4 w-4 text-blue-500"
              />
              <span className="ml-2">Tata Motors</span>
            </label>
            {/* Checkbox for Reliance Tourism */}
            <label className="flex items-center">
              <input
                type="checkbox"
                value="relianceTourism"
                checked={busOperator.includes("relianceTourism")}
                onChange={() =>
                  setBusOperator((prev) =>
                    prev.includes("relianceTourism")
                      ? prev.filter(
                          (operator) => operator !== "relianceTourism"
                        )
                      : [...prev, "relianceTourism"]
                  )
                }
                className="form-checkbox h-4 w-4 text-blue-500"
              />
              <span className="ml-2">Reliance Tourism</span>
            </label>
            {/* Checkbox for Nita Travels */}
            <label className="flex items-center">
              <input
                type="checkbox"
                value="nitaTravels"
                checked={busOperator.includes("nitaTravels")}
                onChange={() =>
                  setBusOperator((prev) =>
                    prev.includes("nitaTravels")
                      ? prev.filter((operator) => operator !== "nitaTravels")
                      : [...prev, "nitaTravels"]
                  )
                }
                className="form-checkbox h-4 w-4 text-blue-500"
              />
              <span className="ml-2">Nita Travels</span>
            </label>
          </div>
        </div>
      </div>
      <button
        onClick={handleApplyFilters}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default Filters;
