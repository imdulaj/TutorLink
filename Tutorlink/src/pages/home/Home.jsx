import { Container, Grid, Typography, Button, Card, CardContent, CardMedia, Box } from '@mui/material';
import { FaGraduationCap, FaBook, FaUsers, FaLaptop } from 'react-icons/fa';
import {Header} from '../../components/header/Header.jsx';
import {Footer} from '../../components/footer/Footer.jsx';
import './Home.css';
import physicsImg from '../../assets/physics.jpeg'
import ictImg from '../../assets/ict.jpeg'
import commerceImg from '../../assets/commerce.jpeg'

export function Home() {
  const features = [
    {
      icon: <FaGraduationCap size={40} />,
      title: 'Expert Instructors',
      description: 'Learn from industry professionals and experienced educators'
    },
    {
      icon: <FaBook size={40} />,
      title: 'Diverse Courses',
      description: 'Wide range of courses covering various subjects and skills'
    },
    {
      icon: <FaUsers size={40} />,
      title: 'Community Learning',
      description: 'Connect with fellow learners and share knowledge'
    },
    {
      icon: <FaLaptop size={40} />,
      title: 'Learn Anywhere',
      description: 'Access your courses anytime, anywhere on any device'
    }
  ];

  const popularCourses = [
    {
      title: 'Physics',
      image: physicsImg,
      description: 'Learn with hands-on projects'
    },
    {
      title: 'ICT',
      image: ictImg,
      description: 'Explore data analysis and machine learning'
    },
    {
      title: 'Marketing',
      image: commerceImg,
      description: 'Master digital marketing strategies and tools'
    }
  ];

  return (
    <div className="homeall">
      <Header />
      
      <Box className="hero-section">
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h2" component="h1" className="hero-title">
                Transform Your Future with Online Learning
              </Typography>
              <Typography variant="h5" className="hero-subtitle">
                Access quality education from anywhere in the world
              </Typography>
              <Button variant="contained" color="primary" size="large" className="cta-button">
                Start Learning Now
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>

      
      <Container maxWidth="lg" className="features-section">
        <Typography variant="h3" align="center" gutterBottom>
          Why Choose Us
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card className="feature-card">
                <CardContent>
                  <div className="feature-icon">{feature.icon}</div>
                  <Typography variant="h6" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>


      <Container maxWidth="lg" className="courses-section">
        <Typography variant="h3" align="center" gutterBottom>
          Popular Courses
        </Typography>
        <Grid container spacing={4}>
          {popularCourses.map((course, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card className="course-card">
                <CardMedia
                  component="img"
                  height="200"
                  image={course.image}
                  alt={course.title}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {course.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {course.description}
                  </Typography>
                  <Button variant="outlined" color="primary" className="course-button">
                    Learn More
                  </Button>
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

