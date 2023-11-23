const StateDistrict = require("../models/stateDistrict");

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
            $eq: [
              { $substrCP: ["$districts.name", 0, query.length] },
              query,
            ],
          },
        },
      },
      {
        $sort: {
          isStartsWithQuery: -1,
        },
      },
      {
        $limit: 10, // Limit after sorting
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

module.exports = {
  getStateDistricts,
  createStateDistrict,
};
