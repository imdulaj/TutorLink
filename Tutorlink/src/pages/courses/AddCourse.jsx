import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Typography,
  MenuItem,
  Rating,
  Box,
  Grid,
  Container,
  Paper,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  InputAdornment
} from '@mui/material';
import { FaBook, FaChalkboardTeacher, FaClock, FaMoneyBillWave, FaChevronLeft, FaBars, FaHome, FaFolderOpen, FaQuestionCircle, FaChartBar } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
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
    description: '',
    image: ''
  });

  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [toast, setToast] = useState({ open: false, message: '', severity: '' });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const levels = ['Beginner', 'Intermediate', 'Advanced'];

  const handleChange = (e) => {
    const { name, value } = e.target;

    if ((name === "duration" || name === "price" || name === "rating") && !/^\d*$/.test(value)) {
      return;
    }

    setCourseData({
      ...courseData,
      [name]: value
    });
  };

  const handleRatingChange = (event, newValue) => {
    setCourseData({
      ...courseData,
      rating: newValue
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if (!courseData.title || !courseData.instructor || !courseData.price || !courseData.rating) {
      showToast("Please fill in all required fields", "error");
      setLoading(false);
      return;
    }

    setTimeout(() => {
      try {
        const existingCourses = JSON.parse(localStorage.getItem("courses")) || [];
        const updatedCourses = [...existingCourses, courseData];
        localStorage.setItem("courses", JSON.stringify(updatedCourses));
        showToast("Course added successfully!", "success");

        setCourseData({
          title: "",
          description: "",
          instructor: "",
          duration: "",
          price: "",
          image: "",
          rating: 0
        });

        setLoading(false);

        setTimeout(() => {
          navigate("/ViewCourse");
        }, 2000);
      } catch (error) {
        showToast("Error adding course. Please try again.", "error");
        setLoading(false);
      }
    }, 1000);
  };

  const showToast = (message, severity = "success") => {
    setToast({
      open: true,
      message,
      severity
    });
  };

  const handleCloseToast = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setToast({ ...toast, open: false });
  };

  return (
    <div className="view-course-layout">
      <CssBaseline />

      <Drawer
        variant="permanent"
        anchor="left"
        className={`side-nav ${sideNavOpen ? 'open' : ''}`}
        PaperProps={{ className: "side-nav-paper" }}
        open={sideNavOpen}
        onClose={() => setSideNavOpen(false)}
      >
        <div className="side-nav-header">
          <img src="/logo.png" alt="TutorLink Logo" className="side-nav-logo" />
          <h2>TutorLink</h2>
        </div>
        <List>
          <ListItem button component={Link} to="/dashboard" className="side-nav-item">
            <FaHome className="side-nav-item-icon" />
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button component={Link} to="/ViewCourse" className="side-nav-item">
            <FaBook className="side-nav-item-icon" />
            <ListItemText primary="Courses List" />
          </ListItem>
          <ListItem button component={Link} to="/materials" className="side-nav-item">
            <FaFolderOpen className="side-nav-item-icon" />
            <ListItemText primary="Materials" />
          </ListItem>
          <ListItem button component={Link} to="/quiz" className="side-nav-item">
            <FaQuestionCircle className="side-nav-item-icon" />
            <ListItemText primary="Quiz" />
          </ListItem>
          <ListItem button component={Link} to="/reports" className="side-nav-item">
            <FaChartBar className="side-nav-item-icon" />
            <ListItemText primary="Reports" />
          </ListItem>
        </List>
      </Drawer>

      <main className="main-content">
        <Container maxWidth="md">
          <Paper className="add-course-paper" elevation={3} sx={{ padding: 4, marginTop: 4 }}>
            <div className="title-container" style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
              <FaBook style={{ marginRight: '0.5rem' }} />
              <Typography variant="h4">Add New Course</Typography>
            </div>

            <form onSubmit={handleSubmit} className="course-form">
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Course Title"
                    name="title"
                    value={courseData.title}
                    onChange={handleChange}
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FaBook />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Instructor Name"
                    name="instructor"
                    value={courseData.instructor}
                    onChange={handleChange}
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FaChalkboardTeacher />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Video URL"
                    name="video"
                    value={courseData.video}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Duration (in hours)"
                    name="duration"
                    type="number"
                    value={courseData.duration}
                    onChange={handleChange}
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FaClock />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    select
                    label="Level"
                    name="level"
                    value={courseData.level}
                    onChange={handleChange}
                  >
                    {levels.map(level => (
                      <MenuItem key={level} value={level}>{level}</MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={12}>
                  <Box>
                    <Typography>Rating</Typography>
                    <Rating
                      name="rating"
                      value={courseData.rating}
                      onChange={handleRatingChange}
                      precision={0.5}
                    />
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Price"
                    name="price"
                    type="number"
                    value={courseData.price}
                    onChange={handleChange}
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FaMoneyBillWave />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    name="image"
                    label="Video URL (Optional)"
                    variant="outlined"
                    fullWidth
                    value={courseData.image}
                    onChange={handleChange}
                    className="form-field"
                  />
                </Grid>
              </Grid>

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
              <Button
                variant="outlined"
                color="secondary"
                className="submit-btn"
                size="large"
                onClick={() => navigate('/ViewCourse')}
              >
                View Courses
              </Button>
            </form>
          </Paper>
        </Container>
      </main>
    </div>
  );
};

export default AddCourse;
