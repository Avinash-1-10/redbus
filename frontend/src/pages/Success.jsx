import React from "react";
import { useDispatch, useSelector } from "react-redux";
import useDistrict from "../hooks/UseDistrict";
import useTime from "../hooks/Usetime";
import useDate from "../hooks/UseDate";
import { useNavigate } from "react-router-dom";
import { removeTicket } from "../redux/actionCreators/ticket";
import { clearFilter } from "../redux/actionCreators/filter";

const Success = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
  const data = useSelector((state) => state.ticket);
  console.log(data);
  const {
    from,
    to,
    startDate,
    endDate,
    departureTime,
    arrivalTime,
    totalPrice,
    operator,
    bus_no,
    yourbookedSeats
  } = data;
  const fromLocation = useDistrict(from);
  const toLocation = useDistrict(to);
  const dTime = useTime(departureTime);
  const aTime = useTime(arrivalTime);
  const sDate = useDate(startDate);
  const eDate = useDate(endDate);

  const handleNavigate = ()=>{
    dispatch(removeTicket())
    dispatch(clearFilter())
    navigate("/")
  }
  return (
    <div className="bg-white p-8 rounded-md shadow-md max-w-md mx-auto mt-8">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold">Bus Ticket</h2>
        <p className="text-gray-500">Your booking is successful!</p>
      </div>

      <div className="flex justify-between mb-4">
        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-600">From</p>
          <p>{fromLocation}</p>
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-600">To</p>
          <p>{toLocation}</p>
        </div>
      </div>

      <div className="flex justify-between mb-4">
        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-600">Departure</p>
          <p>{sDate}</p>
          <p>{dTime}</p>
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-600">Arrival</p>
          <p>{eDate}</p>
          <p>{aTime}</p>
        </div>
      </div>

      <div className="flex justify-between mb-4">
        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-600">Bus No</p>
          <p>{bus_no}</p>
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-600">Your Seats</p>
          <div className="flex gap-2">{yourbookedSeats.map(seat=><span key={seat}>{seat}</span>)}</div>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-sm font-semibold text-gray-600">Operator</p>
        <p>{operator}</p>
      </div>

      <div className="mb-4">
        <p className="text-sm font-semibold text-gray-600">Fare</p>
        <p>₹{totalPrice}</p>
      </div>

      <p className="text-center text-gray-500 text-sm">
        Thank you for choosing our service!
      </p>
      <div className="flex justify-center items-center mt-5">
      <button className="bg-blue-500 text-white px-3 py-1 rounded-md" onClick={handleNavigate} >Home</button>
      </div>
    </div>
  );
};

export default Success;
