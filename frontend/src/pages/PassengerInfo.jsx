import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { addTicket } from "../redux/actionCreators/ticket";
import axios from "axios";
import useDistrict from "../hooks/UseDistrict";

const PassengerInfo = () => {
  const dispatch = useDispatch();
  const ticket = useSelector((state) => state.ticket);
  // console.log("Ticket:", ticket);
  // console.log(ticket.yourbookedSeats);
  const [baseUrl, setBaseUrl] = useState("");
  const from = useDistrict(ticket.from);
  const to = useDistrict(ticket.to);

  useEffect(() => {
    const url = window.location.origin;
    setBaseUrl(url);
    console.log("Base URL:", url);
  }, []);
  console.log(baseUrl);

  // State to store passenger data for each booked seat
  const [passengerData, setPassengerData] = useState(
    ticket.yourbookedSeats.map((seat) => ({
      seat,
      name: "",
      gender: "",
      age: "",
      email: "",
      mobile: "",
    }))
  );
  console.log(passengerData);

  // State for payment details
  let busFare = ticket.busFare * ticket.yourbookedSeats.length;
  let tax = (busFare * 10) / 100;
  let discount = (busFare * 20) / 100;
  let totalPrice = busFare + tax - discount;

  // Function to handle passenger input changes and update state
  const handleInputChange = (index, field, value) => {
    const updatedPassengerData = [...passengerData];
    updatedPassengerData[index][field] = value;
    setPassengerData(updatedPassengerData);
  };

  // const makePayment = async () => {
  //   dispatch(addTicket({ totalPrice, passengerInfo: passengerData }));

  //   try {
  //     const stripe = await loadStripe(
  //       "pk_test_51OImwQSBthM8UWJybUFRcAkPAk2xLFXlGKHSAMgnfmlu7KgXgfqPyKCty2muRwFbAFyPpHLwNniIZK45yqkVhjZn00qyBFFOqY"
  //     );

  //     if (!stripe) {
  //       console.error("Stripe is not loaded properly");
  //       return;
  //     }

  //     const body = {
  //       totalPrice: ticket.totalPrice,
  //       from,
  //       to,
  //       success: `${baseUrl}/success`,
  //       fail: `${baseUrl}/fail`,
  //     };

  //     const response = await axios.post(
  //       "http://localhost:4000/api/payment/create-checkout-session",
  //       body
  //     );

  //     const session = response.data;

  //     const result = await stripe.redirectToCheckout({
  //       sessionId: session.id,
  //     });

  //     if (result.error) {
  //       console.log(result.error);
  //     }
  //   } catch (error) {
  //     console.error("Error during payment:", error);
  //   }
  // };

  async function makePayment() {
    dispatch(addTicket({ totalPrice, passengerInfo: passengerData }));
    const stripe = await loadStripe(
      "pk_test_51OImwQSBthM8UWJybUFRcAkPAk2xLFXlGKHSAMgnfmlu7KgXgfqPyKCty2muRwFbAFyPpHLwNniIZK45yqkVhjZn00qyBFFOqY"
    );
    const body = {
      fromTo: `${from} to ${to}`,
      total: 1,
      busFare: ticket.totalPrice,
      success: `${baseUrl}/success`,
      fail: `${baseUrl}/fail`,
    };

    const header = {
      "Content-Type": "application/json",
    };

    const response = await fetch(
      "http://localhost:4000/redbus/create-checkout-session",
      {
        method: "POST",
        headers: header,
        body: JSON.stringify(body),
      }
    );

    const session = await response.json();
    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    });
    if (result.error) {
      console.log(result.error);
    }
    return result;
  }
  return (
    <div className="flex justify-between p-4 bg-gray-100 w-full px-20">
      {/* Passenger details */}
      <div className="w-[65%] p-6 bg-white rounded-lg shadow-md flex flex-col gap-5 overflow-y-scroll h-screen">
        <h1 className="text-[30px]">Passenger Details</h1>
        <hr />
        {ticket.yourbookedSeats.map((user, index) => (
          <div key={index} className="mb-6">
            <h2 className="text-xl font-semibold mb-2">
              Passenger {index + 1}{" "}
              <span className="ml-5 text-gray-500">{user}</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mb-4">
                <label
                  className="block text-sm font-medium text-gray-600"
                  htmlFor={`name-${index}`}
                >
                  Name
                </label>
                <input
                  id={`name-${index}`}
                  type="text"
                  value={passengerData[index].name}
                  onChange={(e) =>
                    handleInputChange(index, "name", e.target.value)
                  }
                  className="mt-1 p-3 border border-gray-300 rounded w-full focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium text-gray-600"
                  htmlFor={`gender-${index}`}
                >
                  Gender
                </label>
                <select
                  id={`gender-${index}`}
                  value={passengerData[index].gender}
                  onChange={(e) =>
                    handleInputChange(index, "gender", e.target.value)
                  }
                  className="mt-1 p-3 border border-gray-300 rounded w-full focus:outline-none focus:border-blue-500"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="mb-4">
                <label
                  className="block text-sm font-medium text-gray-600"
                  htmlFor={`age-${index}`}
                >
                  Age (in years)
                </label>
                <input
                  id={`age-${index}`}
                  type="text"
                  value={passengerData[index].age}
                  onChange={(e) =>
                    handleInputChange(index, "age", e.target.value)
                  }
                  className="mt-1 p-3 border border-gray-300 rounded w-full focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium text-gray-600"
                  htmlFor={`email-${index}`}
                >
                  Email ID
                </label>
                <input
                  id={`email-${index}`}
                  type="email"
                  value={passengerData[index].email}
                  onChange={(e) =>
                    handleInputChange(index, "email", e.target.value)
                  }
                  className="mt-1 p-3 border border-gray-300 rounded w-full focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium text-gray-600"
                  htmlFor={`mobile-${index}`}
                >
                  Mobile Number
                </label>
                <input
                  id={`mobile-${index}`}
                  type="text"
                  value={passengerData[index].mobile}
                  onChange={(e) =>
                    handleInputChange(index, "mobile", e.target.value)
                  }
                  className="mt-1 p-3 border border-gray-300 rounded w-full focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Ticket Details */}
      <div className="w-[30%] p-6 bg-white rounded-lg shadow-md h-fit">
        <h2 className="text-xl font-semibold mb-4">Fare Details</h2>
        <div className="mb-4 flex justify-between">
          <p className="text-gray-600">Base Fare</p>
          <span className="font-semibold text-lg">INR {busFare}</span>
        </div>
        <div className="mb-4 flex justify-between">
          <p className="text-gray-600">Tax</p>
          <span className="font-semibold text-lg">INR {tax}</span>
        </div>
        <div className="mb-4 flex justify-between">
          <p className="text-gray-600">Offer Applied</p>
          <span className="font-semibold text-lg">INR {discount}</span>
        </div>
        <hr className="my-4" />
        <div className="mb-4 flex justify-between">
          <p className="text-xl font-semibold">Total Price</p>
          <span className="text-2xl font-semibold text-blue-500">
            INR {totalPrice}
          </span>
        </div>
        {/* Payment details input fields */}
        <div className="flex justify-center items-center w-full">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 focus:outline-none"
            onClick={makePayment}
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default PassengerInfo;
