import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home";
import SearchDonor from "./pages/SearchDonor";
import BloodGroupSearch from "./pages/BloodGroupSearch";
import LocationSearch from "./pages/LocationSearch";
import Navbar from "./components/Navbar";
import { LoginScreen } from "./pages/Login";
import { RegisterScreen } from "./pages/Register";
import PaymentScreen from "./pages/TestPayment";
import ServiceHistory from "./pages/serviceHistory";
import DonateBlood from "./pages/DonateBlood";

// Notification service
const NotificationService = {
  permission: 'default',
  
  // Initialize notification service
  init() {
    if (!("Notification" in window)) {
      console.log("This browser does not support notifications");
      return false;
    }
    
    this.permission = Notification.permission;
    return true;
  },
  
  // Request permission
  requestPermission() {
    return Notification.requestPermission().then(permission => {
      this.permission = permission;
      return permission;
    });
  },
  
  // Send notification
  sendNotification(title, options = {}) {
    if (this.permission !== "granted") {
      this.requestPermission().then(permission => {
        if (permission === "granted") {
          new Notification(title, options);
        }
      });
      return;
    }
    
    return new Notification(title, options);
  }
};

// Hook to manage notifications
function useNotifications() {
  useEffect(() => {
    // Initialize notification service
    const supported = NotificationService.init();
    if (!supported) return;
    
    // Show notification after 3 seconds
    const timer = setTimeout(() => {
      const notification = NotificationService.sendNotification(
        "New Blood Donor Available!", 
        {
          body: "A donor with a matching blood type is now available in your area.",
          icon: "/notification-icon.png", // Replace with your actual icon path
          badge: "/badge-icon.png",      // Replace with your actual badge path
          tag: "new-donor"
        }
      );
      
      if (notification) {
        notification.onclick = function() {
          window.focus();
          this.close();
          // You can add navigation logic here if needed
        };
      }
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return {
    requestPermission: NotificationService.requestPermission
  };
}

function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const hideNavbarRoutes = ["/login", "/register"];
  const { requestPermission } = useNotifications();
  
  // Optional: Show permission request banner if needed
  useEffect(() => {
    if (Notification.permission === "default" && !hideNavbarRoutes.includes(location.pathname)) {
      // You could show a permission banner here
    }
  }, [location.pathname]);
  
  return (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      
      {/* Optional notification permission banner */}
      {Notification.permission !== "granted" && !hideNavbarRoutes.includes(location.pathname) && (
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 fixed top-16 right-4 max-w-xs z-50 shadow-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                Get notified about available donors. 
                <button onClick={requestPermission} className="ml-2 font-medium text-blue-700 underline">
                  Enable notifications
                </button>
              </p>
            </div>
          </div>
        </div>
      )}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/test" element={<PaymentScreen />} />
        <Route path="/service-history" element={<ServiceHistory />} />

        
        <Route path="/LookingBlood" element={<SearchDonor />} />
        <Route path="/DOnateBlood" element={<DonateBlood />} />
        <Route path="/search-blood-group" element={<BloodGroupSearch />} />
        <Route path="/search-location" element={<LocationSearch />} />
      </Routes>
    </>
  );
}

export default function AppNavigator() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}