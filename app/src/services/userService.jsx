import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

export const userService = {
    registerUser: async (userData) => {
        try {
            const response = await axios.post(`${BASE_URL}/user`, userData);
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : new Error('Registration failed');
        }
    },

    getUserProfile: async (email) => {
        try {
            const response = await axios.get(`${BASE_URL}/getuser`, { params: { email } });
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : new Error('Failed to fetch user');
        }
    },

    deleteUser: async (email) => {
        try {
            const response = await axios.delete(`${BASE_URL}/user`, { data: { email } });
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : new Error('Deletion failed');
        }
    }
};