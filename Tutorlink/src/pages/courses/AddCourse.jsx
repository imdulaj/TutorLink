import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  MenuItem,
  Rating,
  Box
} from '@mui/material';
import { FaBook, FaUpload } from 'react-icons/fa';
import './AddCourse.css';

const AddCourse = () => {
  const [courseData, setCourseData] = useState({
    title: '',
    instructor: '',
    image: '',
    duration: '',
    level: 'Beginner',
    rating: 0,
    price: '',
    description: ''
  });

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
    console.log('Course Data:', courseData);
   
  };

  return (
    <Container className="add-course-container">
      <Paper elevation={3} className="form-paper">
        <Typography variant="h4" className="form-title">
          <FaBook className="title-icon" />
          Add New Course
        </Typography>

        <form onSubmit={handleSubmit} className="course-form">
          <TextField
            fullWidth
            label="Course Title"
            name="title"
            value={courseData.title}
            onChange={handleChange}
            required
            margin="normal"
          />

          <TextField
            fullWidth
            label="Instructor Name"
            name="instructor"
            value={courseData.instructor}
            onChange={handleChange}
            required
            margin="normal"
          />

          <div className="image-upload">
            <TextField
              fullWidth
              label="Image URL"
              name="image"
              value={courseData.image}
              onChange={handleChange}
              required
              margin="normal"
            />
            <Button
              variant="contained"
              component="label"
              startIcon={<FaUpload />}
              className="upload-btn"
            >
              Upload
              <input type="file" hidden accept="image/*" />
            </Button>
          </div>

          <TextField
            fullWidth
            label="Duration (in hours)"
            name="duration"
            type="number"
            value={courseData.duration}
            onChange={handleChange}
            required
            margin="normal"
          />

          <TextField
            fullWidth
            select
            label="Level"
            name="level"
            value={courseData.level}
            onChange={handleChange}
            required
            margin="normal"
          >
            {levels.map((level) => (
              <MenuItem key={level} value={level}>
                {level}
              </MenuItem>
            ))}
          </TextField>

          <Box className="rating-box">
            <Typography component="legend">Rating</Typography>
            <Rating
              name="rating"
              value={courseData.rating}
              onChange={handleRatingChange}
              precision={0.5}
            />
          </Box>

          <TextField
            fullWidth
            label="Price"
            name="price"
            type="number"
            value={courseData.price}
            onChange={handleChange}
            required
            margin="normal"
          />

          <TextField
            fullWidth
            label="Description"
            name="description"
            value={courseData.description}
            onChange={handleChange}
            required
            margin="normal"
            multiline
            rows={4}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="submit-btn"
            size="large"
          >
            Add Course
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default AddCourse;