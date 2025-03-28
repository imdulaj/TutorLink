import React, { useState } from "react";
import { Button, Card, CardContent, IconButton } from "@mui/material";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./ViewQuiz.css";
import { Link } from "react-router-dom";

const ViewQuiz = () => {
  const [courses, setCourses] = useState([
    { id: 1, name: "Quiz Basics" },
    { id: 2, name: "Node.js Fundamentals" },
    { id: 3, name: "MongoDB Essentials" },
  ]);

  const handleDelete = (id) => {
    setCourses(courses.filter((course) => course.id !== id));
  };

  const handleUpdate = (id) => {
    const newName = prompt("Enter new course name:");
    if (newName) {
      setCourses(
        courses.map((course) =>
          course.id === id ? { ...course, name: newName } : course
        )
      );
    }
  };

  const handleAdd = () => {
    const newName = prompt("Enter course name:");
    if (newName) {
      const newCourse = { id: Date.now(), name: newName };
      setCourses([...courses, newCourse]);
    }
  };

  return (
    <div className="courses-container">
      <Link to='/AddQuiz'><Button variant="contained" color="primary" className="add-button">
        Add New
      </Button>
      </Link>

      <div className="courses-list">
        {courses.map((course) => (
          <Card key={course.id} className="course-card">
            <CardContent className="course-content">
              <span>{course.name}</span>
              <div className="action-buttons">
                <IconButton color="primary" onClick={() => handleUpdate(course.id)}>
                  <FaEdit />
                </IconButton>
                <IconButton color="secondary" onClick={() => handleDelete(course.id)}>
                  <FaTrash />
                </IconButton>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ViewQuiz;
