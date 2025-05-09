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
  CssBaseline,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  InputAdornment
} from '@mui/material';
import { FaBook, FaChevronLeft, FaBars, FaHome, FaFolderOpen, FaQuestionCircle, FaChartBar, FaChalkboardTeacher, FaClock, FaMoneyBillWave } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
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

  const [sideNavOpen, setSideNavOpen] = useState(true);
  const isMobile = window.innerWidth <= 768; // example mobile check
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
    <div className="view-course-layout">
      <CssBaseline />

      {isMobile && (
        <IconButton
          className="menu-toggle"
          onClick={() => setSideNavOpen(!sideNavOpen)}
          color="primary"
          size="large"
          sx={{
            backgroundColor: 'white',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            position: 'fixed',
            top: '1rem',
            left: sideNavOpen ? '240px' : '1rem',
            transition: 'left 0.3s ease',
            zIndex: 1100
          }}
        >
          {sideNavOpen ? <FaChevronLeft /> : <FaBars />}
        </IconButton>
      )}

      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
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
                    {['Beginner', 'Intermediate', 'Advanced'].map(level => (
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

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    value={courseData.description}
                    onChange={handleChange}
                    required
                    multiline
                    rows={4}
                  />
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                  >
                    Add Course
                  </Button>

                  <Button
                    variant="outlined"
                    color="secondary"
                    size="large"
                    onClick={() => navigate('/ViewCourse')}
                  >
                    View Courses
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Container>
      </main>
    </div>
  );
};

export default AddCourse;
