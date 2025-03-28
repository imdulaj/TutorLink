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
  import { useState } from 'react';
  import './Courses.css';
  import courseImg from '../../assets/courses.jpeg'
import { Header } from '../../components/header/Header';
import { Footer } from '../../components/footer/Footer';
  
  export function Courses() {
    
    const initialCourses = [
      {
        id: 1,
        title: "Complete physics practicals",
        instructor: "samuel udayanga",
        image: courseImg,
        duration: "12 weeks",
        level: "Intermediate",
        rating: 4.5,
        price: "LKR 3000",
        description: "get well practice with physics practicals."
      },
      {
        id: 2,
        title: "Combined maths foundation",
        instructor: "Prasanna Maheepala",
        image: courseImg,
        duration: "10 weeks",
        level: "Beginner",
        rating: 4.8,
        price: "LKR 2000",
        description: "get foundation for learn combined maths"
      },
      {
        id: 3,
        title: "Combined maths Master",
        instructor: "Prasanna Maheepala",
        image: courseImg,
        duration: "8 weeks",
        level: "Advanced",
        rating: 4.6,
        price: "LKR 5000",
        description: "Master combined maths strategies."
      },
      {
        id: 4,
        title: "Marketing foundation",
        instructor: "Asela mallikarathna",
        image: courseImg,
        duration: "14 weeks",
        level: "Intermediate",
        rating: 4.7,
        price: "LKR 3000",
        description: "Build strategies and learn marketing basics."
      }
    ];
  
    const [courses] = useState(initialCourses);
    const [favorites, setFavorites] = useState([]);
  
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
          {courses.map((course) => (
            <Grid item xs={12} sm={6} md={4} key={course.id}>
              <Card className="course-card">
                <CardMedia
                  component="img"
                  height="200"
                  image={course.image}
                  alt={course.title}
                  className="course-image"
                />
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
  
  