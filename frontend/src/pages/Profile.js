import React, { useEffect, useState } from 'react';
import { User, Phone, CreditCard, MapPin, Globe, Droplets, DollarSign, Activity, Edit3, Save, X, Shield, Mail } from 'lucide-react';
import { getUser, updateUserData } from '../services/userService'; // Import the update function

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [initialForm, setInitialForm] = useState({});
  const userData = localStorage.getItem('user')
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userInfo = JSON.parse(userData);
    console.log("userId:", userInfo._id);
        const user = await getUser(userInfo._id);
        setForm(user);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEditToggle = () => setIsEditing(!isEditing);

 const handleSubmit = async () => {
  setIsLoading(true);
  setError(null);
  
  // Find changed fields
  const changedFields = {};
  Object.keys(form).forEach(key => {
    if (form[key] !== initialForm[key]) {
      changedFields[key] = form[key];
    }
  });
  
  console.log('Changed fields:', changedFields);
  console.log('Full edited data:', form);
  
  try {
     const user = JSON.parse(userData);
    console.log("userId:", user.id);
    const updatedUser = await updateUserData(user._id, form);
    console.log('API response:', updatedUser);
    setForm(updatedUser.user);
    setInitialForm(updatedUser.user); // Update initial data
    setIsEditing(false);
  } catch (error) {
    console.error('Update error:', error);
    setError(error.message || 'Failed to update user');
  } finally {
    setIsLoading(false);
  }
};

  const getInitial = (name) => name?.[0]?.toUpperCase() || '?';

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'bg-emerald-500';
      case 'busy': return 'bg-amber-500';
      case 'unavailable': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const fieldGroups = [
    {
      title: 'Contact Information',
      icon: Phone,
      fields: [
        { label: 'Phone Number', name: 'phoneNumber', icon: Phone },
        { label: 'Email', name: 'email', icon: Mail },
      ]
    },
    {
      title: 'Location Details',
      icon: MapPin,
      fields: [
        { label: 'City', name: 'city', icon: MapPin },
        { label: 'State', name: 'state', icon: Globe },
        { label: 'Pincode', name: 'pincode', icon: MapPin },
      ]
    },
    {
      title: 'Identity & Payment',
      icon: Shield,
      fields: [
        { label: 'Aadhar Number', name: 'aadharNumber', icon: Shield },
        { label: 'UPI ID', name: 'upi', icon: CreditCard },
      ]
    },
    {
      title: 'Blood Donation Info',
      icon: Droplets,
      fields: [
        { label: 'Blood Group', name: 'bloodGroup', icon: Droplets },
        { label: 'Role', name: 'role', icon: User },
        
        { label: 'Status', name: 'status', icon: Activity },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-rose-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-pink-600 to-rose-600 opacity-10"></div>
          <div className="relative p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              {/* Avatar */}
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-red-500 to-pink-600 text-white flex items-center justify-center text-5xl font-bold shadow-2xl ring-4 ring-white">
                  {getInitial(form.name)}
                </div>
                <div className={`absolute -bottom-2 -right-2 w-8 h-8 ${getStatusColor(form.status)} rounded-full border-4 border-white shadow-lg`}></div>
              </div>

              {/* User Info */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
                  {form.name}
                </h1>
                <p className="text-xl text-gray-600 mb-4">{form.email}</p>
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  <span className="px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-semibold">
                    {form.bloodGroup} Donor
                  </span>
                  <span className={`px-4 py-2 text-white rounded-full text-sm font-semibold capitalize ${getStatusColor(form.status)}`}>
                    {form.status}
                  </span>
                
                </div>
              </div>

              {/* Edit Button */}
              <button
                onClick={handleEditToggle}
                className="group relative bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  {isEditing ? <X size={20} /> : <Edit3 size={20} />}
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {fieldGroups.map((group) => (
              <div key={group.title} className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl text-white">
                    <group.icon size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">{group.title}</h3>
                </div>
                
                <div className="grid gap-6">
                  {group.fields.map((field) => (
                    <div key={field.name} className="group">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <field.icon size={16} className="text-gray-500" />
                        {field.label}
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name={field.name}
                          value={form[field.name] || ''}
                          onChange={handleChange}
                          disabled={!isEditing}
                          className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 ${
                            isEditing 
                              ? 'border-gray-200 focus:border-red-500 focus:ring-4 focus:ring-red-100 bg-white' 
                              : 'border-transparent bg-gray-50 text-gray-700'
                          } focus:outline-none text-lg`}
                        />
                        {isEditing && (
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Save Button */}
          {isEditing && (
    <div className="flex flex-col items-center gap-2">
      {error && (
        <div className="text-red-500 text-sm mb-2">
          {error}
        </div>
      )}
      <button
        type="button"
        onClick={handleSubmit}
        disabled={isLoading}
        className={`group bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-12 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ${
          isLoading ? 'opacity-75 cursor-not-allowed' : ''
        }`}
      >
        <div className="flex items-center gap-3">
          {isLoading ? (
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <Save size={24} />
          )}
          {isLoading ? 'Saving...' : 'Save Changes'}
        </div>
      </button>
    </div>
  )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;