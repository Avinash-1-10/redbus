const mongoose = require("mongoose");

const stateDistrictSchema = new mongoose.Schema({
  state: {
    type: String,
    required: true,
  },
  districts: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
      },
      name: {
        type: String,
        required: true,
      },
    },
  ],
});
const StateDistrict = mongoose.model("state_district", stateDistrictSchema);

module.exports = StateDistrict;
