import {
  Container,
  Box,
  Typography,
  Paper,
  Avatar,
  Grid,
  Button,
  Divider,
  TextField,
} from '@mui/material';
import { FaUser, FaPencilAlt } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export function UpdateUser() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    contactNumber: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          alert('No token found. Please log in again.');
          navigate('/login');
          return;
        }

        const response = await axios.get('http://localhost:3000/api/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(response.data);
      } catch (error) {
        console.error('Fetch profile error:', error);
        alert(error.response?.data?.message || 'Failed to load profile.');
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleUpdateProfile = async () => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        alert('No token found. Please log in again.');
        navigate('/login');
        return;
      }

      const response = await axios.put('http://localhost:3000/api/profile', user, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      alert('Profile updated successfully!');
      navigate('/profile');
    } catch (error) {
      console.error('Update profile error:', error);
      alert(error.response?.data?.message || 'Failed to update profile.');
    }
  };

  return (
    <Container component="main" maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 5 }}>
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar sx={{ bgcolor: 'primary.main' }}>
            <FaUser />
          </Avatar>
          <Typography variant="h5">Student Profile</Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={user.name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={user.email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Contact Number"
              name="contactNumber"
              value={user.contactNumber}
              onChange={handleChange}
            />
          </Grid>
        </Grid>

        <Box mt={4}>
          <Button
            variant="contained"
            startIcon={<FaPencilAlt />}
            onClick={handleUpdateProfile}
          >
            Update Details
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
