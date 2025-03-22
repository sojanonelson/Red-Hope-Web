import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_API; 

// User Registration
export const getAllServiceByDonorId= async (donorId) => {
    try {
        console.log("Donor ID", donorId)
        const response = await axios.get(`${API_URL}/service/donor/${donorId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Get service by ID failed" };
    }
};

export const getAllServiceByRecipientId= async (recipientId) => {
    try {
        console.log("Recipient ID", recipientId)
        const response = await axios.get(`${API_URL}/service/recipient/${recipientId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Get service by ID failed" };
    }
};

export const connectService= async (serviceData) => {
    try {
        console.log("Service", serviceData)
        const response = await axios.post(`${API_URL}/service/connect`, serviceData);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Serivce Connect failed" };
    }
};




