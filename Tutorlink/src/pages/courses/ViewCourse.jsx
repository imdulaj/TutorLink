import React, { useState, useEffect } from "react";
import { Button, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField } from "@mui/material";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./ViewCourse.css";

const ViewCourse = () => {
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const storedCourses = JSON.parse(localStorage.getItem("courses")) || [];
    setCourses(storedCourses);
  }, []);

  const handleDelete = (id) => {
    const updatedCourses = courses.filter((_, index) => index !== id);
    setCourses(updatedCourses);
    localStorage.setItem("courses", JSON.stringify(updatedCourses));
  };

  const filteredCourses = courses.filter((course) =>
    [course.title, course.description, course.instructor].some((field) =>
      field?.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="container">
      <h2 className="title">Course List</h2>
      <div className="search-container">
        <TextField
          label="Search Courses"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
          fullWidth
          InputProps={{
            style: { borderRadius: "8px" },
          }}
        />
      </div>
      <div className="button-container">
        <Link to="/AddCourse">
          <Button variant="contained" color="success">+ Create New Course</Button>
        </Link>
      </div>

      {filteredCourses.length > 0 ? (
        <TableContainer component={Paper} className="table-container">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell>Video</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Details</TableCell>
                <TableCell>Instructor</TableCell>
                <TableCell>Duration</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCourses.map((course, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <video width="100" height="60" controls>
                      <source src={course.video} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </TableCell>
                  <TableCell>{course.title}</TableCell>
                  <TableCell>{course.description}</TableCell>
                  <TableCell>{course.instructor}</TableCell>
                  <TableCell>{course.duration}</TableCell>
                  <TableCell>{course.price}</TableCell>
                  <TableCell>
                    <Link to={`/ViewCourse/${index}`}>
                      <IconButton color="primary"><FaEye /></IconButton>
                    </Link>
                    <Link to={`/EditCourse/${index}`}>
                      <IconButton color="primary"><FaEdit /></IconButton>
                    </Link>
                    <IconButton color="secondary" onClick={() => handleDelete(index)}>
                      <FaTrash />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <p className="no-courses">No courses found.</p>
      )}
    </div>
  );
};

export default ViewCourse;