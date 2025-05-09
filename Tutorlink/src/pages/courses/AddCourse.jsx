import React, { useState, useEffect } from "react";
import {
  Button,
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
  
  // Media queries for responsive design
  const isMobile = useMediaQuery('(max-width:768px)');

  useEffect(() => {
    // Auto-close side nav on mobile
    if (isMobile) {
      setSideNavOpen(false);
    }
  }, [isMobile]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Restrict input for duration, price, and rating to numbers only
    if ((name === "duration" || name === "price" || name === "rating") && !/^\d*$/.test(value)) {
      return;
    }

    setCourse({
      ...course,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Validate required fields
    if (!course.title || !course.instructor || !course.price || !course.rating) {
      showToast("Please fill in all required fields", "error");
      setLoading(false);
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      try {
        // Get existing courses
        const existingCourses = JSON.parse(localStorage.getItem("courses")) || [];
        
        // Add new course
        const updatedCourses = [...existingCourses, course];
        
        // Save to localStorage
        localStorage.setItem("courses", JSON.stringify(updatedCourses));
        
        // Show success toast
        showToast("Course added successfully!", "success");
        
        // Reset form
        setCourse({
          title: "",
          description: "",
          instructor: "",
          duration: "",
          price: "",
          image: "",
          rating: "" // Reset rating field
        });
        
        setLoading(false);
        
        // Redirect after 2 seconds
        setTimeout(() => {
          navigate("/ViewCourse");
        }, 2000);
      } catch (error) {
        showToast("Error adding course. Please try again.", "error");
        setLoading(false);
      }
    }, 1000);
  };

  // Show toast message
  const showToast = (message, severity = "success") => {
    setToast({
      open: true,
      message,
      severity
    });
  };

  // Close toast message
  const handleCloseToast = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setToast({ ...toast, open: false });
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
