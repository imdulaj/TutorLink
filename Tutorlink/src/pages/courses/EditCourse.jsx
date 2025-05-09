import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  MenuItem,
  Box,
  CssBaseline,
  Grid,
  Snackbar,
  IconButton,
  InputAdornment,
  Drawer,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { FaEdit, FaBook, FaChalkboardTeacher, FaClock, FaMoneyBillWave, FaStar, FaHome, FaFolderOpen, FaQuestionCircle, FaChartBar } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import logo from '../../assets/loginHero.jpg';
import './AddCourse.css';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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

  const [toast, setToast] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const [sideNavOpen, setSideNavOpen] = useState(true);

  const levels = ['Beginner', 'Intermediate', 'Advanced'];

  useEffect(() => {
    const storedCourses = JSON.parse(localStorage.getItem('courses')) || [];
    
    // Ensure the id is a valid number
    const courseIndex = parseInt(id, 10);
    if (isNaN(courseIndex) || courseIndex < 0 || courseIndex >= storedCourses.length) {
      alert('Invalid course ID or course not found!');
      navigate('/ViewCourse');
      return;
    }

    const courseToEdit = storedCourses[courseIndex];
    setCourseData(courseToEdit);
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const showToast = (message, severity = 'success') => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedCourses = JSON.parse(localStorage.getItem('courses')) || [];
    storedCourses[id] = courseData;
    localStorage.setItem('courses', JSON.stringify(storedCourses));
    showToast('Course updated successfully!', 'success');
    navigate('/ViewCourse');
  };

  return (
    <div className="view-course-layout">
      <CssBaseline />
      
      {/* Side Navigation */}
      <Drawer
        variant="permanent"
        anchor="left"
        className={`side-nav ${sideNavOpen ? 'open' : ''}`}
        PaperProps={{ className: "side-nav-paper" }}
      >
        <div className="side-nav-header">
          <img src={logo} alt="TutorLink Logo" className="side-nav-logo" />
          <h2>TutorLink</h2>
        </div>
        <List>
          <ListItem button component="a" href="/dashboard" className="side-nav-item">
            <FaHome className="side-nav-item-icon" />
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button component="a" href="/ViewCourse" className="side-nav-item">
            <FaBook className="side-nav-item-icon" />
            <ListItemText primary="Courses List" />
          </ListItem>
          <ListItem button component="a" href="/materials" className="side-nav-item">
            <FaFolderOpen className="side-nav-item-icon" />
            <ListItemText primary="Materials" />
          </ListItem>
          <ListItem button component="a" href="/quiz" className="side-nav-item">
            <FaQuestionCircle className="side-nav-item-icon" />
            <ListItemText primary="Quiz" />
          </ListItem>
          <ListItem button component="a" href="/reports" className="side-nav-item">
            <FaChartBar className="side-nav-item-icon" />
            <ListItemText primary="Reports" />
          </ListItem>
        </List>
      </Drawer>

      <main className="main-content">
        <div className="container">
          <Paper className="add-course-paper" elevation={3}>
            <div className="title-container">
              <FaEdit className="title-icon" />
              <h2 className="title">Edit Course</h2>
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
                    value={courseData.title}
                    onChange={handleChange}
                    className="form-field"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FaBook />
                        </InputAdornment>
                      )
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
                    value={courseData.description}
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
                    value={courseData.instructor}
                    onChange={handleChange}
                    className="form-field"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FaChalkboardTeacher />
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    name="duration"
                    label="Course Duration (in weeks)"
                    variant="outlined"
                    fullWidth
                    value={courseData.duration}
                    onChange={handleChange}
                    placeholder="e.g. 8"
                    type="number"
                    className="form-field"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FaClock />
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

                <Grid item xs={12} md={6}>
                  <TextField
                    name="rating"
                    label="Rating"
                    variant="outlined"
                    fullWidth
                    value={courseData.rating}
                    onChange={handleChange}
                    placeholder="e.g. 4.5"
                    className="form-field"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FaStar />
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>

                <Grid item xs={12} className="button-grid">
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        className="submit-btn"
                        sx={{ height: '50px' }}
                      >
                        Update Course
                      </Button>
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        variant="outlined"
                        color="secondary"
                        fullWidth
                        className="cancel-btn"
                        onClick={() => navigate('/ViewCourse')}
                        sx={{ height: '50px', marginTop: '10px' }}
                      >
                        Cancel
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </div>
      </main>

      <Snackbar
        open={toast.open}
        autoHideDuration={6000}
        onClose={handleCloseToast}
        className="toast-message"
      >
        <Alert onClose={handleCloseToast} severity={toast.severity}>
          {toast.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default EditCourse;