const router = require("express").Router();
const {
  getStateDistricts,
  createStateDistrict,
  getDistrict,
} = require("../controller/stateDistrict");

router.get("/", getStateDistricts);
router.post("/", createStateDistrict);
router.get("/district", getDistrict);

module.exports = router;
