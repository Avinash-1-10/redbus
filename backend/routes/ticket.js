const router = require("express").Router();
const { saveTicket } = require("../controller/ticket");

router.post("/", saveTicket);

module.exports = router;
