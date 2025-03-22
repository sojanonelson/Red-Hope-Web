import React, { useEffect, useState } from "react";
import { getAllServiceByDonorId } from "../services/bloodService";
import { User, MapPin, Phone, Calendar, XCircle, Activity, UserCheck, Clock, Badge } from 'lucide-react';

const DonorServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const storedUser = JSON.parse(localStorage.getItem('user'));
  const [donorUser, setUser] = useState(storedUser || {});

  useEffect(() => {
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

    fetchServices();
  }, [donorUser]);

  // Helper function to get status color
  const getStatusColor = (status) => {
    switch(status) {
      case "completed": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-blue-100 text-blue-800";
    }
  };

  // Helper function to format date
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
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 shadow-lg max-w-md">
        <div className="flex items-center text-red-600 mb-4">
          <XCircle className="w-8 h-8 mr-3" />
          <h3 className="text-lg font-semibold">Error Loading Data</h3>
        </div>
        <p className="text-red-700">{error}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
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
        
        {/* Services List */}
        {services.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {services.map((service) => (
              <div key={service._id} className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg border border-gray-100">
                {/* Card Header */}
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
                
                {/* Card Body */}
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
                  </div>
                </div>
                
                {/* Card Footer */}
                
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="flex flex-col items-center justify-center">
              <Badge className="w-16 h-16 text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No Donations Yet</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">You haven't made any blood donations yet. Start your journey of saving lives today.</p>
              <button className="px-6 py-3 bg-red-600 text-white rounded-md font-medium hover:bg-red-700 transition-colors">
                Schedule Your First Donation
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DonorServices;