import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Phone, HeartHandshake, IndianRupee } from 'lucide-react';
import { getAllDonor } from '../services/userService';






const BloodDonorList = () => {
  const navigate = useNavigate();
  const [donors, setDonors] = useState([]);
  const [filters, setFilters] = useState({
    bloodType: '',
    city: '',
    type: '',
  });

  const handleConnect = (donor) => {
    navigate('/service-history', { state: { donor } });
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };
 

  const filteredDonors = donors.filter((donor) => {
    return (
      (filters.bloodType === '' || donor.bloodType === filters.bloodType) &&
      (filters.city === '' || donor.city.toLowerCase().includes(filters.city.toLowerCase())) &&
      (filters.type === '' || donor.type === filters.type)
    );
  });


  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const data = await getAllDonor();
        setDonors(data);
      } catch (error) {
        console.error('Error fetching donors:', error);
      }
    };
    fetchDonors();
  }, []);


  console.log("DATA:", donors)

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center text-red-600 mb-6 flex items-center justify-center gap-2">
          <HeartHandshake className="w-8 h-8" /> Find a Blood Donor
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="relative">
            <select
              name="bloodType"
              value={filters.bloodType}
              onChange={handleFilterChange}
              className="w-full p-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">Select Blood Type</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
            <Filter className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
          </div>

          <div className="relative">
            <input
              type="text"
              name="city"
              placeholder="Search by City"
              value={filters.city}
              onChange={handleFilterChange}
              className="w-full p-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
          </div>

          <div className="relative">
            <select
              name="type"
              value={filters.type}
              onChange={handleFilterChange}
              className="w-full p-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">Select Donor Type</option>
              <option value="free">Free</option>
              <option value="paid">Paid</option>
            </select>
            <IndianRupee className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
          </div>
        </div>

        <div className="space-y-4">
          {filteredDonors.map((donor) => (
            <div
              key={donor.id}
              className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold">
                    {donor.name} ({donor.bloodGroup})
                  </h2>
                  <p className="text-gray-600">
                    {donor.city}, {donor.state}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      donor.type === 'paid'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {donor.price  ? `₹${donor.price}` : 'Free'}
                  </span>
                  <button
                    onClick={() => handleConnect(donor)}
                    className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                  >
                    <Phone className="w-4 h-4" /> Select
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BloodDonorList;