import React from 'react'

const Fail = () => {
  return (
    <div className="bg-white p-8 rounded-md shadow-md max-w-md mx-auto mt-8">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold text-red-500">Booking Failed</h2>
        <p className="text-gray-500">We're sorry, but there was an issue processing your booking.</p>
      </div>

      <div className="mb-4">
        <p className="text-sm font-semibold text-gray-600">Error Details</p>
        <p className="text-red-500">Payment unsuccessful. Please try again or contact support.</p>
      </div>

      <div className="mb-4">
        <p className="text-sm font-semibold text-gray-600">Contact Support</p>
        <p className="text-blue-500">support@example.com</p>
      </div>

      <p className="text-center text-gray-500 text-sm">We apologize for any inconvenience.</p>
    </div>
  );
}

export default Fail