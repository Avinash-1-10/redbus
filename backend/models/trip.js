const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
  date: { type: Number, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  busOwnerID: { type: mongoose.Schema.Types.ObjectId, ref: 'BusOwner', required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  category: { type: String, required: true },
  seatBooked: { type: [String], required: true },
  bus_no: { type: String, required: true, unique: true },
  amenities_list: { type: [String], required: true },
  busFare: { type: Number, required: true },
  busName: { type: String, required: true },
  rating: { type: Number, required: true },
});

// Indexes
tripSchema.index({ from: 1, to: 1, busOwnerID: 1 });

const Trip = mongoose.model("Trip", tripSchema);
module.exports = Trip;

