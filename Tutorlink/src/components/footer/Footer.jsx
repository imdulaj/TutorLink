import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton } from '@mui/material';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
import './Footer.css'; 

export function Footer() {
  return (
    <Box component="footer" className="footer">
      <Container className="footer-container">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4} className="footer-section">
            <Typography className="footer-title">About Tutorlink</Typography>
            <Typography variant="body2">
              Transforming lives through quality online education. Join our community of learners and achieve your goals.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} className="footer-section">
            <Typography className="footer-title">Quick Links</Typography>
            <Box className="footer-links">
              <Link href="#">Courses</Link>
              <Link href="#">Become an Instructor</Link>
              <Link href="#">Quizzes</Link>
              <Link href="#">Contact</Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4} className="footer-section">
            <Typography className="footer-title">Connect With Us</Typography>
            <Box className="footer-icons">
              <IconButton>
                <FaFacebook />
              </IconButton>
              <IconButton>
                <FaTwitter />
              </IconButton>
              <IconButton>
                <FaLinkedin />
              </IconButton>
              <IconButton>
                <FaInstagram />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
        <Typography className="footer-copyright">
          © {new Date().getFullYear()} Tutorlink. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}
