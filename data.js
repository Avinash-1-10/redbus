app.post("/redbus/create-checkout-session", async (req, res) => {
    const { trip } = req.body;
    console.log("fare", trip);
    const lineItems = [
      {
        price_data: {
          currency: "inr",
          product_data: {
            name: trip.busOperator,
          },
          unit_amount: trip.busFare * 100,
        },
        quantity: trip.tobookSeat.length,
      },
    ];
  
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    });
  
    res.json({ id: session.id });
  });


  //
  async function makePayment() {
    handleSubmit();
    const stripe = await loadStripe(
      "pk_test_51OJIGgSC5FgsqqSXwOAajJy83RYGnRT5oqNVYFYe8LMed1vjgj13PmzXzSHko9UElrMfuuhfEl3H1ymyKTBxPgmt0000fOrYZc"
    );
    const body = {
      trip: data,
    };

    const header = {
      "Content-Type": "application/json",
    };

    const response = await fetch(
      "http://localhost:8080/redbus/create-checkout-session",
      {
        method: "POST",
        headers: header,
        body: JSON.stringify(body),
      }
    );

    const session = await response.json();
    console.log("36");
    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    });

    console.log("41");

    console.log("44");
    if (result.error) {
      console.log(result.error);
    }

    // Resolve the promise once the payment process is completed
    return result;
  }