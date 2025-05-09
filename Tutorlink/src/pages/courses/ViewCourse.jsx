import React, { useState, useEffect } from "react";
import { Button, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Drawer, List, ListItem, ListItemText, CssBaseline, Tooltip, Zoom, Snackbar, Box, Typography, Card, CardContent } from "@mui/material";
import { FaEdit, FaTrash, FaEye, FaFileAlt, FaFilePdf, FaHome, FaBook, FaFolderOpen, FaQuestionCircle, FaChartBar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';
import "./ViewCourse.css";
import logo from "../../assets/loginHero.jpg";
import MuiAlert from '@mui/material/Alert';

// Toast Alert component
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ViewCourse = () => {
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success"
  });
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const storedCourses = JSON.parse(localStorage.getItem("courses")) || [];
    setCourses(storedCourses);
    
    // Prepare chart data
    prepareChartData(storedCourses);
  }, []);

  // Process data for instructor-price bar chart
  const prepareChartData = (courseData) => {
    // Group courses by instructor and calculate average price
    const instructorMap = {};
    
    courseData.forEach(course => {
      const instructor = course.instructor;
      const price = parseFloat(course.price.replace(/[^0-9.-]+/g, "")) || 0;
      
      if (!instructorMap[instructor]) {
        instructorMap[instructor] = {
          instructor: instructor,
          totalPrice: price,
          courseCount: 1,
          courses: [{ title: course.title, price: price }]
        };
      } else {
        instructorMap[instructor].totalPrice += price;
        instructorMap[instructor].courseCount += 1;
        instructorMap[instructor].courses.push({ title: course.title, price: price });
      }
    });
    
    // Convert to array for chart
    const chartDataArray = Object.values(instructorMap).map(item => ({
      instructor: item.instructor,
      totalPrice: item.totalPrice,
      averagePrice: item.totalPrice / item.courseCount,
      courseCount: item.courseCount,
      courses: item.courses
    }));
    
    setChartData(chartDataArray);
  };

  const handleDelete = (id) => {
    const updatedCourses = courses.filter((_, index) => index !== id);
    setCourses(updatedCourses);
    localStorage.setItem("courses", JSON.stringify(updatedCourses));
    // Update chart data after deletion
    prepareChartData(updatedCourses);
    showToast("Course deleted successfully!", "success");
  };

  const filteredCourses = courses.filter((course) =>
    [course.title, course.description, course.instructor].some((field) =>
      field?.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

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

  // Generate PDF report for a single course
  const generateReport = (course, index) => {
    const doc = new jsPDF();
    
    // Add header with gradient and logo
    doc.setFillColor(41, 98, 255);
    doc.rect(0, 0, 210, 40, "F");
    doc.setFillColor(16, 185, 129);
    doc.rect(0, 40, 210, 2, "F");
    
    // Add title
    doc.setFontSize(24);
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.text("Course Report", 105, 25, { align: "center" });
    
    // Add course details
    doc.setFontSize(18);
    doc.setTextColor(41, 98, 255);
    doc.setFont("helvetica", "bold");
    doc.text(`${course.title}`, 20, 60);
    
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.setFont("helvetica", "normal");
    
    // Course information
    const courseInfo = [
      { label: "Course ID", value: `C${1000 + index}` },
      { label: "Instructor", value: course.instructor },
      { label: "Duration", value: course.duration },
      { label: "Price", value: course.price },
      { label: "Description", value: course.description }
    ];
    
    let yPos = 70;
    courseInfo.forEach(info => {
      doc.setFont("helvetica", "bold");
      doc.setTextColor(80, 80, 80);
      doc.text(`${info.label}:`, 20, yPos);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(100, 100, 100);
      
      // Handle long description text with wrapping
      if (info.label === "Description") {
        const splitText = doc.splitTextToSize(info.value, 170);
        doc.text(splitText, 20, yPos + 7);
        yPos += (splitText.length * 7); // Adjust based on number of lines
      } else {
        doc.text(info.value, 80, yPos);
        yPos += 10;
      }
    });
    
    // Add date and time
    const today = new Date();
    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);
    doc.text(`Generated on: ${today.toLocaleString()}`, 20, 280);
    
    // Add footer
    doc.setFillColor(41, 98, 255, 0.7);
    doc.rect(0, 285, 210, 12, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.text("TutorLink - Course Management System", 105, 292, { align: "center" });
    
    // Save the PDF
    doc.save(`Course_Report_${course.title.replace(/\s+/g, '_')}.pdf`);
    
    // Show toast notification
    showToast(`Report for "${course.title}" has been generated successfully!`, "success");
  };

  // Custom tooltip for the chart
  const CustomBarTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="chart-tooltip">
          <p className="tooltip-instructor"><strong>{data.instructor}</strong></p>
          <p className="tooltip-detail">Total Price: ${data.totalPrice.toFixed(2)}</p>
          <p className="tooltip-detail">Courses: {data.courseCount}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="view-course-layout">
      <CssBaseline />
      <Drawer
        variant="permanent"
        anchor="left"
        className="side-nav"
        PaperProps={{ className: "side-nav-paper" }}
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
      <main className="main-content">
        <div className="container">
          <h2 className="title">Course List</h2>
        
          {/* Analytics Dashboard */}
          {chartData.length > 0 ? (
            <Card className="analytics-card">
              <CardContent>
                <Typography 
                  variant="h5" 
                  component="div" 
                  className="analytics-title" 
                  style={{ fontWeight: 'bold', color: 'black', textAlign: 'center' }}
                >
                  Instructor Price Analytics
                </Typography>
                <Box className="chart-container">
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart
                      data={chartData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                      <XAxis 
                        dataKey="instructor" 
                        angle={-45}
                        textAnchor="end"
                        height={80}
                        tick={{ fontSize: 12 }}
                      />
                      <YAxis 
                        tickFormatter={(value) => `$${value}`}
                        tick={{ fontSize: 12 }}
                      />
                      <RechartsTooltip content={<CustomBarTooltip />} />
                      <Legend />
                      <Bar 
                        dataKey="totalPrice" 
                        name="Total Price ($)" 
                        radius={[4, 4, 0, 0]}
                        animationDuration={1000}
                        fill="#10b981" // Set to green
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          ) : (
            <div className="no-data">No analytics data available.</div>
          )}

          {/* Search Bar */}
          <div className="search-container" style={{ marginTop: "60px" }}>
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

          {/* Create New Course Button */}
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
                    <TableRow key={index} className="table-row">
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
                        <Link to={`/EditCourse/${index}`}>
                          <IconButton className="icon-button" color="primary">
                            <Tooltip title="Edit Course" TransitionComponent={Zoom} arrow>
                              <FaEdit />
                            </Tooltip>
                          </IconButton>
                        </Link>
                        <IconButton 
                          className="icon-button" 
                          color="secondary" 
                          onClick={() => handleDelete(index)}
                        >
                          <Tooltip title="Delete Course" TransitionComponent={Zoom} arrow>
                            <FaTrash />
                          </Tooltip>
                        </IconButton>
                        <IconButton 
                          className="icon-button report-icon" 
                          color="primary"
                          onClick={() => generateReport(course, index)}
                        >
                          <Tooltip title="Generate Report" TransitionComponent={Zoom} arrow>
                            <FaFileAlt />
                          </Tooltip>
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <div className="no-courses">No courses found.</div>
          )}
        </div>
      </main>
      
      {/* Toast Notification */}
      <Snackbar 
        open={toast.open} 
        autoHideDuration={4000} 
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        className="toast-message"
      >
        <Alert onClose={handleCloseToast} severity={toast.severity} sx={{ width: '100%' }}>
          {toast.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ViewCourse;