import React, { useState, useEffect } from 'react';
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
import { FaEdit } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import './AddCourse.css';

const EditCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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

  const levels = ['Beginner', 'Intermediate', 'Advanced'];

  useEffect(() => {
    const storedCourses = JSON.parse(localStorage.getItem('courses')) || [];
    const courseToEdit = storedCourses[id];
    if (courseToEdit) {
      setCourseData(courseToEdit);
    } else {
      alert('Course not found!');
      navigate('/ViewCourse');
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleRatingChange = (event, newValue) => {
    setCourseData((prevState) => ({
      ...prevState,
      rating: newValue
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedCourses = JSON.parse(localStorage.getItem('courses')) || [];
    storedCourses[id] = courseData;
    localStorage.setItem('courses', JSON.stringify(storedCourses));
    alert('Course updated successfully!');
    navigate('/ViewCourse');
  };

  return (
    <Container className="add-course-container">
      <Paper elevation={3} className="form-paper">
        <Typography variant="h4" className="form-title">
          <FaEdit className="title-icon" />
          Edit Course
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

          <TextField
            fullWidth
            label="Video URL"
            name="video"
            value={courseData.video}
            onChange={handleChange}
            required
            margin="normal"
          />

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

<<<<<<< Updated upstream
          <Box className="rating-box">
            <Typography component="legend">Rating</Typography>
            <Rating
              name="rating"
              value={courseData.rating}
              onChange={handleRatingChange}
              precision={0.5}
            />
          </Box>
=======
                <Grid item xs={12}>
                  <TextField
                    name="video"
                    label="Video URL"
                    variant="outlined"
                    fullWidth
                    value={courseData.video}
                    onChange={handleChange}
                    placeholder="e.g. https://example.com/video"
                    className="form-field"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FaFolderOpen />
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    name="price"
                    label="Course Price"
                    variant="outlined"
                    fullWidth
                    required
                    value={courseData.price}
                    onChange={handleChange}
                    placeholder="e.g. 99.99"
                    type="number"
                    className="form-field"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FaMoneyBillWave />
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
>>>>>>> Stashed changes

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
            Update Course
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            className="submit-btn"
            size="large"
            onClick={() => navigate('/ViewCourse')}
          >
            Cancel
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default EditCourse;
