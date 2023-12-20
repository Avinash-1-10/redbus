const Ticket = require("../models/ticket");
const Trip = require("../models/trip");

const saveTicket = async (req, res) => {
  try {
    const { passengerInfo, tripID, totalPrice, seats } = req.body;

    // Fetch the trip details
    const trip = await Trip.findById(tripID);
    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }


    const ticketData = {
      passengerInfo,
      tripID,
      from: trip.from,
      to: trip.to,
      seats,
      busFare: trip.busFare,
      busOwnerID: trip.busOwnerID,
      bus_no: trip.bus_no,
      departureTime: trip.departureTime,
      arrivalTime: trip.arrivalTime,
      operator: trip.operator,
      totalPrice,
    };
    console.log(ticketData)
    // Create the ticket
    const doc = await Ticket.create(ticketData);

    res.status(201).json(doc);
  } catch (error) {
    res.status(501).json({ message: error.message });
  }
};

module.exports = { saveTicket };

