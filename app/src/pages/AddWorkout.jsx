import React, { useState } from 'react';
import {
    Container,
    Typography,
    TextField,
    Button,
    Paper,
    Box,
    Snackbar,
    Alert
} from '@mui/material';
import { fetchWithAuth } from '../services/authUtils';
import { useNavigate } from 'react-router-dom';

export default function AddWorkout() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        workoutName: '',
        workoutDescription: '',
        duration: '',
    });
    const [errors, setErrors] = useState({});
    const [apiError, setApiError] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        // Clear error when typing
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }
    };

    // Validate form fields
    const validateForm = () => {
        const newErrors = {};

        if (!formData.workoutName.trim()) {
            newErrors.workoutName = 'Workout name is required';
        }

        if (!formData.workoutDescription.trim()) {
            newErrors.workoutDescription = 'Description is required';
        }

        if (!formData.duration.trim()) {
            newErrors.duration = 'Workout duration is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setApiError('');

        if (validateForm()) {
            try {
                const userData = JSON.parse(localStorage.getItem('user'));

                if (!userData || !userData.id) {
                    console.log("User not authenticated. Please log in again.");
                    return;
                }

                const workoutData = {
                    user_id: userData.id,
                    name: formData.workoutName,
                    description: formData.workoutDescription,
                    duration: formData.duration
                };

                const response = await fetchWithAuth('http://localhost:3000/api/workout', {
                    method: 'POST',
                    body: JSON.stringify(workoutData)
                });

                const data = await response.json();

                if (response.ok) {
                    console.log("Workout created successfully:", data);
                    setIsSubmitted(true);

                    setFormData({
                        workoutName: '',
                        workoutDescription: '',
                        duration: '',
                    });
                    navigate('/home');
                } else {
                    console.log("Error creating workout: ", data);
                    setApiError(data.message || `Failed to create workout (${response.status}). Please try again.`);
                }
            } catch (error) {
                console.log("Error submitting form: ", error);
                setApiError(error.message || 'An error occurred. Please try again.');
            }
        }
    };

    // Close success notification
    const handleCloseSnackbar = () => {
        setIsSubmitted(false);
    };

    // Close error notification
    const handleCloseErrorSnackbar = () => {
        setApiError('');
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ p: 4, mt: 4, mb: 4 }}>
                <Typography variant="h4" component="h1" align="center" gutterBottom>
                    Add New Workout
                </Typography>

                <Box component="form" onSubmit={handleSubmit} noValidate>
                    <TextField
                        fullWidth
                        required
                        id="workoutName"
                        name="workoutName"
                        label="Workout Name"
                        value={formData.workoutName}
                        onChange={handleChange}
                        error={!!errors.workoutName}
                        helperText={errors.workoutName}
                        margin="normal"
                    />

                    <TextField
                        fullWidth
                        required
                        id="workoutDescription"
                        name="workoutDescription"
                        label="Workout Description"
                        multiline
                        rows={4}
                        margin="normal"
                        value={formData.workoutDescription}
                        onChange={handleChange}
                        error={!!errors.workoutDescription}
                        helperText={errors.workoutDescription}
                    />

                    <TextField
                        fullWidth
                        required
                        id="duration"
                        name="duration"
                        label="Workout Duration (minutes)"
                        type="number"
                        margin="normal"
                        value={formData.duration}
                        onChange={handleChange}
                        error={!!errors.duration}
                        helperText={errors.duration}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        fullWidth
                        sx={{ mt: 3 }}
                    >
                        Create Workout
                    </Button>
                </Box>
            </Paper>

            {/* Success message */}
            <Snackbar
                open={isSubmitted}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    Workout created successfully!
                </Alert>
            </Snackbar>

            {/* Error message */}
            <Snackbar
                open={!!apiError}
                autoHideDuration={6000}
                onClose={handleCloseErrorSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseErrorSnackbar} severity="error" sx={{ width: '100%' }}>
                    {apiError}
                </Alert>
            </Snackbar>
        </Container>
    );
}
