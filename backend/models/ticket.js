
const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  passengerInfo: { type: [{}], required: true },
  tripID: { type: mongoose.Schema.Types.ObjectId, ref: "Trip", required: true },
  from: { type: mongoose.Schema.Types.ObjectId, required: true },
  to: { type: mongoose.Schema.Types.ObjectId, required: true },
  seats: { type: [String], required: true },
  busFare: { type: Number, required: true },
  busOwnerID: { type: mongoose.Schema.Types.ObjectId, required: true },
  bus_no: { type: String, required: true },
  departureTime: { type: Date, required: true },
  arrivalTime: { type: Date, required: true },
  operator: { type: String, required: true },
  totalPrice: { type: Number, required: true },
});

const Ticket = mongoose.model("Ticket", ticketSchema);
module.exports = Ticket;
