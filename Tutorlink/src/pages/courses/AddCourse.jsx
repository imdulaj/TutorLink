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
<<<<<<< Updated upstream
    <Container className="add-course-container">
      <Paper elevation={3} className="form-paper">
        <Typography variant="h4" className="form-title">
          <FaBook className="title-icon" />
          Add New Course
        </Typography>
=======
    <div className="view-course-layout">
      <CssBaseline />
      
      {/* Mobile menu toggle button */}
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
      
      {/* Side Navigation */}
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        anchor="left"
        className={`side-nav ${sideNavOpen ? 'open' : ''}`}
        PaperProps={{ className: "side-nav-paper" }}
        open={sideNavOpen}
        onClose={() => setSideNavOpen(false)}
      >
        <div className="side-nav-header">
          <img src={logo} alt="TutorLink Logo" className="side-nav-logo" />
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
      
      {/* Main Content */}
      <main className="main-content">
        <div className="container">
          <Paper className="add-course-paper" elevation={3}>
            <div className="title-container">
              <FaBook className="title-icon" />
              <h2 className="title">Add New Course</h2>
            </div>
            
            <form className="course-form" onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    name="title"
                    label="Course Title"
                    variant="outlined"
                    fullWidth
                    required
                    value={course.title}
                    onChange={handleChange}
                    className="form-field"
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
                    name="description"
                    label="Course Description"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    value={course.description}
                    onChange={handleChange}
                    className="form-field"
                  />
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <TextField
                    name="instructor"
                    label="Instructor Name"
                    variant="outlined"
                    fullWidth
                    required
                    value={course.instructor}
                    onChange={handleChange}
                    className="form-field"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FaChalkboardTeacher />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <TextField
                    name="duration"
                    label="Course Duration (in weeks)"
                    variant="outlined"
                    fullWidth
                    value={course.duration}
                    onChange={handleChange}
                    placeholder="e.g. 8 weeks"
                    className="form-field"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FaClock />
                        </InputAdornment>
                      ),
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
                    value={course.price}
                    onChange={handleChange}
                    placeholder="e.g. $99.99"
                    className="form-field"
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
                    value={course.image}
                    onChange={handleChange}
                    className="form-field"
                  />
                </Grid>
>>>>>>> Stashed changes

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
  );
};

export default AddCourse;