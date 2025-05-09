import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Paper,
  Grid,
  CircularProgress,
  Snackbar,
  IconButton,
  InputAdornment,
  useMediaQuery,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemText
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import MuiAlert from '@mui/material/Alert';
import {
  FaPlus,
  FaBook,
  FaChevronLeft,
  FaBars,
  FaChalkboardTeacher,
  FaMoneyBillWave,
  FaClock,
  FaHome,
  FaFolderOpen,
  FaQuestionCircle,
  FaChartBar,
  FaStar
} from "react-icons/fa";
import "./AddCourse.css";
import logo from "../../assets/loginHero.jpg";

// Toast Alert component
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AddCourse = () => {
  const [course, setCourse] = useState({
    title: "",
    description: "",
    instructor: "",
    duration: "",
    price: "",
    image: "",
    rating: "" // New rating field
  });
  
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success"
  });
  const [sideNavOpen, setSideNavOpen] = useState(true);
  
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
                    label="Image URL (Optional)"
                    variant="outlined"
                    fullWidth
                    value={course.image}
                    onChange={handleChange}
                    className="form-field"
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    name="rating"
                    label="Course Rating (1-5)"
                    variant="outlined"
                    fullWidth
                    required
                    value={course.rating}
                    onChange={handleChange}
                    placeholder="e.g. 5"
                    className="form-field"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FaStar />
                        </InputAdornment>
                      ),
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
                        disabled={loading}
                        className="submit-btn"
                        startIcon={loading ? <CircularProgress size={24} color="inherit" /> : <FaPlus />}
                        sx={{ height: '50px' }}
                      >
                        {loading ? "Adding Course..." : "Add Course"}
                      </Button>
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        variant="outlined"
                        color="secondary"
                        fullWidth
                        className="cancel-btn"
                        onClick={() => navigate("/ViewCourse")}
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
      
      {/* Toast Notification */}
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

export default AddCourse;