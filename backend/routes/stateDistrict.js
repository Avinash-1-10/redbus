const router = require("express").Router();
const {
  getStateDistricts,
  createStateDistrict,
} = require("../controller/stateDistrict");

router.get("/", getStateDistricts);
router.post("/", createStateDistrict);

module.exports = router;
