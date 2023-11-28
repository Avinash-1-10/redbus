const mongoose = require("mongoose");
// const {startDate,endDate, from, to, busOwnerID, arrivalTime, departureTime, bookedSeats, busFare} = req.body
const tripSchema = new mongoose.Schema({
  startDate: { type: Number, required: true },
  endDate: { type: Number, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  arrivalTime: { type: Date, required: true },
  departureTime: { type: Date, required: true },
  bookedSeats: { type: [String], required: true },
  busFare: { type: Number, required: true },
  busOwnerID: { type: mongoose.Schema.Types.ObjectId, ref: 'BusOwners', required: true },
  category: { type: String, required: true },
  bus_no: { type: String, required: true,},
  amenities_list: { type: [String], required: true },
  operator: { type: String, required: true },
  rating: { type: Number, required: true },
});


const Trip = mongoose.model("Trip", tripSchema);
module.exports = Trip;

