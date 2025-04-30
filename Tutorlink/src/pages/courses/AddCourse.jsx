import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  MenuItem,
  Rating,
  Box,
  Grid,
  InputAdornment
} from '@mui/material';
import { FaBook } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './AddCourse.css';

const AddCourse = () => {
  const [courseData, setCourseData] = useState({
    title: '',
    instructor: '',
    video: '',
    duration: '',
    level: 'Beginner',
    rating: 0,
    price: '',
    description: ''
  });

  const navigate = useNavigate();

  const levels = ['Beginner', 'Intermediate', 'Advanced'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleRatingChange = (event, newValue) => {
    setCourseData(prevState => ({
      ...prevState,
      rating: newValue
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const existingCourses = JSON.parse(localStorage.getItem('courses')) || [];
    localStorage.setItem('courses', JSON.stringify([...existingCourses, courseData]));
    alert('Course added successfully!');
    navigate('/ViewCourse');
  };

  return (
    <Container maxWidth="lg" className="add-course-container">
      <Paper elevation={12} className="form-paper">
        <Typography variant="h4" className="form-title">
          <FaBook className="title-icon" />
          Add New Course
        </Typography>

        <form onSubmit={handleSubmit} className="course-form">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Course Title"
                name="title"
                value={courseData.title}
                onChange={handleChange}
                required
                variant="outlined"
                color="primary"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Instructor Name"
                name="instructor"
                value={courseData.instructor}
                onChange={handleChange}
                required
                variant="outlined"
                color="primary"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Video URL"
                name="video"
                value={courseData.video}
                onChange={handleChange}
                required
                variant="outlined"
                color="primary"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Duration (hours)"
                name="duration"
                type="number"
                value={courseData.duration}
                onChange={handleChange}
                required
                variant="outlined"
                color="primary"
                InputProps={{
                  startAdornment: <InputAdornment position="start">hrs</InputAdornment>
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Level"
                name="level"
                value={courseData.level}
                onChange={handleChange}
                required
                variant="outlined"
                color="primary"
              >
                {levels.map((level) => (
                  <MenuItem key={level} value={level}>
                    {level}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <Box className="rating-box">
                <Typography component="legend">Rating</Typography>
                <Rating
                  name="rating"
                  value={courseData.rating}
                  onChange={handleRatingChange}
                  precision={0.5}
                  size="large"
                />
              </Box>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Price"
                name="price"
                type="number"
                value={courseData.price}
                onChange={handleChange}
                required
                variant="outlined"
                color="primary"
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={courseData.description}
                onChange={handleChange}
                required
                variant="outlined"
                color="primary"
                multiline
                rows={4}
              />
            </Grid>

            <Grid item xs={12} className="button-grid">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                className="submit-btn"
              >
                Add Course
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                size="large"
                onClick={() => navigate('/ViewCourse')}
                className="view-courses-btn"
              >
                View Courses
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default AddCourse;
