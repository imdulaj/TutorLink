import React, { useState, useEffect } from "react";
import { Button, Card, CardContent, IconButton } from "@mui/material";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./ViewCourse.css";
import { Link } from 'react-router-dom';

const ViewCourse = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const storedCourses = JSON.parse(localStorage.getItem('courses')) || [];
    setCourses(storedCourses);
  }, []);

  const handleDelete = (id) => {
    const updatedCourses = courses.filter((_, index) => index !== id);
    setCourses(updatedCourses);
    localStorage.setItem('courses', JSON.stringify(updatedCourses));
  };

  const handleUpdate = (id) => {
    const newName = prompt("Enter new course name:");
    if (newName) {
      const updatedCourses = courses.map((course, index) =>
        index === id ? { ...course, title: newName } : course
      );
      setCourses(updatedCourses);
      localStorage.setItem('courses', JSON.stringify(updatedCourses));
    }
  };

  return (
    <div className="courses-container">
      <Link to='/AddCourse'><Button variant="contained" color="primary" className="add-button">
        Add New
      </Button>
      </Link>

      <div className="courses-list">
        {courses.map((course, index) => (
          <Card key={index} className="course-card">
            <CardContent className="course-content">
              <div>
                <h3>{course.title}</h3>
                <p><strong>Instructor:</strong> {course.instructor}</p>
                <p><strong>Duration:</strong> {course.duration} hours</p>
                <p><strong>Level:</strong> {course.level}</p>
                <p><strong>Rating:</strong> {course.rating}</p>
                <p><strong>Price:</strong> {course.price}</p>
                <p><strong>Description:</strong> {course.description}</p>
                {course.video && (
                  <video controls width="100%">
                    <source src={course.video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
              <div className="action-buttons">
                <Link to={`/EditCourse/${index}`}>
                  <IconButton color="primary">
                    <FaEdit />
                  </IconButton>
                </Link>
                <IconButton color="secondary" onClick={() => handleDelete(index)}>
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

export default ViewCourse;
