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
    Rating
  } from '@mui/material';
  import { 
    FaHeart, 
    FaRegHeart, 
    FaClock, 
    FaGraduationCap 
  } from 'react-icons/fa';
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
      <div>
      <Container component="main" maxWidth="lg" className="courses-container">
        <Header />
        <Typography variant="h4" component="h1" className="courses-title">
          Available Courses
        </Typography>
  
        <Grid container spacing={4}>
          {courses.map((course, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card className="course-card">
                {course.video && (
                  <video controls width="100%">
                    <source src={course.video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
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
                    <Box className="rating-container">
                      <Rating value={course.rating} precision={0.5} readOnly size="small" />
                      <Typography variant="body2" className="rating-text">
                        ({course.rating})
                      </Typography>
                    </Box>
                    <Typography variant="h6" className="price">
                      {course.price}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
       
      </Container>
      <Footer />
      </div>
      
    );
  }

