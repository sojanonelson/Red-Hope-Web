import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { registerDonor, registerRecipient } from '../services/authService';

export const RegisterScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userType = location.state?.userType || 'default';
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    bloodType: '',
    phone: '',
    city: '',
    state: '',
    pincode: '',
    upiId: '',
    adharNumber: '',
    role: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }
    
    try {
      if (formData.role === 'donor') {
        const response = await registerDonor(formData);
        if(response) {
          navigate('/login');
        }
      } else if (formData.role === 'recipient') {
        const response = await registerRecipient(formData);
        if(response) {
          navigate('/login');
        }
      } else {
        setError('Please select a role');
      }
    } catch (error) {
      setError(error.message || 'Registration failed. Please try again.');
      console.error('Registration Failed:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    if (userType === 'donor' || userType === 'recipient') {
      setFormData((prev) => ({ ...prev, role: userType }));
    }
  }, [userType]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-6 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-2xl font-extrabold text-gray-900">
          <span className="text-red-600">Red</span> Hope
        </h2>
        <h3 className="mt-1 text-center text-xl font-bold text-gray-900">Create your account</h3>
      </div>
      
      <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-6 px-4 shadow sm:rounded-lg sm:px-6">
          {!formData.role ? (
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-3 text-center">Select your role:</h3>
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => setFormData({...formData, role: 'donor'})}
                  className="p-4 border-2 border-red-200 rounded-lg hover:bg-red-50 flex flex-col items-center transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-2">
                    <span className="text-red-600 text-lg">D</span>
                  </div>
                  <span className="font-medium text-sm">I want to donate</span>
                </button>
                
                <button 
                  onClick={() => setFormData({...formData, role: 'recipient'})}
                  className="p-4 border-2 border-red-200 rounded-lg hover:bg-red-50 flex flex-col items-center transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-2">
                    <span className="text-red-600 text-lg">R</span>
                  </div>
                  <span className="font-medium text-sm">I need blood</span>
                </button>
              </div>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-base font-medium">
                  {formData.role === 'donor' ? 'Donor Registration' : 'Recipient Registration'}
                </h3>
                <button 
                  type="button"
                  onClick={() => setFormData({...formData, role: ''})}
                  className="text-xs text-red-600 hover:text-red-800"
                >
                  Change role
                </button>
              </div>
              
              {error && <div className="bg-red-50 border border-red-200 text-red-600 px-3 py-2 rounded text-sm">{error}</div>}
              
              <div className="space-y-4">
                {/* Personal Information */}
                <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                  <h4 className="text-xs font-medium text-gray-700 mb-2">Personal Information</h4>
                  
                  <div className="mb-2">
                    <label htmlFor="name" className="block text-xs font-medium text-gray-700 mb-1">Full Name</label>
                    <input 
                      id="name"
                      name="name" 
                      type="text"
                      value={formData.name} 
                      onChange={handleChange} 
                      required 
                      className="w-full p-2 text-sm border rounded-md focus:ring-red-500 focus:border-red-500" 
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <div>
                      <label htmlFor="email" className="block text-xs font-medium text-gray-700 mb-1">Email</label>
                      <input 
                        id="email"
                        name="email" 
                        type="email"
                        value={formData.email} 
                        onChange={handleChange} 
                        required 
                        className="w-full p-2 text-sm border rounded-md focus:ring-red-500 focus:border-red-500" 
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-xs font-medium text-gray-700 mb-1">Phone</label>
                      <input 
                        id="phone"
                        name="phone" 
                        type="tel"
                        value={formData.phone} 
                        onChange={handleChange} 
                        required 
                        className="w-full p-2 text-sm border rounded-md focus:ring-red-500 focus:border-red-500" 
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="adharNumber" className="block text-xs font-medium text-gray-700 mb-1">Aadhar Number</label>
                    <input 
                      id="adharNumber"
                      name="adharNumber" 
                      type="number"
                      value={formData.adharNumber} 
                      onChange={handleChange} 
                      required 
                      className="w-full p-2 text-sm border rounded-md focus:ring-red-500 focus:border-red-500" 
                    />
                  </div>
                </div>
                
                {/* Security & Location (Combined) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Password Section */}
                  <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                    <h4 className="text-xs font-medium text-gray-700 mb-2">Security</h4>
                    
                    <div className="mb-2">
                      <label htmlFor="password" className="block text-xs font-medium text-gray-700 mb-1">Password</label>
                      <input 
                        id="password"
                        name="password" 
                        type="password"
                        value={formData.password} 
                        onChange={handleChange} 
                        required 
                        className="w-full p-2 text-sm border rounded-md focus:ring-red-500 focus:border-red-500" 
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="confirmPassword" className="block text-xs font-medium text-gray-700 mb-1">Confirm Password</label>
                      <input 
                        id="confirmPassword"
                        name="confirmPassword" 
                        type="password"
                        value={formData.confirmPassword} 
                        onChange={handleChange} 
                        required 
                        className="w-full p-2 text-sm border rounded-md focus:ring-red-500 focus:border-red-500" 
                      />
                    </div>
                  </div>
                  
                  {/* Location Section */}
                  <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                    <h4 className="text-xs font-medium text-gray-700 mb-2">Location</h4>
                    
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      <div>
                        <label htmlFor="city" className="block text-xs font-medium text-gray-700 mb-1">City</label>
                        <input 
                          id="city"
                          name="city" 
                          type="text"
                          value={formData.city} 
                          onChange={handleChange} 
                          required 
                          className="w-full p-2 text-sm border rounded-md focus:ring-red-500 focus:border-red-500" 
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="state" className="block text-xs font-medium text-gray-700 mb-1">State</label>
                        <input 
                          id="state"
                          name="state" 
                          type="text"
                          value={formData.state} 
                          onChange={handleChange} 
                          required 
                          className="w-full p-2 text-sm border rounded-md focus:ring-red-500 focus:border-red-500" 
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="pincode" className="block text-xs font-medium text-gray-700 mb-1">Pincode</label>
                      <input 
                        id="pincode"
                        name="pincode" 
                        type="text"
                        value={formData.pincode} 
                        onChange={handleChange} 
                        required 
                        className="w-full p-2 text-sm border rounded-md focus:ring-red-500 focus:border-red-500" 
                      />
                    </div>
                  </div>
                </div>
                
                {/* Donor-specific Information */}
                {formData.role === 'donor' && (
                  <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                    <h4 className="text-xs font-medium text-gray-700 mb-2">Donor Information</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label htmlFor="bloodType" className="block text-xs font-medium text-gray-700 mb-1">Blood Type</label>
                        <select 
                          id="bloodType"
                          name="bloodType" 
                          value={formData.bloodType} 
                          onChange={handleChange} 
                          required 
                          className="w-full p-2 text-sm border rounded-md focus:ring-red-500 focus:border-red-500"
                        >
                          <option value="">Select Type</option>
                          <option value="A+">A+</option>
                          <option value="A-">A-</option>
                          <option value="B+">B+</option>
                          <option value="B-">B-</option>
                          <option value="AB+">AB+</option>
                          <option value="AB-">AB-</option>
                          <option value="O+">O+</option>
                          <option value="O-">O-</option>
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="upiId" className="block text-xs font-medium text-gray-700 mb-1">UPI ID</label>
                        <input 
                          id="upiId"
                          name="upiId" 
                          type="text"
                          value={formData.upiId} 
                          onChange={handleChange} 
                          required 
                          className="w-full p-2 text-sm border rounded-md focus:ring-red-500 focus:border-red-500" 
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center mt-3">
                <input id="terms" name="terms" type="checkbox" required className="h-4 w-4 text-red-600 focus:ring-red-500" />
                <label htmlFor="terms" className="ml-2 text-xs text-gray-700">
                  I agree to the <Link to="/terms" className="text-red-600 hover:text-red-800">Terms and Conditions</Link>
                </label>
              </div>

              <button 
                type="submit" 
                className="w-full p-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 flex justify-center items-center"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating account...
                  </div>
                ) : (
                  "Create account"
                )}
              </button>
            </form>
          )}

          <div className="mt-4 text-center">
            <p className="text-xs text-gray-600">
              Already have an account? <Link to="/login" className="text-red-600 hover:text-red-800">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;