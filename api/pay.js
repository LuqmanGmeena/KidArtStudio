import crypto from 'crypto';

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { amount, phone, userId, description } = req.body;

  try {
    // Step 1: Request Access Token
    const auth = await fetch("https://pay.pesapal.com/v3/api/Auth/RequestToken", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        consumer_key: process.env.PESAPAL_CONSUMER_KEY,
        consumer_secret: process.env.PESAPAL_CONSUMER_SECRET,
      }),
    }).then(r => r.json());

    // Step 2: Submit Order
    const payload = {
      id: crypto.randomUUID(),
      currency: "TZS",
      amount: amount,
      description: description || "KidArt Studio Account Activation",
      callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/pesapal-callback`,
      notification_id: "kidart-activation",
      branch: "KidArtStudio",
      billing_address: {
        phone_number: phone,
        country_code: "TZ"
      }
    };

    const order = await fetch("https://pay.pesapal.com/v3/api/Transactions/SubmitOrderRequest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
      body: JSON.stringify(payload),
    }).then(r => r.json());

    res.json(order);
  } catch (err) {
    console.error('Pesapal payment error:', err);
    res.status(500).json({ error: err.message });
  }
}