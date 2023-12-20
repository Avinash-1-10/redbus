const stripe = require("stripe")("sk_test_51OImwQSBthM8UWJysAKpLabJhtIw9v6vhWlvWKQ2QFavZEykhGuQfyLBdkDRtcxTvm9qYo1JkAL6oD8ULucTDSkG00vaa4r7Bn");

const createCheckout = async (req, res) => {
  try {
    const { totalPrice, from, to, success, fail } = req.body;

    // Validate totalPrice to ensure it's a valid number
    const numericTotalPrice = parseFloat(totalPrice);
    if (isNaN(numericTotalPrice) || numericTotalPrice <= 0) {
      throw new Error('Invalid totalPrice. Please provide a valid numeric value.');
    }

    // Sanitize from and to to prevent any issues with the product name
    const sanitizedFrom = sanitizeProductName(from);
    const sanitizedTo = sanitizeProductName(to);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: {
              name: `${sanitizedFrom} to ${sanitizedTo}`,
            },
            unit_amount: Math.round(numericTotalPrice * 100),
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: success,
      cancel_url: fail,
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error.message);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
};

// Function to sanitize product name (replace any unwanted characters)
const sanitizeProductName = (productName) => {
  // Implement sanitization logic as needed
  // For simplicity, you can replace any non-alphanumeric characters with underscores
  return productName.replace(/[^a-zA-Z0-9]/g, '_');
};

module.exports = { createCheckout };
