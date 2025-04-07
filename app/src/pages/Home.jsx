import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    Paper,
    Box,
    Grid,
    Card,
    CardContent,
    CardActions,
    Button,
    Tabs,
    Tab,
    Divider,
    IconButton,
    Snackbar,
    Alert,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import { fetchWithAuth } from '../services/authUtils';

export default function Home() {
    // Tab state
    const [tabValue, setTabValue] = useState(0);
    const [workouts, setWorkouts] = useState([]);
    const [exercises, setExercises] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(null);
    const [isDeleted, setIsDeleted] = useState(false);
    const [alertSeverity, setAlertSeverity] = useState("success");

    useEffect(() => {
        if (tabValue === 0) {
            fetchWorkouts();
        } else if (tabValue === 1) {
            fetchExercises();
        }
    }, [tabValue]);

    const fetchWorkouts = async () => {
        try {
            setIsLoading(true);
            const response = await fetchWithAuth('http://localhost:3000/api/workout');
            if (!response.ok) {
                throw new Error('Failed to fetch workouts');
            }
            const data = await response.json();
            const formattedWorkouts = data.result.map(workout => ({
                id: workout.workout_id,
                name: workout.name,
                description: workout.description,
                duration: workout.duration
            }));
            setWorkouts(formattedWorkouts);
        } catch (error) {
            console.log('Error fetching workouts:', error);
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchExercises = async () => {
        try {
            setIsLoading(true);
            const response = await fetchWithAuth('http://localhost:3000/api/exercise');
            if (!response.ok) {
                throw new Error('Failed to fetch exercises');
            }
            const data = await response.json();
            const formattedExercises = data.result.map(exercise => ({
                id: exercise.exercise_id,
                name: exercise.name,
                description: exercise.description,
                sets: exercise.sets,
                reps: exercise.reps,
                weight: exercise.weight,
            }));
            setExercises(formattedExercises);
        } catch (error) {
            console.log('Error fetching exercises:', error);
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const filteredWorkouts = workouts.filter(workout =>
        workout.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        workout.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredExercises = exercises.filter(exercise =>
        exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exercise.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Delete handlers
    const handleDeleteWorkout = async (id) => {
        try {
            const response = await fetchWithAuth(`http://localhost:3000/api/workout/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                console.log("Failed to delete workout");
            }

            setWorkouts(workouts.filter(workout => workout.id !== id));
            setIsDeleted(true);
            setAlertSeverity("success");
        } catch (error) {
            console.error("Error deleting workout:", error);
        }
    };

    const handleDeleteExercise = async (id) => {
        try {
            const response = await fetchWithAuth(`http://localhost:3000/api/exercise/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                console.log("Failed to delete exercise");
            }

            setExercises(exercises.filter(exercise => exercise.id !== id));
            setIsDeleted(true);
            setAlertSeverity("success");
        } catch (error) {
            console.log("Error deleting exercise:", error);
        }
    };

    const handleCloseSnackbar = () => {
        setIsDeleted(false);
    }

    return (
        <Container maxWidth="lg">
            <Paper elevation={3} sx={{ p: 4, mt: 4, mb: 4 }}>
                <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h4" component="h1">
                        Workout Planner Dashboard
                    </Typography>
                </Box>

                <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    sx={{ mb: 3 }}
                    variant="fullWidth"
                >
                    <Tab
                        icon={<DirectionsRunIcon />}
                        label="WORKOUTS"
                        iconPosition="start"
                    />
                    <Tab
                        icon={<FitnessCenterIcon />}
                        label="EXERCISES"
                        iconPosition="start"
                    />
                </Tabs>

                <Divider sx={{ mb: 3 }} />

                {/* Workouts Tab Panel */}
                {tabValue === 0 && (
                    <>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                            <Typography variant="h5">
                                My Workouts
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<AddIcon />}
                                href="/workout"
                            >
                                Add Workout
                            </Button>
                        </Box>

                        {isLoading ? (
                            <Typography variant="body1" sx={{ textAlign: 'center', my: 4 }}>
                                Loading workouts...
                            </Typography>
                        ) : error ? (
                            <Typography variant="body1" sx={{ textAlign: 'center', my: 4, color: 'error.main' }}>
                                Error: {error}
                            </Typography>
                        ) : filteredWorkouts.length === 0 ? (
                            <Typography variant="body1" sx={{ textAlign: 'center', my: 4 }}>
                                No workouts found. Add a new workout to get started!
                            </Typography>
                        ) : (
                            <Grid container spacing={3}>
                                {filteredWorkouts.map((workout) => (
                                    <Grid size={{ xs: 12, md: 6, lg: 4 }} key={workout.id}>
                                        <Card elevation={2}>
                                            <CardContent>
                                                <Typography variant="h6" gutterBottom>
                                                    {workout.name}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                                    {workout.description}
                                                </Typography>
                                                <Typography variant="body2">
                                                    <strong>Duration:</strong> {workout.duration}
                                                </Typography>
                                            </CardContent>
                                            <CardActions sx={{ justifyContent: 'flex-end' }}>
                                                <IconButton size="small" color="primary" href={`/workout/${workout.id}`}>
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton
                                                    size="small"
                                                    color="error"
                                                    onClick={() => handleDeleteWorkout(workout.id)}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        )}
                    </>
                )}

                {/* Exercises Tab Panel */}
                {tabValue === 1 && (
                    <>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                            <Typography variant="h5">
                                My Exercises
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<AddIcon />}
                                href="/exercise"
                            >
                                Add Exercise
                            </Button>
                        </Box>

                        {isLoading ? (
                            <Typography variant="body1" sx={{ textAlign: 'center', my: 4 }}>
                                Loading exercises...
                            </Typography>
                        ) : error ? (
                            <Typography variant="body1" sx={{ textAlign: 'center', my: 4, color: 'error.main' }}>
                                Error: {error}
                            </Typography>
                        ) : filteredExercises.length === 0 ? (
                            <Typography variant="body1" sx={{ textAlign: 'center', my: 4 }}>
                                No exercises found. Add a new exercise to get started!
                            </Typography>
                        ) : (
                            <Grid container spacing={3}>
                                {filteredExercises.map((exercise) => (
                                    <Grid size={{ xs: 12, md: 6, lg: 4 }} key={exercise.id}>
                                        <Card elevation={2}>
                                            <CardContent>
                                                <Typography variant="h6" gutterBottom>
                                                    {exercise.name}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                                    {exercise.description}
                                                </Typography>
                                                <Grid container spacing={1}>
                                                    <Grid size={{ xs: 4 }} >
                                                        <Typography variant="body2">
                                                            <strong>Sets:</strong> {exercise.sets}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid size={{ xs: 4 }} >
                                                        <Typography variant="body2">
                                                            <strong>Reps:</strong> {exercise.reps}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid size={{ xs: 4 }} >
                                                        <Typography variant="body2">
                                                            <strong>Weight:</strong> {exercise.weight}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </CardContent>
                                            <CardActions sx={{ justifyContent: 'flex-end' }}>
                                                <IconButton size="small" color="primary" href={`/exercise/${exercise.id}`}>
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton
                                                    size="small"
                                                    color="error"
                                                    onClick={() => handleDeleteExercise(exercise.id)}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        )}
                    </>
                )}
            </Paper>
            <Snackbar
                open={isDeleted}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={alertSeverity}
                    sx={{ width: '100%' }}
                >
                    Item deleted successfully!
                </Alert>
            </Snackbar>
        </Container >
    );
}