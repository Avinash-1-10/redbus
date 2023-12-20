import React, { useState } from "react";
import { RiRectangleFill } from "react-icons/ri";
import SeatDetails from "./SeatDetails";

const Seats = ({ bookedSeats, trip }) => {
  console.log("Booked seats:", bookedSeats);

  const L1 = ["l11", "l12", "l13", "l14", "l15", "l16", "l17"];
  const L2 = ["l21", "l22", "l23", "l24", "l25", "l26", "l27"];
  const L3 = ["l31", "l32", "l33", "l34", "l35", "l36", "l37"];
  const U1 = ["u11", "u12", "u13", "u14", "u15", "u16", "u17"];
  const U2 = ["u21", "u22", "u23", "u24", "u25", "u26", "u27"];
  const U3 = ["u31", "u32", "u33", "u34", "u35", "u36", "u37"];

  const [yourbookedSeats, setYourBookedSeats] = useState([]);
  console.log("Your booked seats:", yourbookedSeats);

  const handleSeatClick = (seat) => {
    if (!bookedSeats.includes(seat)) {
      setYourBookedSeats((prevSeats) =>
        prevSeats.includes(seat)
          ? prevSeats.filter((selectedSeat) => selectedSeat !== seat)
          : [...prevSeats, seat]
      );
    }
  };
  const isSeatBooked = (seat) => bookedSeats.includes(seat);
  const isSeatSelected = (seat) => yourbookedSeats.includes(seat);

  const renderSeats = (seats) => (
    <div className="flex gap-3">
      {seats.map((seat) => (
        <RiRectangleFill
          key={seat}
          className={`text-white text-[30px] cursor-pointer ${
            isSeatBooked(seat) ? "fill-black" : ""
          } ${isSeatSelected(seat) ? "fill-pink-500" : ""}`}
          onClick={() => {
            console.log(`Clicked on seat: ${seat}`);
            handleSeatClick(seat);
          }}
        />
      ))}
    </div>
  );

  return (
    <div className="bg-gray-200 flex gap-10 items-center p-5">
      <div className="flex flex-col gap-3">
        <h2>Lower Deck</h2>
        <div className="border border-black w-fit p-3 flex flex-col gap-1 rounded-md">
          <div>{renderSeats(L1)}</div>
          <div className="mb-5">{renderSeats(L2)}</div>
          <div>{renderSeats(L3)}</div>
        </div>
        <h2>Upper Deck</h2>
        <div className="border border-black w-fit p-3 flex flex-col gap-1 rounded-md">
          <div>{renderSeats(U1)}</div>
          <div className="mb-5">{renderSeats(U2)}</div>
          <div>{renderSeats(U3)}</div>
        </div>
        <p className="text-[14px] text-gray-500">
          *You can't select 5 seats at a time
        </p>
      </div>
      <SeatDetails yourbookedSeats={yourbookedSeats} trip={trip} />
    </div>
  );
};

export default Seats;
