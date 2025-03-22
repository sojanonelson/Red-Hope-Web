import React, { useState } from 'react';
import { registerDonor } from '../services/authService';

const DonorRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    bloodGroup: '',
    state: '',
    city: '',
    status: 'available', // Default status
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await registerDonor(formData);
      setSuccess('Registration successful!');
      setFormData({
        name: '',
        email: '',
        password: '',
        bloodGroup: '',
        state: '',
        city: '',
        status: 'available',
      });
    } catch (err) {
      setError(err.msg || 'Registration failed');
    }
  };

  return (
    <div className="container">
      <h2>Donor Registration</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <input type="text" name="bloodGroup" placeholder="Blood Group" value={formData.bloodGroup} onChange={handleChange} required />
        <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} required />
        <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
        
        <label>Status:</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="available">Available</option>
          <option value="not available">Not Available</option>
          <option value="looking for blood">Looking for Blood</option>
        </select>

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default DonorRegister;
