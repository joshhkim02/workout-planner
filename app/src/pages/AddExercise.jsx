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


export default function AddExercise() {
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

        if (!formData.exerciseName.trim()) {
            newErrors.exerciseName = 'First name is required';
        }

        if (!formData.exerciseDescription.trim()) {
            newErrors.exerciseDescription = 'Description is required';
        }

        if (!formData.sets.trim()) {
            newErrors.sets = 'Number of sets is required';
        }

        if (!formData.reps.trim()) {
            newErrors.reps = 'Number of reps is required';
        }

        if (!formData.weight.trim()) {
            newErrors.weight = 'Weight is required';
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
            //   exerciseName: '',
            //   exerciseDescription: '',
            //   sets: '',
            //   reps: '',
            //   weight: '',
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
                    Exercise Information
                </Typography>

                <Box component="form" onSubmit={handleSubmit} noValidate>
                    <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                        <TextField
                            fullWidth
                            required
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
                        required
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
                        required
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
                        required
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
                        required
                        id="weight"
                        name="weight"
                        label="Weight (lbs)"
                        margin="normal"
                        value={formData.weight}
                        onChange={handleChange}
                        error={!!errors.weight}
                        helperText={errors.weight}
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