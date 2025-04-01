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
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/workout" element={<AddWorkout />} />
                <Route path="/exercise" element={<AddExercise />} />
                <Route path="/editworkout" element={<EditWorkout />} />
                <Route path="/editexercise" element={<EditExercise />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App


