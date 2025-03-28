import { useState, useEffect } from "react";

export default function DonationPopup({ onClose }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show the popup only if the user is visiting for the first time
    const hasVisited = localStorage.getItem("donationPopupShown");
    if (!hasVisited) {
      setIsVisible(true);
      localStorage.setItem("donationPopupShown", "true");
    }
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold text-center mb-3">Support Our Platform</h2>
        <p className="text-gray-600 text-sm text-center">
          A small ₹2 donation helps us maintain this platform and connect donors with those in need.
        </p>
        <div className="mt-4 flex justify-center gap-4">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            onClick={() => {
              onClose();
              // Navigate to the payment page
              window.location.href = "/donate"; // Change this to your payment page route
            }}
          >
            Donate ₹2
          </button>
          <button
            className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
            onClick={onClose}
          >
            Skip
          </button>
        </div>
      </div>
    </div>
  );
}
