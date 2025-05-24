import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_API; 

// User Registration
export const getUser = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/user/${userId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "User not found" };
    }
};

export const updateUserData= async (userId,userdata) => {
    try {
        const response = await axios.put(`${API_URL}/user/${userId}`,userdata);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "User not found" };
    }
};

export const getAllDonor = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/user/account/donor`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Accounts not found" };
    }
};


