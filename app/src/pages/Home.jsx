import React, { useState } from 'react';
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
    TextField,
    InputAdornment
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';


export default function WorkoutDashboard() {
    // Tab state
    const [tabValue, setTabValue] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');

    // Mock data - in a real app this would come from your backend
    const [workouts, setWorkouts] = useState([
        {
            id: 1,
            workoutName: 'Upper Body Strength',
            workoutDescription: 'Focus on chest, shoulders, and triceps',
            duration: '45 minutes',
        },
        {
            id: 2,
            workoutName: 'Lower Body Power',
            workoutDescription: 'Squats, lunges, and deadlifts for strength',
            duration: '50 minutes',
        },
        {
            id: 3,
            workoutName: 'Full Body HIIT',
            workoutDescription: 'High intensity interval training to burn calories',
            duration: '30 minutes',
        }
    ]);

    const [exercises, setExercises] = useState([
        {
            id: 1,
            exerciseName: 'Bench Press',
            exerciseDescription: 'Lie on bench and press barbell upward',
            sets: '3',
            reps: '8-10',
            weight: '135',
        },
        {
            id: 2,
            exerciseName: 'Squat',
            exerciseDescription: 'Lower body with barbell on shoulders',
            sets: '4',
            reps: '6-8',
            weight: '185',
        },
        {
            id: 3,
            exerciseName: 'Deadlift',
            exerciseDescription: 'Lift barbell from floor to hip level',
            sets: '3',
            reps: '5',
            weight: '225',
        },
        {
            id: 4,
            exerciseName: 'Pull-ups',
            exerciseDescription: 'Pull body up on bar until chin clears',
            sets: '3',
            reps: '8-10',
            weight: 'Body weight',
        }
    ]);

    // Handle tab change
    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    // NOT NEEDED
    // Handle search
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    /*
        THIS CODE RETURNS ALL DATA DEPENDING ON SEARCH, NEED TO CHANGE TO BACKEND
    */
    // Filter data based on search term
    const filteredWorkouts = workouts.filter(workout =>
        workout.workoutName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        workout.workoutDescription.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredExercises = exercises.filter(exercise =>
        exercise.exerciseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exercise.exerciseDescription.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Delete handlers
    const handleDeleteWorkout = (id) => {
        setWorkouts(workouts.filter(workout => workout.id !== id));
    };

    const handleDeleteExercise = (id) => {
        setExercises(exercises.filter(exercise => exercise.id !== id));
    };

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

                        {filteredWorkouts.length === 0 ? (
                            <Typography variant="body1" sx={{ textAlign: 'center', my: 4 }}>
                                No workouts found. Add a new workout to get started!
                            </Typography>
                        ) : (
                            <Grid container spacing={3}>
                                {filteredWorkouts.map((workout) => (
                                    <Grid item xs={12} md={6} lg={4} key={workout.id}>
                                        <Card elevation={2}>
                                            <CardContent>
                                                <Typography variant="h6" gutterBottom>
                                                    {workout.workoutName}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                                    {workout.workoutDescription}
                                                </Typography>
                                                <Typography variant="body2">
                                                    <strong>Duration:</strong> {workout.duration}
                                                </Typography>
                                            </CardContent>
                                            <CardActions sx={{ justifyContent: 'flex-end' }}>
                                                <IconButton size="small" color="primary">
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

                        {filteredExercises.length === 0 ? (
                            <Typography variant="body1" sx={{ textAlign: 'center', my: 4 }}>
                                No exercises found. Add a new exercise to get started!
                            </Typography>
                        ) : (
                            <Grid container spacing={3}>
                                {filteredExercises.map((exercise) => (
                                    <Grid item xs={12} md={6} lg={4} key={exercise.id}>
                                        <Card elevation={2}>
                                            <CardContent>
                                                <Typography variant="h6" gutterBottom>
                                                    {exercise.exerciseName}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                                    {exercise.exerciseDescription}
                                                </Typography>
                                                <Grid container spacing={1}>
                                                    <Grid item xs={4}>
                                                        <Typography variant="body2">
                                                            <strong>Sets:</strong> {exercise.sets}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={4}>
                                                        <Typography variant="body2">
                                                            <strong>Reps:</strong> {exercise.reps}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={4}>
                                                        <Typography variant="body2">
                                                            <strong>Weight:</strong> {exercise.weight}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </CardContent>
                                            <CardActions sx={{ justifyContent: 'flex-end' }}>
                                                <IconButton size="small" color="primary">
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
        </Container>
    );
}