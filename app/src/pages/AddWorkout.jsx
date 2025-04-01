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

export default function AddWorkout() {
    // Form state
    const [formData, setFormData] = useState({
        workoutName: '',
        workoutDescription: '',
        duration: '',
    });

    // Error state
    const [errors, setErrors] = useState({});

    // Submission state
    const [isSubmitted, setIsSubmitted] = useState(false);

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
            newErrors.workoutName = 'First name is required';
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
    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            console.log('Form submitted:', formData);
            setIsSubmitted(true);

            // Reset form after successful submission (optional)
            // setFormData({
            //   workoutName: '',
            //   workoutDescription: '',
            //   duration: '',
            // });
        }
    };

    // Close success notification
    const handleCloseSnackbar = () => {
        setIsSubmitted(false);
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ p: 4, mt: 4, mb: 4 }}>
                <Typography variant="h4" component="h1" align="center" gutterBottom>
                    Workout Information
                </Typography>

                <Box component="form" onSubmit={handleSubmit} noValidate>
                    <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
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
                        />
                    </Box>

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
                        label="Workout duration"
                        type="duration"
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
                        Submit
                    </Button>
                </Box>
            </Paper>

            <Snackbar
                open={isSubmitted}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    Form submitted successfully!
                </Alert>
            </Snackbar>
        </Container>
    );
};