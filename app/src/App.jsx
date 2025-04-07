import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import AddWorkout from "./pages/AddWorkout";
import AddExercise from "./pages/AddExercise";
import EditWorkout from "./pages/EditWorkout";
import EditExercise from "./pages/EditExercise";
import Navbar from "./components/Navbar";

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                {/* Non-Protected Routes */}
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                {/* Protected routes */}
                <Route path="/home" element={<Home />} />
                <Route path="/workout" element={<AddWorkout />} />
                <Route path="/exercise" element={<AddExercise />} />
                <Route path="/workout/:id" element={<EditWorkout />} />
                <Route path="/exercise/:id" element={<EditExercise />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App


