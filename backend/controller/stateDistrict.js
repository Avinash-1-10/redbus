const StateDistrict = require("../models/stateDistrict");
const mongoose  = require("mongoose")

const getStateDistricts = async (req, res) => {
  const { query } = req.query;
  try {
    const matchingDistricts = await StateDistrict.aggregate([
      {
        $unwind: "$districts",
      },
      {
        $match: {
          "districts.name": { $regex: new RegExp(query, "i") },
        },
      },
      {
        $addFields: {
          isStartsWithQuery: {
            $eq: [{ $substrCP: ["$districts.name", 0, query.length] }, query],
          },
        },
      },
      {
        $sort: {
          isStartsWithQuery: -1,
        },
      },
      {
        $limit: 10,
      },
      {
        $group: {
          _id: null,
          districts: {
            $push: {
              id: "$districts._id",
              district: "$districts.name",
              state: "$state",
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          districts: 1,
        },
      },
    ]);
    res.json(matchingDistricts[0]?.districts || []);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
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



const getDistrict = async (req, res) => {

  try {
    const { id } = req.query;

    // Using async/await with a more expressive variable name
    const stateDistrict = await StateDistrict.findOne({ "districts._id": id }, { 'districts.$': 1 });

    // Checking if the result exists before accessing its properties
    if (stateDistrict && stateDistrict.districts && stateDistrict.districts.length > 0) {
      const district = stateDistrict.districts[0];
      res.json(district);
    } else {
      // Handle the case where the district with the given ID is not found
      res.status(404).json({ error: 'District not found' });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



module.exports = {
  getStateDistricts,
  getDistrict,
  createStateDistrict,
};
