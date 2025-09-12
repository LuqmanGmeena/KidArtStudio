import * as functions from "firebase-functions";
import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import * as admin from "firebase-admin";

admin.initializeApp();
const db = admin.firestore();

const app = express();

// Middleware kusoma body kutoka Pesapal (JSON + urlencoded)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// IPN endpoint
app.post("/pesapalIPN", async (req: Request, res: Response) => {
  try {
    console.log("Pesapal IPN received:", req.body);

    // Example: hifadhi IPN data kwenye Firestore
    await db.collection("pesapal_ipn_logs").add({
      receivedAt: admin.firestore.FieldValue.serverTimestamp(),
      body: req.body,
    });

    // Respond kwa Pesapal kwamba umepokea
    res.status(200).send("IPN received successfully");
  } catch (error) {
    console.error("Error handling Pesapal IPN:", error);
    res.status(500).send("Server error");
  }
});

// Export Firebase Function
export const pesapalIPN = functions.https.onRequest(app);
