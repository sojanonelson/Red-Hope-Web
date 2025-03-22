import React, { useEffect, useRef, useState } from "react";
import QRCode from "qrcode-generator";

const PaymentScreen = () => {
  const qrRef = useRef(null);
  const [upiId, setUpiId] = useState("sojanonelson@okicic"); // Replace with dynamic UPI ID if needed
  const [amount, setAmount] = useState(500); // Amount in ₹
  const [transactionId, setTransactionId] = useState("TXN_" + Math.random().toString(36).substr(2, 9)); // Unique transaction ID

  // Generate UPI payment link
  const generateUpiUrl = () => {
    return `upi://pay?pa=${upiId}&pn=Sojan&mc=1234&tid=${transactionId}&tr=${transactionId}&tn=Payment+for+services&am=${amount}&cu=INR`;
  };

  // Generate QR code
  useEffect(() => {
    const upiUrl = generateUpiUrl();
    const qr = QRCode(0, "L");
    qr.addData(upiUrl);
    qr.make();

    if (qrRef.current) {
      qrRef.current.innerHTML = qr.createSvgTag({ scalable: true });
    }
  }, [upiId, amount, transactionId]);

  // Initiate payout using PhonePe API
  const initiatePayout = async () => {
    const payload = {
      merchantId: "<MERCHANT_ID>", // Replace with your merchant ID
      transactionId: transactionId,
      amount: amount,
      currency: "INR",
      upiId: upiId,
    };

    try {
      const response = await fetch("https://api.phonepe.com/payout/v1/initiate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-VERIFY": "<SIGNATURE>", // Replace with your signature
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log("Payout Response:", data);

      if (data.success) {
        alert("Payment initiated successfully!");
      } else {
        alert("Payment failed. Please try again.");
      }
    } catch (error) {
      console.error("Error initiating payout:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h2 className="text-lg font-semibold mb-4">Scan QR Code to Pay</h2>
      <div className="p-4 bg-white rounded-lg shadow-md">
        <div ref={qrRef} />
      </div>

      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Enter Amount (₹):
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        onClick={initiatePayout}
        className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
      >
        Confirm Payment
      </button>
    </div>
  );
};

export default PaymentScreen;