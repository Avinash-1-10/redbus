const StateDistrict = require("../models/stateDistrict");

const getStateDistricts = async (req, res) => {
  try {
    const stateDistricts = await StateDistrict.find();
    res.json(stateDistricts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createStateDistrict = async (req, res) => {
  // console.log(req.body);
  try {
    const newDistrict = new StateDistrict(req.body);
    await newDistrict.save();
    res.status(201).json(newDistrict);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }

};

module.exports = {
  getStateDistricts,
  createStateDistrict,
};
