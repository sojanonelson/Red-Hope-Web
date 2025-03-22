import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_API; 

// User Registration
export const registerRecipient= async (userData) => {
    try {
        console.log("Reg recipient:", userData)
        const response = await axios.post(`${API_URL}/auth/register/recipient`, userData);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Registration failed" };
    }
};

export const registerDonor = async (userData) => {
    try {console.log("Reg Donor:", userData)
        const response = await axios.post(`${API_URL}/auth/register/donor`, userData);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Registration failed" };
    }
};

// User Login
export const loginUser = async (loginData) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, loginData);
        console.log("Login",loginData)
        const { token, user } = response.data;

        // Store token in local storage
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        return { token, user };
    } catch (error) {
        throw error.response?.data || { message: "Login failed" };
    }
};

// Logout
export const logoutUser = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};
