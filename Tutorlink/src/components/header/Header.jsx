import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import { FaGraduationCap } from 'react-icons/fa';
import './Header.css'; 
import {Link} from 'react-router-dom';

export function Header() {
  return (
    <AppBar position="fixed" color="default" elevation={2}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Box className="header-container">
            <FaGraduationCap size={32} className="header-icon" />
            <Typography variant="h6" component="div" className="header-title">
              Tutorlink
            </Typography>
          </Box>
          
          <Box className="header-buttons">
            <Link to='/home'><Button color="inherit">Home</Button></Link>
            <Link to='/courses'><Button color="inherit">Courses</Button></Link>
            <Link to='/quiz'><Button color="inherit">Quizzes</Button></Link>
            <Link to='/materials'><Button color="inherit">Materials</Button></Link>
            <Link to='/profile'><Button color="inherit">Profile</Button></Link>
            <Button variant="contained" color="primary">
              Log out
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
