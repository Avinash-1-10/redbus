const BusOwner = require("../models/busOwner");
const StateDistrict = require("../models/stateDistrict");
const Trip = require("../models/trip");

const getTrips = async (req, res) => {
  const { date, rating, from, to, arrivalSessions, departureSessions } = req.query;
  console.log(rating)

  try {
    const filter = {};

    if (date) {
      filter.startDate = Date.parse(date);
    }

    if (rating) {
      const numericRating = +rating;

      if (numericRating >= 0 && numericRating < 2) {
        filter.rating = { $gte: 0, $lt: 2 };
      } else if (numericRating >= 2 && numericRating < 4) {
        filter.rating = { $gte: 2, $lt: 4 };
      } else if (numericRating >= 4 && numericRating <= 5) {
        filter.rating = { $gte: 4, $lte: 5 };
      } else {
        console.log('Invalid rating range');
      }
    }
    if (arrivalSessions && arrivalSessions.length > 0) {
      // Add a filter based on multiple arrival sessions
      const arrivalTimeFilters = arrivalSessions.map(session => {
        const currentDate = new Date();
        switch (session.toLowerCase()) {
          case 'morning':
            return { arrivalTime: { $gte: new Date(currentDate.setHours(6, 0, 0)), $lt: new Date(currentDate.setHours(12, 0, 0)) } };
          case 'afternoon':
            return { arrivalTime: { $gte: new Date(currentDate.setHours(12, 0, 0)), $lt: new Date(currentDate.setHours(18, 0, 0)) } };
          case 'evening':
            return { arrivalTime: { $gte: new Date(currentDate.setHours(18, 0, 0)), $lt: new Date(currentDate.setHours(24, 0, 0)) } };
          default:
            console.log('Invalid arrival session:', session);
            return null;
        }
      });

      // Merge multiple arrival time filters using $or
      filter.$or = arrivalTimeFilters.filter(Boolean);
    }

    if (departureSessions && departureSessions.length > 0) {
      // Add a filter based on multiple departure sessions
      const departureTimeFilters = departureSessions.map(session => {
        const currentDate = new Date();
        switch (session.toLowerCase()) {
          case 'morning':
            return { departureTime: { $gte: new Date(currentDate.setHours(6, 0, 0)), $lt: new Date(currentDate.setHours(12, 0, 0)) } };
          case 'afternoon':
            return { departureTime: { $gte: new Date(currentDate.setHours(12, 0, 0)), $lt: new Date(currentDate.setHours(18, 0, 0)) } };
          case 'evening':
            return { departureTime: { $gte: new Date(currentDate.setHours(18, 0, 0)), $lt: new Date(currentDate.setHours(24, 0, 0)) } };
          default:
            console.log('Invalid departure session:', session);
            return null;
        }
      });

      // Merge multiple departure time filters using $or
      filter.$or = (filter.$or || []).concat(departureTimeFilters.filter(Boolean));
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
  const {
    startDate,
    endDate,
    from,
    to,
    busOwnerID,
    arrivalTime,
    departureTime,
    bookedSeats,
    busFare,
  } = req.body;

  try {
    const busOwner = await BusOwner.findById(busOwnerID);
    if (!busOwner) {
      return res.status(404).json({ message: "Bus Owner not found" });
    }

    const trip = await Trip.create({
      startDate,
      endDate,
      from,
      to,
      arrivalTime,
      departureTime,
      bookedSeats,
      busFare,
      busOwnerID,
      operator: busOwner.name,
      category: busOwner.category,
      bus_no: busOwner.busNo,
      amenities_list: busOwner.amenities,
      rating: busOwner.rating,
    });

    res.status(201).json(trip);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getTrips, createTrip };
