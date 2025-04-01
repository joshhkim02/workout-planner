import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api';

export const exerciseService = {
    createExercise: async (exerciseData) => {
        try {
            const response = await axios.post(`${BASE_URL}/exercise`, exerciseData);
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : new Error('Exercise creation failed');
        }
    },

    getAllExercises: async (workoutId) => {
        try {
            const response = await axios.get(`${BASE_URL}/exercise`, { params: { workout_id: workoutId } });
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : new Error('Failed to fetch exercises');
        }
    },

    updateExercise: async (exerciseId, updateData) => {
        try {
            const response = await axios.patch(`${BASE_URL}/exercise/${exerciseId}`, updateData);
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : new Error('Exercise update failed');
        }
    },

    deleteExercise: async (exerciseId) => {
        try {
            const response = await axios.delete(`${BASE_URL}/exercise/${exerciseId}`);
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : new Error('Exercise deletion failed');
        }
    }
};
