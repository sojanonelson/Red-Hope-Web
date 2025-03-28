import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ThankYouPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [donorName, setDonorName] = useState("");
  const [donationAmount, setDonationAmount] = useState(0);

  // Get donation details from navigation state or query params
  useEffect(() => {
    if (location.state) {
      setDonorName(location.state.donorName || "");
      setDonationAmount(location.state.amount || 0);
    }
  }, [location]);

  // Calculate impact based on donation amount
  const calculateLivesImpacted = (amount) => {
    return Math.floor(amount / 500); // Assuming ₹500 helps one life
  };

  // Social sharing function
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "I just supported blood donation awareness!",
        text: `Join me in supporting blood donation initiatives. Every contribution helps save lives!`,
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      alert("Share this page to spread awareness about blood donation!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Celebration header */}
        <div className="bg-red-600 p-8 text-white text-center relative">
          <div className="absolute -top-6 -right-6 bg-white text-red-600 rounded-full w-12 h-12 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
            </svg>
          </div>
          <h1 className="text-3xl font-bold mb-2">Thank You{donorName ? `, ${donorName}` : ''}!</h1>
          <p className="opacity-90">You're now part of our lifesaving community</p>
        </div>

        <div className="p-6">
          {/* Impact visualization */}
          <div className="bg-red-50 rounded-lg p-4 mb-6 text-center">
            <p className="text-lg font-medium text-red-700 mb-2">
              <span className="text-2xl font-bold">
                {calculateLivesImpacted(donationAmount)}
              </span> lives could be impacted
            </p>
            <p className="text-sm text-gray-600">
              Your donation of ₹{donationAmount} helps us continue our mission
            </p>
          </div>

          {/* Next steps */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              Here's what you can do next:
            </h2>
            
            <div className="space-y-3">
              {/* Share option */}
              <button
                onClick={handleShare}
                className="w-full flex items-center justify-center space-x-2 bg-white border border-red-200 text-red-600 hover:bg-red-50 py-3 px-4 rounded-lg transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/>
                </svg>
                <span>Share your good deed</span>
              </button>
              
              {/* Donate blood option */}
              <button
                onClick={() => navigate("/find-donation-center")}
                className="w-full flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                </svg>
                <span>Find a blood donation center</span>
              </button>
              
              {/* Schedule reminder */}
              <button
                onClick={() => navigate("/schedule-reminder")}
                className="w-full flex items-center justify-center space-x-2 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 py-3 px-4 rounded-lg transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                <span>Remind me to donate blood in 3 months</span>
              </button>
            </div>
          </div>

          {/* Personalized thank you message */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-gray-700 mb-2">
              <span className="font-medium">A personal note from our team:</span>
            </p>
            <p className="text-gray-600 italic">
              "Your generosity helps us connect donors with those in need. 
              Because of you, someone's loved one will get a second chance at life."
            </p>
          </div>

          {/* Receipt information */}
          <div className="text-center text-sm text-gray-500">
            <p>Your donation receipt has been sent to your email</p>
            <p className="mt-1">
              Need help? <a href="/contact" className="text-red-600 hover:underline">Contact us</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;