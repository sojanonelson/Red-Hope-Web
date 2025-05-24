import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  User,
  CheckCircle,
  X,
  MoreVertical,
  Phone,
  Calendar,
  MapPin,
  AlertCircle,
  Info,
} from "lucide-react";
import {
  connectService,
  getAllServiceByDonorId,
  getAllServiceByRecipientId,
  updateDonationStatus,
} from "../services/bloodService";

const ServiceHistory = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { donor } = location.state || {};
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [user] = useState(storedUser || {});
  const [connectModel, setConnectModel] = useState(!!donor);
  const [previousServices, setPreviousServices] = useState([]);
  const [activeMenuId, setActiveMenuId] = useState(null); // Track which card's menu is open

  const [formData, setFormData] = useState({
    donorId: donor?._id || "",
    userId: user?._id || "",
    paymentStatus: donor?.price ? "Paid" : "No Need",
    selectedDate: "",
    location: "",
  });

  useEffect(() => {
    setConnectModel(!!donor);
    if (donor) {
      setFormData((prevData) => ({
        ...prevData,
        donorId: donor._id,
        paymentStatus: donor.price ? "Paid" : "No Need",
      }));
    }
  }, [donor]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const services =
          user.role === "donor"
            ? await getAllServiceByDonorId(user._id)
            : await getAllServiceByRecipientId(user._id);
        setPreviousServices(services);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    if (user?._id) {
      fetchServices();
    }
  }, [user?._id, user?.role]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleConnect = async () => {
    try {
      const connect = await connectService(formData);
      if (connect) {
        navigate("/service-history");
        window.location.reload();
      }
    } catch (err) {
      console.error("Failed to connect:", err);
    }
  };

  const handleThreeDotClick = (serviceId) => {
    setActiveMenuId(activeMenuId === serviceId ? null : serviceId);
  };

  const handleMarkAsCompleted = async (serviceId) => {
    try {
      const response = await updateDonationStatus({
        id: serviceId,
        status: "Done",
      });

      if (response) {
        // Update the local state to reflect the change
        setPreviousServices((prevServices) =>
          prevServices.map((service) =>
            service.id === serviceId
              ? { ...service, status: "Done", donorStatus: "Accepted" }
              : service
          )
        );
        setActiveMenuId(null); // Close the menu
      }
    } catch (error) {
      console.error("Error updating donation status:", error);
    }
  };

  console.log("data:", previousServices);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const getStatusInfo = (service) => {
    if (service.donorStatus === "Accepted" || service.status === "Completed") {
      return {
        borderColor: "border-green-500",
        statusBg: "bg-green-100",
        statusText: "text-green-800",
        icon: <CheckCircle className="w-5 h-5 text-green-500" />,
        message:
          "The donor has accepted your request and will contact you soon.",
      };
    } else if (service.donorStatus === "Declined") {
      return {
        borderColor: "border-red-500",
        statusBg: "bg-red-100",
        statusText: "text-red-800",
        icon: <X className="w-5 h-5 text-red-500" />,
        message:
          "The donor has declined your request. Please try contacting other donors.",
      };
    } else {
      return {
        borderColor: "border-yellow-500",
        statusBg: "bg-yellow-100",
        statusText: "text-yellow-800",
        icon: <AlertCircle className="w-5 h-5 text-yellow-500" />,
        message: "Waiting for donor to accept your request.",
      };
    }
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
                <strong>Donor Type:</strong> {donor.price ? "Paid" : "Free"}
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

      <div className="mt-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Service History
        </h2>
        <div className="bg-white p-4 rounded-lg shadow">
          {previousServices.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Info className="w-8 h-8 mx-auto mb-2" />
              <p>No service history available yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {previousServices.map((service) => {
                const statusInfo = getStatusInfo(service);

                return (
                  <div
                    key={service.id}
                    className={`p-4 border-2 ${statusInfo.borderColor} rounded-lg transition-all duration-300 hover:shadow-md relative`}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800">
                          {service.donorName.toUpperCase()}
                        </p>
                        <div className="flex items-center text-gray-600 mt-1">
                          <MapPin className="w-4 h-4 mr-1" />
                          <p className="text-sm">{service.location}</p>
                        </div>
                        <div className="flex items-center text-gray-600 mt-1">
                          <Calendar className="w-4 h-4 mr-1" />
                          <p className="text-sm">{formatDate(service.date)}</p>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          Donation: {service.donation}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span
                          className={`px-3 py-1 text-sm rounded-full flex items-center ${statusInfo.statusBg} ${statusInfo.statusText}`}
                        >
                          {statusInfo.icon}
                          <span className="ml-1">{service.status}</span>
                        </span>
                        <button
                          onClick={() => handleThreeDotClick(service.id)}
                          className="p-1 hover:bg-gray-200 rounded-full"
                        >
                          <MoreVertical className="w-5 h-5 text-gray-600" />
                        </button>
                      </div>
                    </div>

                    {/* Dropdown menu that appears when three dots are clicked */}
                    {activeMenuId === service.id &&
                      service.donorStatus  === "Accepted" && (
                        <div className="absolute right-4 top-16 bg-white shadow-lg rounded-md border border-gray-200 z-10">
                          {service.donation !== "Done" && (
                            <button
                              onClick={() => {
                                const today = new Date();
                                const donationDate = new Date(service.date); // Make sure service.date is a valid date string

                                if (donationDate > today) {
                                  const confirmEarly = window.confirm(
                                    "The donation date hasn't come yet. Are you sure you want to mark it as completed?"
                                  );
                                  if (!confirmEarly) return;
                                }

                                handleMarkAsCompleted(service._id);
                              }}
                              className="w-full text-left px-4 py-2 text-sm text-green-600 hover:bg-green-50 flex items-center gap-2"
                            >
                              <CheckCircle className="w-4 h-4" />
                              Mark as Completed
                            </button>
                          )}
                        </div>
                      )}

                    {/* Status information message */}
                    <div
                      className={`mt-3 p-3 rounded-md flex items-center ${statusInfo.statusBg} ${statusInfo.statusText} bg-opacity-50`}
                    >
                      <Info className="w-4 h-4 mr-2 flex-shrink-0" />
                      <p className="text-sm">{statusInfo.message}</p>
                    </div>

                    {service.details && (
                      <p className="text-sm text-gray-600 mt-3 border-t pt-2">
                        {service.details}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceHistory;
