import React from 'react';
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from './pages/auth/Login.jsx';
import { Register } from './pages/auth/Register.jsx';
import { Home } from './pages/home/Home.jsx';
import { Profile } from './pages/auth/Profile.jsx';
import { Courses } from './pages/courses/Courses.jsx';
import { Quiz } from './pages/quiz/Quiz.jsx';
import { Materials } from './pages/Materials/Materials.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default route is the login page */}
        <Route path="/" element={<Login />} />
        {/* Route for registration */}
        <Route path="/register" element={<Register />} />
        {/* Other routes */}
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/materials" element={<Materials />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
