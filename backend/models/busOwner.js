const mongoose = require('mongoose');

const busOwnerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  totalSeats: {
    type: Number,
    required: true,
  },
  totalWindowSeatsAvailable: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  amenities: {
    type: [String],
    required: true,
  },
  busNo: {
    type: String,
    required: true,
  },
});

const BusOwner = mongoose.model('bus_owner', busOwnerSchema);

module.exports = BusOwner;
