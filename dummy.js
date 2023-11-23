// District Search api ////////////////////////////////////////////////////////////////

// Using aggregation

// const getStateDistricts = async (req, res) => {
//   const { query } = req.query;
//   try {
//     const matchingDistricts = await StateDistrict.aggregate([
//       {
//         $unwind: "$districts",
//       },
//       {
//         $match: {
//           "districts.name": { $regex: new RegExp(query, "i") },
//         },
//       },
//       {
//         $addFields: {
//           isStartsWithQuery: {
//             $eq: [{ $substrCP: ["$districts.name", 0, query.length] }, query],
//           },
//         },
//       },
//       {
//         $sort: {
//           isStartsWithQuery: -1,
//         },
//       },
//       {
//         $group: {
//           _id: null,
//           districts: {
//             $push: {
//               id: "$districts._id",
//               district: "$districts.name",
//               state: "$state"
//             },
//           },
//         },
//       },
//       {
//         $project: {
//           _id: 0,
//           districts: 1,
//         },
//       },
//       {
//         $limit: 10,
//       },
//     ]);
// // console.log(matchingDistricts[0])
//     res.json(matchingDistricts[0]?.districts || []);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Internal Server Error");
//   }
// };

// Without aggrgation
// const getStateDistricts = async (req, res) => {
//   const { query } = req.query;
//   try {
//     // Step 1: Find matching districts
//     const matchingDistricts = await StateDistrict.find({
//       'districts.name': { $regex: new RegExp(query, 'i') },
//     }).select({ _id: 0, state: 1, 'districts.$': 1 });
// console.log(matchingDistricts[2].districts)
//     // Step 2: Sort districts based on query
//     matchingDistricts.sort((a, b) => {
//       const nameA = a.districts[0].name.toLowerCase();
//       const nameB = b.districts[0].name.toLowerCase();
//       const queryLower = query.toLowerCase();

//       if (nameA.startsWith(queryLower) && !nameB.startsWith(queryLower)) {
//         return -1;
//       } else if (!nameA.startsWith(queryLower) && nameB.startsWith(queryLower)) {
//         return 1;
//       } else {
//         return nameA.localeCompare(nameB);
//       }
//     });

//     // Step 3: Prepare response
//     const result = matchingDistricts.slice(0, 10).map(item => ({
//       id: item.districts[0]._id,
//       name: item.districts[0].name,
//       stateName: item.state,
//     }));

//     // Step 4: Send the response
//     res.json(result);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Internal Server Error');
//   }
// };
