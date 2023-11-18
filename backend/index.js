const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const stateDistrictRouter = require("./routes/stateDistrict.js");
dotenv.config()


const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 4000;

const app = express();

main().catch((err) => console.log(err));

async function main() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Database connected");
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
  }
}

app.use(cors());
app.use(express.json());
app.use("/api/state_districts", stateDistrictRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
