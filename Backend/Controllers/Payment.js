const stripe = require("stripe")(
  "sk_test_51O5SWgSDazQDrMhomJjwEcLp0fdMjqWbonjEXmAgN7MROycOf2fhfVPVzdwL1X29brLMpvuy6qXdGKKVlAZEQq5j00WjAMaLMi"
); 

// Define an Express route for handling payments
exports.handlePayment = async (req, res) => {

  const { products } = req.body; // Items from the client (cart)
  console.log(products);

// Create a new Stripe checkout session
  const lineItems = products.map((products) => ({
    price_data: {
      currency: "inr",
      product_data: {
        name: products.name,
      },
      unit_amount: products.price * 100, // Stripe expects amount in cents
    },
    quantity: products.qty,
  }));
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: "http://localhost:3000/success", // Redirect URL after successful payment
    cancel_url: "http://localhost:3000/cancel", // Redirect URL after payment cancellation
  });

  res.json({ id: session.id });

};

