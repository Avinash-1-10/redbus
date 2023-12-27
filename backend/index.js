const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const stateDistrictRouter = require("./routes/stateDistrict.js");
const tripRouter = require("./routes/trip.js")
const ticketRouter = require("./routes/ticket.js")
const paymentRouter = require("./routes/payment.js")
const stripe = require("stripe")("sk_test_51OImwQSBthM8UWJysAKpLabJhtIw9v6vhWlvWKQ2QFavZEykhGuQfyLBdkDRtcxTvm9qYo1JkAL6oD8ULucTDSkG00vaa4r7Bn");

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
app.use("/api/trips", tripRouter)
app.use("/api/tickets", ticketRouter)
// app.use("/api/payment", paymentRouter)

app.post("/redbus/create-checkout-session", async (req, res) => {
  const { fromTo, total, busFare, success, fail } = req.body;
  const lineItems = [
    {
      price_data: {
        currency: "inr",
        product_data: {
          name: fromTo,
        },
        unit_amount: busFare * 100,
      },
      quantity: total,
    },
  ];

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: success,
    cancel_url: fail,
  });

  res.json({ id: session.id });
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
