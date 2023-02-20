const stripe = require("stripe")(
  "sk_test_51L6nXTLnh85mnCq5etTOFIn6nc5ALJs9ixrebxkRsi916wszYa1BdntTt955ndhQInQS8QXmwN3TTDOG5z6CIXJF00nxJ7Q2zO"
); // clave secreta de la API de Stripe

async function createPaymentIntent(amount, currency, paymentMethod) {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: currency,
      payment_method: paymentMethod,
      confirm: true,
    });
    return paymentIntent;
  } catch (error) {
    console.log("Error creating payment intent:", error);
    return null;
  }
}
