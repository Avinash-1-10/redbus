// ticket.js

const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gender: { type: String, required: true },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
      },
      message: "Invalid email address",
    },
  },
  phone: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(value);
      },
      message: "Invalid phone number",
    },
  },
  tripID: { type: mongoose.Schema.Types.ObjectId, ref: "Trip", required: true },
  from: { type: mongoose.Schema.Types.ObjectId, required: true },
  to: { type: mongoose.Schema.Types.ObjectId, required: true },
  seats: { type: [String], required: true },
  busFare: { type: Number, required: true },
  busOwnerID: { type: mongoose.Schema.Types.ObjectId, required: true },
  bus_no: { type: String, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
});

const Ticket = mongoose.model("Ticket", ticketSchema);
module.exports = Ticket;
