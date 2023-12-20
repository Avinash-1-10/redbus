import React, { useState } from "react";
import { FaWifi } from "react-icons/fa";
import { RiMovieLine } from "react-icons/ri";
import { IoFastFoodOutline } from "react-icons/io5";
import { TbAirConditioningDisabled } from "react-icons/tb";
import Seats from "./seats";
import useDistrict from "../hooks/UseDistrict";
import useTimeDifference from "../hooks/UseTimeDifference";
import useDate from "../hooks/UseDate";

const Trip = ({ trip }) => {
  const [viewSeats, setViewSeats] = useState(false);
  const {
    from,
    to,
    startDate,
    endDate,
    arrivalTime,
    departureTime,
    rating,
    category,
    busFare,
    operator,
    bookedSeats,
  } = trip;
  let fromLocation = useDistrict(from);
  let toLocation = useDistrict(to);
  let departureDate = useDate(startDate);
  let arrivalDate = useDate(endDate);
  //  console.log(departureDate, arrivalDate)
  //  console.log(fromLocation, toLocation);

  let dt = new Date(departureTime);
  let at = new Date(arrivalTime);
  const timeOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  let duration = useTimeDifference(arrivalTime, departureTime);
  // console.log(duration)

  const handleViewSeats = () => {
    setViewSeats(!viewSeats);
  };

  return (
    <div>
      <div className="flex justify-between border rounded-t-xl overflow-hidden hover:shadow-lg duration-300">
        <div className="flex flex-col p-5 bg-white gap-2 w-[80%]">
          <div className="flex gap-3">
            <p className=" font-bold text-[18px] text-[#F7BB07]">{operator}</p>
            <span className=" font-bold">|</span>
            <p className=" font-semibold  text-[#808080]">{category}</p>
            <span className=" font-bold">|</span>
            <p>
              <span className="bg-[#04B235] p-1 rounded-md text-[15px] text-white font-semibold">
                {rating}
              </span>
              <span className="text-[#808080]"> Rating</span>
            </p>
          </div>
          <div className="flex justify-between items-center gap-2">
            <div>
              <p className="text-[25px] font-bold text-[#2F94E4]">
                {fromLocation}
              </p>
              <p className="text-[20px] font-semibold ">
                {dt.toLocaleTimeString("en-US", timeOptions)}
              </p>
              <p className="text-[#808080]">{departureDate}</p>
            </div>
            <div className=" border-b-2 px-10">
              <p className="text-center font-semibold text-[#808080] text-[18px]">
                {duration}
              </p>
            </div>
            <div className="text-end">
              <p className="text-[25px] font-bold text-[#2F94E4]">
                {toLocation}
              </p>
              <p className="text-[20px] font-semibold ">
                {at.toLocaleTimeString("en-US", timeOptions)}
              </p>
              <p className="text-[#808080]">{arrivalDate}</p>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex gap-3 items-center">
              <FaWifi className="text-[20px]" />
              <RiMovieLine className="text-[20px]" />
              <IoFastFoodOutline className="text-[20px]" />
              <TbAirConditioningDisabled className="text-[25px]" />
            </div>
            {48 - bookedSeats.length < 10 ? (
              <p className="text-red-500 font-semibold">
                Hurry only {48 - bookedSeats.length} seats left!
              </p>
            ) : (
              <p className="font-semibold">
                {48 - bookedSeats.length} seats left
              </p>
            )}
          </div>
        </div>

        <div className="border-l w-[20%] bg-white flex flex-col justify-center items-center gap-5">
          <p className=" font-semibold text-[#808080] text-[18px]">Trip Cost</p>
          <p className=" font-semibold text-[20px]">INR {busFare}</p>
          <button
            className="bg-[#04B235] px-5 py-2 text-white font-semibold rounded-md"
            onClick={handleViewSeats}
          >
            View seats
          </button>
        </div>
      </div>
      {viewSeats && <Seats bookedSeats={bookedSeats} trip={trip} />}
    </div>
  );
};

export default Trip;
