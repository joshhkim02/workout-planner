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


export default function EditExercise() {
    const { id } = useParams();
    const navigate = useNavigate();
    // Form state
    const [formData, setFormData] = useState({
        exerciseName: '',
        exerciseDescription: '',
        sets: '',
        reps: '',
        weight: '',
    });

    // Error state
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [apiError, setApiError] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        const fetchExerciseData = async () => {
            try {
                setIsLoading(true);
                const response = await fetchWithAuth(`http://localhost:3000/api/exercise/${id}`);

                if (!response.ok) {
                    console.log("Failed to fetch exercise details");
                }

                const data = await response.json();
                setFormData({
                    exerciseName: data.result.name,
                    exerciseDescription: data.result.description || '',
                    sets: data.result.sets || '',
                    reps: data.result.reps || '',
                    weight: data.result.weight || '',
                });
            } catch (error) {
                console.log("Error fetching exercise: ", error);
                setApiError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        if (id) {
            fetchExerciseData();
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

        if (!formData.exerciseName.trim()) {
            newErrors.exerciseName = 'Exercise name is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                const response = await fetchWithAuth(`http://localhost:3000/api/exercise/${id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: formData.exerciseName,
                        description: formData.exerciseDescription,
                        sets: formData.sets,
                        reps: formData.reps,
                        weight: formData.weight,
                    }),
                });
                if (!response.ok) {
                    console.log("Failed to update exercise");
                }
                setIsSubmitted(true);
                setTimeout(() => {
                    navigate('/home');
                }, 2000);
            } catch (error) {
                console.log("Error updating exercise: ", error);
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
                    Edit Exercise
                </Typography>

                <Box component="form" onSubmit={handleSubmit} noValidate>
                    <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                        <TextField
                            fullWidth
                            id="exerciseName"
                            name="exerciseName"
                            label="Exercise Name"
                            value={formData.exerciseName}
                            onChange={handleChange}
                            error={!!errors.exerciseName}
                            helperText={errors.exerciseName}
                        />
                    </Box>

                    <TextField
                        fullWidth
                        id="exerciseDescription"
                        name="exerciseDescription"
                        label="Exercise Description"
                        multiline
                        rows={4}
                        margin="normal"
                        value={formData.exerciseDescription}
                        onChange={handleChange}
                        error={!!errors.exerciseDescription}
                        helperText={errors.exerciseDescription}
                    />

                    <TextField
                        fullWidth
                        id="sets"
                        name="sets"
                        label="Number of sets"
                        type="sets"
                        margin="normal"
                        value={formData.sets}
                        onChange={handleChange}
                        error={!!errors.sets}
                        helperText={errors.sets}
                    />

                    <TextField
                        fullWidth
                        id="reps"
                        name="reps"
                        label="Number of repetitions"
                        margin="normal"
                        value={formData.reps}
                        onChange={handleChange}
                        error={!!errors.reps}
                        helperText={errors.reps}
                    />

                    <TextField
                        fullWidth
                        id="weight"
                        name="weight"
                        label="Weight (lbs)"
                        margin="normal"
                        value={formData.weight}
                        onChange={handleChange}
                        error={!!errors.weight}
                        helperText={errors.weight}
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
                            {isLoading ? 'Updating...' : 'Update Exercise'}
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
                    {isSubmitted ? 'Exercise updated successfully!' : apiError}
                </Alert>
            </Snackbar>
        </Container>
    );
};