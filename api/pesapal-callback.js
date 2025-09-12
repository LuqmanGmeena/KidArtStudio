export default async function handler(req, res) {
  const { orderTrackingId, status, merchant_reference } = req.body;

  console.log('Pesapal callback received:', { orderTrackingId, status, merchant_reference });

  try {
    if (status === "COMPLETED") {
      console.log(`Payment completed for order: ${orderTrackingId}`);
      
      // Payment completed - redirect user back to app with success status
      const redirectUrl = `${process.env.NEXT_PUBLIC_BASE_URL}?payment_status=completed&order_id=${orderTrackingId}`;
      
      // Update community pool
      global.communityPool = (global.communityPool || 0) + 500;
      
      console.log(`Payment completed, contributed 500 Tshs to community pool`);
      
      // Send redirect response
      res.redirect(302, redirectUrl);
      return;
    }

    res.json({ received: true, status: 'processed' });
  } catch (error) {
    console.error('Callback processing error:', error);
    res.status(500).json({ error: 'Callback processing failed' });
  }
}