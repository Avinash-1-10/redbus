const StateDistrict = require("../models/stateDistrict");
const Trip = require("../models/trip");

const getTrips = async (req, res) => {
  const { date, rating, from, to } = req.query;
  console.log(req.params);

  try {
    const filter = {};

    if (date) {
      filter.date = Date.parse(date);
    }

    if (rating) {
      filter.rating = { $gte: +rating };
    }

    if (from) {
      const fromDistrict = await StateDistrict.findOne(
        { "districts.name": from },
        { "districts.$": 1 }
      );

      if (
        fromDistrict &&
        fromDistrict.districts &&
        fromDistrict.districts.length > 0
      ) {
        filter.from = fromDistrict.districts[0]._id;
      } else {
        console.log('District not found for "from" location');
      }
    }

    if (to) {
      const toDistrict = await StateDistrict.findOne(
        { "districts.name": to },
        { "districts.$": 1 }
      );

      if (
        toDistrict &&
        toDistrict.districts &&
        toDistrict.districts.length > 0
      ) {
        filter.to = toDistrict.districts[0]._id;
      } else {
        console.log('District not found for "to" location');
      }
    }
    console.log(filter);
    const trips = await Trip.find(filter).limit(50);
    res.status(200).json(trips);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

const createTrip = async (req, res) => {
  try {
    const trip = await Trip.create(req.body);
    res.status(201).json(trip);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getTrips, createTrip };
