const Ticket = require("../models/ticket");
const Trip = require("../models/trip");

const saveTicket = async (req, res) => {
  try {
    const { name, gender, email, phone, tripID } = req.body;
    console.log(req.body);

    const trip = await Trip.findById(tripID);
    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    const ticketData = {
      name,
      gender,
      email,
      phone,
      tripID,
      from: trip.from,
      to: trip.to,
      busFare: trip.busFare,
      busOwnerID: trip.busOwnerID,
      bus_no: trip.bus_no,
      startTime: trip.startTime,
      endTime: trip.endTime,
    };

    const doc = await Ticket.create(ticketData);

    res.status(201).json(doc);
  } catch (error) {
    res.status(501).json({ message: error.message });
  }
};

module.exports = { saveTicket };
