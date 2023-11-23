const router = require("express").Router();
const { getTrips, createTrip } = require("../controller/trip");

router.get("/", getTrips);
router.post("/", createTrip);

module.exports = router;
