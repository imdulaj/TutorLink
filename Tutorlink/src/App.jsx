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
import Dashboard from './components/dashboard/Dashboard.jsx';
import ViewCourse from './pages/courses/ViewCourse.jsx';
import ViewMaterials from './pages/Materials/ViewMaterials.jsx';
import ViewQuiz from './pages/quiz/ViewQuiz.jsx';
import AddCourse from './pages/courses/AddCourse.jsx';
import AddQuiz from './pages/quiz/AddQuiz.jsx';
import AddMaterials from './pages/Materials/AddMaterials.jsx';


import EditCourse from './pages/courses/EditCourse.jsx';

import UpdateMaterials from './pages/Materials/UpdateMaterials.jsx';
import { UpdateUser } from './pages/auth/UpdateUser.jsx';


import EditQuiz from './pages/quiz/EditQuiz.jsx';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default route is the login page */}
        <Route path="/" element={<Login />} />

        {/* Route for registration */}
        <Route path="/register" element={<Register />} />


    <BrowserRouter>
  <Routes>
    {/* Default route is the login page */}
    <Route path="/" element={<Login />} />
    
    {/* Route for registration */}
    <Route path="/register" element={<Register />} />
    
    {/* Authenticated routes */}
    <Route path="/home" element={<Home />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/courses" element={<Courses />} />
    <Route path="/quiz" element={<Quiz />} />
    <Route path="/materials" element={<Materials />} />
    <Route path="/UpdateUser" element={<UpdateUser />} />
    
    {/* Admin routes (Dashboard and management) */}
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/ViewCourse" element={<ViewCourse />} />
    <Route path="/ViewMaterials" element={<ViewMaterials />} />
    <Route path="/ViewQuiz" element={<ViewQuiz />} />
    <Route path="/AddCourse" element={<AddCourse />} />
    <Route path="/AddQuiz" element={<AddQuiz />} />
    <Route path="/AddMaterials" element={<AddMaterials />} />

    <Route path="/EditCourse/:id" element={<EditCourse />} />
    <Route path="/updateMaterials/:id" element={<UpdateMaterials />} />

  </Routes>
</BrowserRouter>

        {/* User Routes */}
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/materials" element={<Materials />} />


        {/* Admin Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ViewCourse" element={<ViewCourse />} />
        <Route path="/ViewMaterials" element={<ViewMaterials />} />
        <Route path="/ViewQuiz" element={<ViewQuiz />} />
        <Route path="/AddCourse" element={<AddCourse />} />
        <Route path="/AddQuiz" element={<AddQuiz />} />
        <Route path="/EditQuiz/:id" element={<EditQuiz />} />
        <Route path="/AddMaterials" element={<AddMaterials />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
