import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

export const workoutService = {
    createWorkout: async (workoutData) => {
        try {
            const response = await axios.post(`${BASE_URL}/workout`, workoutData);
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : new Error('Workout creation failed');
        }
    },

    getAllWorkouts: async (userId) => {
        try {
            const response = await axios.get(`${BASE_URL}/workout`, { params: { user_id: userId } });
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : new Error('Failed to fetch workouts');
        }
    },

    getWorkout: async (userId, workoutId) => {
        try {
            const response = await axios.get(`${BASE_URL}/getworkout`, {
                params: { user_id: userId, workout_id: workoutId }
            });
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : new Error('Failed to fetch workout');
        }
    },

    updateWorkout: async (workoutId, updateData) => {
        try {
            const response = await axios.patch(`${BASE_URL}/workout/${workoutId}`, updateData);
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : new Error('Workout update failed');
        }
    },

    deleteWorkout: async (workoutId) => {
        try {
            const response = await axios.delete(`${BASE_URL}/workout/${workoutId}`);
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : new Error('Workout deletion failed');
        }
    }
};
