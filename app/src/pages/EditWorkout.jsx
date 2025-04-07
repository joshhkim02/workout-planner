import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Container,
    Typography,
    TextField,
    Button,
    Paper,
    Box,
    Snackbar,
    Alert,
    CircularProgress
} from '@mui/material';
import { fetchWithAuth } from '../services/authUtils';

export default function EditWorkout() {
    const { id } = useParams();
    const navigate = useNavigate();
    // Form state
    const [formData, setFormData] = useState({
        workoutName: '',
        workoutDescription: '',
        duration: '',
    });

    // Error state
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [apiError, setApiError] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        const fetchWorkoutData = async () => {
            try {
                setIsLoading(true);
                const response = await fetchWithAuth(`http://localhost:3000/api/workout/${id}`);

                if (!response.ok) {
                    console.log("Failed to fetch workout details");
                }

                const data = await response.json();
                setFormData({
                    workoutName: data.result.name,
                    workoutDescription: data.result.description || '',
                    duration: data.result.duration || '',
                });
            } catch (error) {
                console.log("Error fetching workout: ", error);
                setApiError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        if (id) {
            fetchWorkoutData();
        }
    }, [id]);

    // Handle text input changes
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

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                const response = await fetchWithAuth(`http://localhost:3000/api/workout/${id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: formData.workoutName,
                        description: formData.workoutDescription,
                        duration: formData.duration,
                    }),
                });

                if (!response.ok) {
                    console.log("Failed to update workout");
                }

                setIsSubmitted(true);
                setTimeout(() => {
                    navigate('/home');
                }, 2000);
            } catch (error) {
                console.log("Error updating workout: ", error);
                setApiError(error.message);
            } finally {
                setIsLoading(false);
            }
        }
    };

    // Close success notification
    const handleCloseSnackbar = () => {
        setIsSubmitted(false);
        setApiError(null);
    };

    if (isLoading && id) {
        return (
            <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
                <CircularProgress />
            </Container>
        );
    }

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ p: 4, mt: 4, mb: 4 }}>
                <Typography variant="h4" component="h1" align="center" gutterBottom>
                    Edit Workout
                </Typography>

                <Box component="form" onSubmit={handleSubmit} noValidate>
                    <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                        <TextField
                            fullWidth
                            id="workoutName"
                            name="workoutName"
                            label="Workout Name"
                            value={formData.workoutName}
                            onChange={handleChange}
                            error={!!errors.workoutName}
                            helperText={errors.workoutName}
                        />
                    </Box>

                    <TextField
                        fullWidth
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
                        id="duration"
                        name="duration"
                        label="Workout duration"
                        margin="normal"
                        value={formData.duration}
                        onChange={handleChange}
                        error={!!errors.duration}
                        helperText={errors.duration}
                    />

                    <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            size="large"
                            fullWidth
                            disabled={isLoading}
                        >
                            {isLoading ? 'Updating...' : 'Update Workout'}
                        </Button>

                        <Button
                            variant="outlined"
                            color="secondary"
                            size="large"
                            fullWidth
                            onClick={() => navigate('/home')}
                        >
                            Cancel
                        </Button>
                    </Box>
                </Box>
            </Paper>

            <Snackbar
                open={isSubmitted || !!apiError}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={isSubmitted ? "success" : "error"}
                    sx={{ width: '100%' }}
                >
                    {isSubmitted ? 'Workout updated successfully!' : apiError}
                </Alert>
            </Snackbar>
        </Container>
    );
}