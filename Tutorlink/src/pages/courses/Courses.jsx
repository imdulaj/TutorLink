import { 
    Container, 
    Grid, 
    Card, 
    CardContent, 
    CardMedia, 
    Typography, 
    IconButton, 
    Box,
    Chip,
    Rating,
    ListItem,
    ListItemText
  } from '@mui/material';
  import { 
    FaHeart, 
    FaRegHeart, 
    FaClock, 
    FaGraduationCap,
    FaHome
  } from 'react-icons/fa';
  import { Link } from 'react-router-dom';
  import { useState, useEffect } from 'react';
  import './Courses.css';
import { Header } from '../../components/header/Header';
import { Footer } from '../../components/footer/Footer';
  
  export function Courses() {
    
    const [courses, setCourses] = useState([]);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
      const storedCourses = JSON.parse(localStorage.getItem('courses')) || [];
      setCourses(storedCourses);
    }, []);
  
    const toggleFavorite = (courseId) => {
      setFavorites(prevFavorites => {
        if (prevFavorites.includes(courseId)) {
          return prevFavorites.filter(id => id !== courseId);
        } else {
          return [...prevFavorites, courseId];
        }
      });
    };
  
    return (
      <div className="courses-page">
        <Container component="main" maxWidth="lg" className="courses-container">
          <Header />
          <Box className="courses-header">
            <Typography variant="h3" component="h1" className="courses-title">
              Discover Your Perfect Course
            </Typography>
            <Typography variant="h6" component="p" className="courses-subtitle">
              Explore our wide range of expert-led courses designed for your success
            </Typography>
          </Box>
  
          <Grid container spacing={4}>
            {courses.map((course, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card className="course-card">
                  {course.video && (
                    <div className="course-video-container">
                      <video controls width="100%" className="course-video">
                        <source src={course.video} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  )}
                  <CardContent className="course-content">
                    <Box className="course-header">
                      <Typography variant="h6" className="course-title">
                        {course.title}
                      </Typography>
                      <IconButton 
                        onClick={() => toggleFavorite(course.id)}
                        className={`favorite-button ${favorites.includes(course.id) ? 'favorited' : ''}`}
                      >
                        {favorites.includes(course.id) ? <FaHeart /> : <FaRegHeart />}
                      </IconButton>
                    </Box>
    
                    <Typography variant="body2" color="textSecondary" className="instructor">
                      <FaGraduationCap className="icon" /> {course.instructor}
                    </Typography>
    
                    <Box className="course-info">
                      <Chip 
                        icon={<FaClock className="icon" />}
                        label={course.duration}
                        size="small"
                        className="info-chip"
                      />
                      <Chip 
                        label={course.level}
                        size="small"
                        className="info-chip"
                      />
                    </Box>
    
                    <Typography variant="body2" className="description">
                      {course.description}
                    </Typography>
    
                    <Box className="course-footer">
                      <Box className="rating-container" style={{ textAlign: 'left' }}>
                        <Rating value={course.rating} precision={0.5} readOnly size="small" />
                        <Typography variant="body2" className="rating-text">
                          ({course.rating})
                        </Typography>
                      </Box>
                      <Box className="price-container" style={{ textAlign: 'right' }}>
                        <span className="price-symbol">$</span>
                        <span className="price-value">{course.price}</span>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <ListItem button component={Link} to="/dashboard" className="side-nav-item">
            <FaHome className="side-nav-item-icon" />
            <ListItemText primary="Dashboard" />
          </ListItem>
        </Container>
        <Footer />
      </div>
    );
  }

