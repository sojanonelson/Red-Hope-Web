import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { User, CheckCircle, X, MoreVertical } from 'lucide-react';
import { connectService, getAllServiceByDonorId, getAllServiceByRecipientId } from '../services/bloodService';

const ServiceHistory = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { donor } = location.state || {}; // Get donor details
  const [connectModel, setConnectModel] = useState(false);
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(storedUser || {}); // Initialize user state with storedUser

  // Mock service history data
  const [previousServices, setPreviousServices] = useState([]);

  // Function to format date from "2025-03-21T17:58:02.796Z" to "DD-MM-YYYY"
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Set connectModel to true if donor is available
  useEffect(() => {
    if (donor) {
      setConnectModel(true);
    } else {
      setConnectModel(false);
    }
  }, [donor]);

  // Initialize formData with donor details (if available)
  const [formData, setFormData] = useState({
    donorId: donor?._id || '',
    userId: user?._id || '',
    paymentStatus: donor?.price ? 'Paid' : 'No Need',
    selectedDate: '',
    location: '',
  });

  // Update formData when donor changes
  useEffect(() => {
    if (donor) {
      setFormData((prevData) => ({
        ...prevData,
        donorId: donor._id,
        paymentStatus: donor.price ? 'Paid' : 'No Need',
      }));
    }
  }, [donor]);

  // Fetch services based on user role
  useEffect(() => {
    const fetchServices = async () => {
      try {
        if (user.role === 'donor') {
          const donorService = await getAllServiceByDonorId(user._id);
          setPreviousServices(donorService);
        } else {
          const recipientService = await getAllServiceByRecipientId(user._id);
          setPreviousServices(recipientService);
        }
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    if (user?._id) {
      fetchServices();
    }
  }, [user?._id, user?.role]); // Dependencies

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleConnect = async () => {
    try {
      const connect = await connectService(formData);
      console.log('Connect Res:', connect);
      if (connect) {
        navigate('/service-history');
      }
    } catch (err) {
      console.error('Failed to connect:', err);
    }
  };

  // Handle three-dot button click
  const handleThreeDotClick = (serviceId) => {
    console.log('Three-dot button clicked for service:', serviceId);
    // Add your logic here (e.g., open a dropdown menu, navigate to details, etc.)
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 relative">
      {connectModel && donor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
            <h2 className="text-xl font-bold text-red-600 mb-4 flex items-center justify-center gap-2">
              <User className="w-6 h-6" /> Donor Details
            </h2>
            <div className="space-y-2 text-left">
              <p>
                <strong>Name:</strong> {donor.name}
              </p>
              <p>
                <strong>Blood Type:</strong> {donor.bloodGroup}
              </p>
              <p>
                <strong>Phone:</strong> {donor.phoneNumber}
              </p>
              <p>
                <strong>Location:</strong> {donor.city}, {donor.state}
              </p>
              <p>
                <strong>Donor Type:</strong> {donor.price ? `Paid` : 'Free'}
              </p>
              {donor?.price && (
                <p>
                  <strong>Payment Amount:</strong> ₹{donor.price}
                </p>
              )}
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select a date for the donation:
              </label>
              <input
                type="date"
                name="selectedDate"
                value={formData.selectedDate}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Enter the location where you need the donor to come:
              </label>
              <input
                type="text"
                name="location"
                placeholder="e.g., City Hospital, New York"
                value={formData.location}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div className="mt-6 flex justify-between gap-4">
              <button
                onClick={() => navigate(-1)}
                className="flex-1 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center gap-2"
              >
                <X className="w-4 h-4" /> Go Back
              </button>
              <button
                onClick={handleConnect}
                className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-4 h-4" /> Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Service History Section */}
      <div className="mt-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Service History</h2>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="space-y-3">
            {previousServices.map((service) => (
              <div key={service.id} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{service.donorName}</p>
                    <p className="text-sm text-gray-600">Place: {service.location}</p>
                    <p className="text-sm text-gray-600">Date: {formatDate(service.date)}</p>
                    <p className="text-sm text-gray-600">Payment: {service.paymentStatus}</p>
                    <p className="text-sm text-gray-600">Donation: {service.donation}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-1 text-sm rounded-full ${
                        service.status === 'Completed'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {service.status}
                    </span>
                    <button
                      onClick={() => handleThreeDotClick(service.id)}
                      className="p-1 hover:bg-gray-200 rounded-full"
                    >
                      <MoreVertical className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-2">{service.details}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceHistory;