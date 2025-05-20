import React, { useEffect, useState } from "react";
import { getAllServiceByDonorId, updateBloodRequest } from "../services/bloodService";
import {  MapPin, Phone, Calendar, XCircle, Activity, UserCheck, Clock, CheckCircle, X, Heart, Bell, Info } from 'lucide-react';

const DonorServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const storedUser = JSON.parse(localStorage.getItem('user'));
  const [donorUser] = useState(storedUser || {});

  useEffect(() => {
    fetchServices();
  }, [donorUser]);

  const fetchServices = async () => {
    if (donorUser.role === "donor") {
      try {
        const response = await getAllServiceByDonorId(donorUser._id);
        setServices(response);
        if (response.message) {
          setError(response.message);
        }
      } catch (err) {
        setError("Error fetching services");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleStatusUpdate = async (serviceId, newStatus) => {
    try {
      const response = await updateBloodRequest(serviceId, { donorStatus: newStatus, donorId: donorUser._id });
      if (response.message === "Blood request updated successfully") {
        setServices((prevServices) =>
          prevServices.map((service) =>
            service._id === serviceId ? { ...service, donorStatus: newStatus } : service
          )
        );
      }
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Accepted": return "bg-green-100 text-green-800";
      case "Pending": return "bg-yellow-100 text-yellow-800";
      case "Declined": return "bg-red-100 text-red-800";
      default: return "bg-blue-100 text-blue-800";
    }
  };

  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
    </div>
  );

  if (error) return (
       <div className="min-h-screen bg-gray-50 p-4">
     
      <div className="bg-white rounded-lg shadow-md p-4 mb-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
              <Heart className="h-6 w-6 text-red-500" />
            </div>
            <div className="ml-3">
              <h1 className="text-xl font-bold">Welcome, {donorUser.name}</h1>
              <p className="text-gray-500 text-sm">Blood Type: {donorUser.bloodGroup}</p>
            </div>
          </div>
          <Bell className="h-6 w-6 text-gray-400" />
        </div>
      </div>
 
      <div className="bg-white rounded-lg shadow-md p-6 mb-4">
        <div className="flex items-center text-red-600 mb-4">
          <Info className="w-6 h-6 mr-3" />
          <h3 className="text-lg font-semibold">No Active Blood Requests</h3>
        </div>
        <p className="text-gray-600 mb-6">
          There are currently no blood requests matching your blood type. We'll notify you when your donation is needed.
        </p>
      
      </div>
      
     
      
     
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <Activity className="w-6 h-6 mr-3 text-red-600" /> 
              <span>Your Blood Donation History</span>
            </h2>
            <div className="px-4 py-2 bg-red-600 text-white rounded-full text-sm font-medium">
              Total Donations: {services.length}
            </div>
          </div>
        </div>
        
        {services.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {services.map((service) => (
              <div key={service._id} className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg border border-gray-100">
                <div className="bg-red-600 px-6 py-4 text-white">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-lg truncate">
                      Donation #{service._id.substring(service._id.length - 6)}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(service.donation)}`}>
                      {service.donation}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <UserCheck className="w-5 h-5 mr-3 text-gray-600 mt-1" />
                      <div>
                        <p className="text-sm text-gray-500">Recipient</p>
                        <p className="font-medium text-gray-800">{service.recipientName}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <MapPin className="w-5 h-5 mr-3 text-gray-600 mt-1" />
                      <div>
                        <p className="text-sm text-gray-500">Location</p>
                        <p className="font-medium text-gray-800">{service.location}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Phone className="w-5 h-5 mr-3 text-gray-600 mt-1" />
                      <div>
                        <p className="text-sm text-gray-500">Contact Number</p>
                        <p className="font-medium text-gray-800">{service.donorNumber}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Calendar className="w-5 h-5 mr-3 text-gray-600 mt-1" />
                      <div>
                        <p className="text-sm text-gray-500">Donation Date</p>
                        <p className="font-medium text-gray-800">{formatDate(service.date)}</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Clock className="w-5 h-5 mr-3 text-gray-600 mt-1" />
                      <div>
                        <p className="text-sm text-gray-500">Donor Status</p>
                        <p className={`font-medium ${getStatusColor(service.donorStatus)}`}>
                          {service.donorStatus}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {service.donorStatus === 'Declined' || service.donorStatus === 'Accepted' ? (null):( <div className="p-4 bg-gray-100 flex justify-between">
                  <button 
                    onClick={() => handleStatusUpdate(service._id, "Accepted")}
                    className="px-4 py-2 bg-green-600 text-white rounded-md font-medium flex items-center hover:bg-green-700 transition"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" /> Accept
                  </button>

                  <button 
                    onClick={() => handleStatusUpdate(service._id, "Declined")}
                    className="px-4 py-2 bg-red-600 text-white rounded-md font-medium flex items-center hover:bg-red-700 transition"
                  >
                    <X className="w-4 h-4 mr-2" /> Decline
                  </button>
                </div>)}
               


              </div>
            ))}
          </div>
        ) : (
          <div>No Donations Yet</div>
        )}
      </div>
    </div>
  );
};

export default DonorServices;
