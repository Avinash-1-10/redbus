import React from "react";
import { RiRectangleFill } from "react-icons/ri";
import { FaArrowRight } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { addTicket } from "../redux/actionCreators/ticket";
import { useNavigate } from "react-router-dom";

const SeatDetails = ({ yourbookedSeats, trip }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const handleSubmit = () => {
    const ticketInfo = {
      ...trip,
      yourbookedSeats
    };
    dispatch(addTicket(ticketInfo));
    navigate("/passenger-info")
  };
  return (
    <div className="flex flex-col gap-2 w-full">
      {/* Seat instructions */}
      <div className="border p-3 rounded-md">
        <div className="flex items-center gap-3">
          <RiRectangleFill className="text-white text-[25px]" />
          <span>Available Seat</span>
        </div>
        <div className="flex items-center gap-3">
          <RiRectangleFill className="text-pink-500 text-[25px]" />
          <span>Your Seat</span>
        </div>
        <div className="flex items-center gap-3">
          <RiRectangleFill className="text-black text-[25px]" />
          <span>Unavilable Seat</span>
        </div>
      </div>
      {/* Seat Details */}
      <div className="border p-3 bg-white rounded-md flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <span className="text-16px font-bold text-gray-600">
            Selected Seats
          </span>
          <div className="flex gap-2 flex-wrap">
            {yourbookedSeats.map((seat) => (
              <span
                className="px-2 bg-blue-500 text-white rounded-md text-[14px]"
                key={seat}
              >
                {seat}
              </span>
            ))}
          </div>
        </div>
        <hr />
        <div className="flex justify-between items-center">
          <div className="flex flex-col justify-center">
            <p className="text-[18px] font-bold">Mumbai</p>
            <span className="text-[14px] text-gray-500 font-semibold">
              09:30 AM
            </span>
          </div>
          <FaArrowRight className="text-[20px] text-blue-500" />
          <div>
            <p className="text-[18px] font-bold">Banglore</p>
            <span className="text-[14px] text-gray-500 font-semibold">
              05:00 PM
            </span>
          </div>
        </div>
        <hr />
        <div className="flex flex-col">
          <h2 className="text-16px font-bold text-gray-600 mb-1">
            Fare Details
          </h2>
          <div className="flex justify-between items-center">
            <div className="flex flex-col items-center">
              <span className="font-semibold">Total amount</span>
              <span className="text-[14px] text-gray-600">Inc. all taxes</span>
            </div>
            <span className="text-[17px] font-bold text-green-500">
              INR {1800}
            </span>
          </div>
        </div>
        <hr />
        <div className="flex justify-center items-center">
          <button
            className="bg-blue-500 w-fit px-3 py-2 rounded-md font-bold text-white"
            onClick={handleSubmit}
          >
            Proceed to book
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeatDetails;
