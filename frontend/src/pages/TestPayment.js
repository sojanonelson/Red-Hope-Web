import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PaymentScreen = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState(500);
  const [donorName, setDonorName] = useState("");
  const [impactMessage, setImpactMessage] = useState("");

  // Psychological triggers: Social proof, impact visualization
  const impactMessages = [
    "Your donation could help save up to 3 lives!",
    "Every ₹500 helps us reach 100 more potential donors",
    "Join 10,000+ heroes who support our mission monthly",
    "Blood shortages affect 1 in 4 patients - you can help change this"
  ];

  useEffect(() => {
    // Rotate impact messages every 5 seconds
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * impactMessages.length);
      setImpactMessage(impactMessages[randomIndex]);
    }, 5000);
    
    // Set initial message
    setImpactMessage(impactMessages[0]);
    
    return () => clearInterval(interval);
  }, []);

  const loadRazorpay = () => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = openRazorpay;
    document.body.appendChild(script);
  };

  const openRazorpay = () => {
    const options = {
      key: process.env.REACT_APP_RAZOR_API,
      amount: amount * 100,
      currency: "INR",
      name: "Red Hope",
      description: "Supporting blood donation awareness",
      image: "https://i.ibb.co/0yPYYzWP/logo.png", // Add your logo
      handler: function (response) {
        // Show appreciation and redirect
        alert(`Thank you, ${donorName || 'hero'}! Your support will save lives.`);
        navigate("/thank-you", { state: { donorName,amount  } }); 
      },
      prefill: {
        name: donorName || "Blood Donor Hero",
        email: "your.email@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#e63946", // Blood red color for psychological association
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Hero section with emotional appeal */}
        <div className="bg-red-600 p-6 text-white text-center">
          <h1 className="text-3xl font-bold mb-2">Be a Lifesaver Today</h1>
          <p className="opacity-90">{impactMessage}</p>
        </div>
        
        

        <div className="p-6">
          {/* Personalization increases commitment */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Your Name (optional)
            </label>
            <input
              type="text"
              value={donorName}
              onChange={(e) => setDonorName(e.target.value)}
              placeholder="We'd love to thank you personally"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Anchoring effect with suggested amounts */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Donation Amount (₹)
            </label>
            <div className="grid grid-cols-3 gap-3 mb-3">
              {[200, 500, 1000].map((value) => (
                <button
                  key={value}
                  onClick={() => setAmount(value)}
                  className={`py-2 px-4 rounded-lg border ${
                    amount === value
                      ? "bg-red-100 border-red-500 text-red-700"
                      : "border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  ₹{value}
                </button>
              ))}
            </div>
            <input
              type="number"
              min="100"
              value={amount}
              onChange={(e) => setAmount(Math.max(100, parseInt(e.target.value) || 100))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Urgency and exclusivity */}
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded">
            <p className="text-sm text-red-700">
              <span className="font-bold">Limited time:</span> Every donation this month 
              will be matched 2x by our corporate partners!
            </p>
          </div>

          {/* Primary CTA with strong visual hierarchy */}
          <button
            onClick={loadRazorpay}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg shadow-md transition duration-200 transform hover:scale-105"
          >
            Donate ₹{amount} & Save Lives
          </button>

          {/* Trust indicators */}
          <div className="mt-6 text-center text-xs text-gray-500">
            <p className="mb-2">Secure payment processed by Razorpay</p>
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentScreen;