import React, { useState } from "react";

const PassengerInfo = () => {
  // Array of booked seats
  let yourbookedSeats = ["L12", "L23", "U12", "U15", "L25"];

  // State to store passenger data for each booked seat
  const [passengerData, setPassengerData] = useState(
    yourbookedSeats.map((seat) => ({
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
  const [paymentData, setPaymentData] = useState({
    baseFare: 700,
    tax: 700,
    offerApplied: 0,
    totalAmount: 700,
  });

  // Function to handle passenger input changes and update state
  const handleInputChange = (index, field, value) => {
    const updatedPassengerData = [...passengerData];
    updatedPassengerData[index][field] = value;
    setPassengerData(updatedPassengerData);
  };

  // Function to handle payment input changes and update state
  const handlePaymentInputChange = (field, value) => {
    setPaymentData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  return (
    <div className="flex justify-between p-4 bg-gray-100 w-full px-20">
      {/* Passenger details */}
      <div className="w-[65%] p-6 bg-white rounded-lg shadow-md flex flex-col gap-5 overflow-y-scroll h-screen">
        <h1 className="text-[30px]">Passenger Details</h1>
        <hr />
        {yourbookedSeats.map((user, index) => (
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
          <span className="font-semibold text-lg">
            INR {paymentData.baseFare}
          </span>
        </div>
        <div className="mb-4 flex justify-between">
          <p className="text-gray-600">Tax</p>
          <span className="font-semibold text-lg">INR {paymentData.tax}</span>
        </div>
        <div className="mb-4 flex justify-between">
          <p className="text-gray-600">Offer Applied</p>
          <span className="font-semibold text-lg">
            INR {paymentData.offerApplied}
          </span>
        </div>
        <hr className="my-4" />
        <div className="mb-4 flex justify-between">
          <p className="text-xl font-semibold">Total Price</p>
          <span className="text-2xl font-semibold text-blue-500">
            INR {paymentData.totalAmount}
          </span>
        </div>
        {/* Payment details input fields */}
        <div className="flex justify-center items-center w-full">
          <button className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 focus:outline-none">
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default PassengerInfo;
